import React, { useState } from 'react';
import './AddJob.css'; 

const AddJob = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState('Select Level');
    const [level] = useState(['Intern', 'Fresher', 'Junior', 'Middle', 'Senior', 'Trưởng nhóm', 'Trưởng phòng']);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleDropdownClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLevelSelect = (level) => {
        setSelectedLevel(level);
        setIsDropdownOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <div className="aj-container">
            <div className="aj-form-wrapper">
                <h1 className="aj-form-title">Add a job</h1>
                {!isSubmitted && (
                    <p className="aj-form-description">
                        You know what you are looking for. Post your open positions and hire fast the best talent.
                    </p>
                )}
                {isSubmitted ? (
                    <div className="aj-confirmation-message">
                        Your job has been succesfully submitted. Please await further instructions for confirmation.
                    </div>
                ) : (
                    <form className="aj-form-inputs" onSubmit={handleSubmit}>
                        <div className="aj-form-group">
                            <label htmlFor="job-title">Job Title *</label>
                            <input type="text" id="job-title" name="job-title" placeholder="Open position title" required />
                        </div>
                        <div className="aj-form-group">
                            <label htmlFor="company">Company *</label>
                            <input type="text" id="company" name="company" placeholder="Your company's name" required />
                        </div>
                        <div className="aj-form-group">
                            <label htmlFor="job-description">Job Description</label>
                            <textarea id="job-description" name="job-description" placeholder="An overview of your company and position's tasks"></textarea>
                        </div>
                        <div className="aj-form-group">
                            <label htmlFor="location">Location *</label>
                            <input type="text" id="location" name="location" placeholder="City" required />
                        </div>
                        <div className="aj-form-group">
                            <label htmlFor="requirements">Requirements *</label>
                            <textarea type="text" id="requirements" name="requirements" placeholder="List the requirements" required />
                        </div>
                        <div className="aj-form-group">
                            <label htmlFor="skills">Skills *</label>
                            <input type="text" id="skills" name="skills" placeholder="Technical skills" required />
                        </div>
                        <div className="aj-form-group">
                            <label htmlFor="benefits">Benefits *</label>
                            <textarea type="text" id="benefits" name="benefits" placeholder="List the benefits" required />
                        </div>
                        <div className="aj-form-group">
                            <label htmlFor="industry">Industry</label>
                            <input type="text" id="industry" name="industry" placeholder="Your industry" />
                        </div>
                        <div className="aj-form-group">
                            <label htmlFor="level">Level *</label>
                            <div className="my-select-button" onClick={handleDropdownClick}>
                                <div className="my-select-content">{selectedLevel}</div>
                                <i className="MuiBox-root css-11htchx">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256">
                                        <rect width="256" height="256" fill="none"></rect>
                                        <polyline points="208 96 128 176 48 96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></polyline>
                                    </svg>
                                </i>
                                {isDropdownOpen && (
                                    <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation8 MuiMenu-paper MuiPopover-paper MuiMenu-paper css-1eipfjm">
                                        <ul className="MuiList-root MuiList-padding MuiMenu-list css-r8u8y9" role="listbox" tabIndex="-1">
                                            {level.map((level) => (
                                                <li
                                                    key={level}
                                                    className="MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters MuiMenuItem-root MuiMenuItem-gutters css-1fnc6ii"
                                                    role="option"
                                                    aria-selected="false"
                                                    onClick={() => handleLevelSelect(level)}
                                                >
                                                    <div
                                                        style={{
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            width: '100%',
                                                            fontSize: '0.875rem',
                                                            color: 'rgb(116, 116, 116)',
                                                        }}
                                                    >
                                                        {level}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="aj-form-group">
                            <label htmlFor="email">Email *</label>
                            <input type="email" id="email" name="email" placeholder="Your Email Address" required />
                        </div>
                        <button type="submit" className="aj-submit-button">Submit</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AddJob;
