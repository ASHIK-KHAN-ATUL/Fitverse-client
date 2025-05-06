import React from 'react';

const Footer = () => {
    return (
        <div className='bg-[#90caf9] text-black p-10'>

            <footer className="footer grid grid-cols-2 md:grid-cols-3 justify-items-center  ">
            <nav>
                <h6 className="footer-title">Services</h6>
                <a className="link link-hover">Branding</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                <a className="link link-hover">Advertisement</a>
            </nav>
            <nav>
                <h6 className="footer-title">Company</h6>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
                <h6 className="footer-title">Legal</h6>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>
            </footer>

            <aside className='text-center mt-12'>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by Fitverse and Ashik</p>
            </aside>
        </div>
    );
};

export default Footer;