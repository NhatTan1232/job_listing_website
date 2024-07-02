const { Client } = require('@elastic/elasticsearch');
require('dotenv').config();

const client = new Client({
  node: process.env.ELASTICSEARCH_URL,
  auth: {
    apiKey: process.env.ELASTICSEARCH_API_ENCODED,
  },
});

const testConnection = async () => {
  try {
    await client.ping();
    console.log('Elasticsearch connection established');
  } catch (error) {
    console.error('Elasticsearch connection failed', error);
    console.error('Error details:', error.meta.body);
    process.exit(1); // Exit if connection fails
  }
};

testConnection();

module.exports = client;
