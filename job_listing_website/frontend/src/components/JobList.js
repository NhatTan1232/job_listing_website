import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './JobList.css';
import InfiniteScroll from 'react-infinite-scroll-component';

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [searchParams, setSearchParams] = useState({
        jobName: '',
        companyName: '',
        skills: '',
        jobLevel: '',
        minSalary: '',
        maxSalary: '',
        industry: ''
    });
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [layout, setLayout] = useState('layout-1');
    const [expandedJobId, setExpandedJobId] = useState(null);

    // Function to fetch jobs from the backend based on search parameters
    const fetchJobs = async (page) => {
        try {
            const params = { ...searchParams, page, size: 30 };
            if (!searchParams.jobLevel.length) {
                delete params.jobLevel;
            } else {
                params.jobLevel = searchParams.jobLevel.join(',');
            }
            const query = new URLSearchParams(params).toString();
            const response = await axios.get(`http://localhost:5000/api/jobs/search?${query}`);
            
            if (response.data.length === 0) {
                setHasMore(false);
            } else {
                setJobs(prevJobs => [...prevJobs, ...response.data]);
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    // Fetch jobs when component mounts or search parameters change
    useEffect(() => {
        setJobs([]);
        setPage(1);
        setHasMore(true);
        fetchJobs(1);
    }, [searchParams]);

    // Handle changes in the search input fields
    const handleChange = (event) => {
        const { name, value } = event.target;
        setSearchParams(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle search form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        setJobs([]);
        setPage(1);
        setHasMore(true);
        fetchJobs(1);
    };

    const fetchMoreData = () => {
        setPage(prevPage => {
            const nextPage = prevPage + 1;
            fetchJobs(nextPage);
            return nextPage;
        });
    };

    const handleClear = () => {
        setSearchParams({
            jobName: '',
            companyName: '',
            skills: '',
            jobLevel: '',
            minSalary: '',
            maxSalary: '',
            industry: ''
        });
    };

    const handleJobClick = (jobId) => {
        setExpandedJobId(expandedJobId === jobId ? null : jobId);
    };

    return (
        <div className="container">
            <div className="search-bar-container">
                <form onSubmit={handleSubmit}>
                    <div className="search-bar">
                        <div className="search-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256">
                                <rect width="256" height="256" fill="none"></rect>
                                <circle cx="116" cy="116" r="84" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></circle>
                                <line x1="175.4" y1="175.4" x2="224" y2="224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
                            </svg>
                        </div>
                        <input
                            type="text"
                            name="jobName"
                            value={searchParams.jobName}
                            onChange={handleChange}
                            placeholder="Type here to search"
                            className="search-input"
                        />
                        {searchParams.jobName && (
                            <button type="button" className="search-clear-button" onClick={handleClear}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256">
                                    <rect width="256" height="256" fill="none"></rect>
                                    <line x1="200" y1="56" x2="56" y2="200" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
                                    <line x1="200" y1="200" x2="56" y2="56" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
                                </svg>
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <InfiniteScroll
                dataLength={jobs.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4 className="infinite-scroll-loader">Loading...</h4>}
                endMessage={<p className="infinite-scroll-end-message">No more jobs to show</p>}
            >
                <ul className={`job-list ${layout}`}>
                    {jobs.map((job) => (
                        <li className="horizontal-list-item" key={job.job_id} onClick={() => handleJobClick(job.job_id)}>
                            <div>
                                <div className="job-container">
                                    <div className="job-logo-container">
                                        <div className="static-image" style={{ backgroundImage: `url(${job.company.logo})` }}></div>
                                    </div>
                                    <div className="job-details-container">
                                        <div className="job-title-container">
                                            <a href={job.url} className="job-title-link" target="_blank" rel="noopener noreferrer">
                                                <h3>{job.job_name}</h3>
                                            </a>
                                        </div>
                                        <div className="job-company-container">
                                            <p className="com-name-p">{job.company.name}</p>
                                        </div>
                                        <div className="job-meta-container">
                                            {job.job_levels.map(level => (
                                                <div className="tag-item" key={level.job_level}>
                                                    <span className="tag">{level.job_level}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {expandedJobId === job.job_id && (
                                    <div className="job-expanded-info">
                                        {job.job_description && (
                                            <div className="job-description">
                                                <strong>Job Description:</strong>
                                                <p>{job.job_description}</p>
                                            </div>
                                        )}
                                        <div className="job-address">
                                            <strong>Address:</strong>
                                            <p>{job.company.addresses}</p>
                                        </div>
                                        <div className="job-requirement">
                                            <strong>Requirements:</strong>
                                            <ul className="requirement-list">
                                                {job.job_requirement.split('. ').map((req, index) => (
                                                    <li key={index}>{req.trim()}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="job-benefits">
                                            <strong>Benefits:</strong>
                                            <ul className="benefits-list">
                                                {job.benefits.split(/\. |, •|•/).map((req, index) => (
                                                    <li key={index} className="benefit-item">{req.trim()}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="job-skills">
                                            <strong>Skills:</strong>
                                            <div className="job-meta-container">
                                                {job.skills.map(skill => (
                                                    <div className="tag-item" key={skill.skill}>
                                                        <span className="tag">{skill.skill}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="job-industry">
                                            <strong>Industry:</strong>
                                            <p>{job.company.industry}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </InfiniteScroll>
        </div>
    );
};

export default JobList;
