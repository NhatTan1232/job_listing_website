import React from 'react';
import './AddJob.css'; 

const AddJob = () => {
    return (
        <div className="container">
            <div className="form-wrapper">
                <h1 className="form-title">Add a job</h1>
                <p className="form-description">You know what you are looking for. We help you find them. Post your open positions and hire fast the best talent.</p>
                <form className="form-inputs">
                    <div className="form-group">
                        <label htmlFor="company">Company *</label>
                        <input type="text" id="company" name="company" placeholder="Your company's name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="logo">Logo</label>
                        <input type="file" id="logo" name="logo" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="job-title">Job Title *</label>
                        <input type="text" id="job-title" name="job-title" placeholder="Open position title" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="job-description">Job Description *</label>
                        <textarea id="job-description" name="job-description" placeholder="Tasks, requirements, benefits" required></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="contract-type">Type of Contract *</label>
                        <input type="text" id="contract-type" name="contract-type" placeholder="Contract type" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location *</label>
                        <input type="text" id="location" name="location" placeholder="City" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="working-language">Working Language *</label>
                        <input type="text" id="working-language" name="working-language" placeholder="Language" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category of Job *</label>
                        <input type="text" id="category" name="category" placeholder="Category" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="job-link">Link to the Job</label>
                        <input type="url" id="job-link" name="job-link" placeholder="URL for more information" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email *</label>
                        <input type="email" id="email" name="email" placeholder="Your Email Address" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="company-size">Company Size</label>
                        <input type="text" id="company-size" name="company-size" placeholder="Your company's size" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="industry">Industry</label>
                        <input type="text" id="industry" name="industry" placeholder="Your industry" />
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddJob;
