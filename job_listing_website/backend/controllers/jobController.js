const client = require('../config/elasticsearch');
const { getMysqlConnection } = require('../config/db');

// Get all jobs
exports.getJobs = async (req, res) => {
  try {
    const response = await client.search({
      index: 'job_listings',
      size: 100,
      body: {
        query: {
          match_all: {}
        }
      }
    });

    if (!response || !response.hits || !response.hits.hits) {
      console.error('Invalid response from Elasticsearch:', response);
      return res.status(500).json({ error: 'Invalid response from Elasticsearch' });
    }

    const jobs = response.hits.hits.map(hit => hit._source);
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Error fetching jobs' });
  }
};

// Advanced search with query parameters
exports.searchJobs = async (req, res) => {
  const { jobName, jobLevel, page = 1, size = 30 } = req.query;

  try {
    const query = {
      bool: {
        must: [],
        filter: []
      }
    };

    // Add match query for job name
    if (jobName) {
      query.bool.must.push({ match: { job_name: jobName } });
    }

    // Add nested match query for job levels
    if (jobLevel) {
      const levels = jobLevel.split(',').map(level => level.trim());
      query.bool.filter.push({
            nested: {
                path: "job_levels",
                query: {
                    bool: {
                        should: levels.map(level => ({
                            match: { "job_levels.job_level": level }
                        }))
                    }
                }
            }
        });
    }

    const from = (page - 1) * size;

    const response = await client.search({
      index: 'job_listings',
      size: size,
      from: from,
      body: {
        query
      }
    });

    if (!response || !response.hits || !response.hits.hits) {
      console.error('Invalid response from Elasticsearch:', response);
      return res.status(500).json({ error: 'Invalid response from Elasticsearch' });
    }

    const jobs = response.hits.hits.map(hit => hit._source);
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error performing advanced search:', error);
    res.status(500).json({ error: 'Error performing advanced search' });
  }
};