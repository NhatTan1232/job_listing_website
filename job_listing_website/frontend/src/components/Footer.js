import React from 'react';
import './Footer.css'; 

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content" id="about-contact">
                <div className="footer-section">
                    <h3>Contact Information</h3>
                    <p>Email: <a href="mailto:vovankhanh12345678@gmail.com">vovankhanh12345678@gmail.com</a></p>
                    <p>Student Email: <a href="mailto:22521313@gm.uit.edu.vn">22521313@gm.uit.edu.vn</a></p>
                </div>
                <div className="footer-section">
                    <h3>Connect With Me</h3>
                    <p>
                        <a href="https://www.facebook.com/profile.php?id=100069915024301" target="_blank" rel="noopener noreferrer">Facebook</a>
                    </p>
                    <p>
                        <a href="https://github.com/NhatTan1232" target="_blank" rel="noopener noreferrer">Github</a>
                    </p>
                </div>
                <div className="footer-section">
                    <h3>About itFind</h3>
                    <p>itFind is a job listing website developed by a student from UIT.</p>
                    <p>This is a demo version, with additional features to be released soon.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
