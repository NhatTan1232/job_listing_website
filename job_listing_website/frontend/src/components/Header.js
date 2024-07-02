import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../logo.png';

const Header = () => {
    return (
        <header className="header">
            <div className="header__logo">
                <img src={logo} alt="Logo" className="header__logo-img" />
                <h1>itFind</h1>
            </div>
            <nav className="header__nav">
                <Link to="/" className='homejob'>Home</Link>
                <Link to="/jobs" className='homejob'>Jobs</Link>
                <a href="#about-contact" className='aboutcontact'>About itFind</a>
                <a href="#about-contact" className='aboutcontact'>Contact</a>
            </nav>
        </header>
    );
};

export default Header;

