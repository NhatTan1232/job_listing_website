import React from 'react';
import JobList from '../components/JobList';
import Footer from '../components/Footer';

const HomePage = () => {
    return (
        <div className="container">
            <header className='title-section'>
                <h1 className='title'>Find available jobs right now</h1>
                <p className='title-p'>We help you find exciting opportunities around VietNam.</p>
            </header>
            <main>
                <JobList />
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
