import React from 'react'
// import './Landing.css'
const Footer = () => {
    return (
        <div>

            <footer>
                <div className='row'>
                    <div className="col-md-4">
                        <p className='copyright'>Copyright © 2023 महाराष्ट्र ई-सेवा केंद्र. All rights reserved </p>
                    </div>
                    <div className="col-md-4">
                        <ul className='menu-link'>
                            <li>Home</li>
                            <li>About</li>
                            <li>Places</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <ul className='icons'>
                            <li><i class="icon bi bi-facebook"></i></li>
                            <li> <i class="icon bi bi-instagram"></i></li>
                            <li><i class="icon bi bi-twitter"></i></li>
                            <li> <i class="icon bi bi-linkedin"></i></li>
                            <li><i class="icon bi bi-youtube"></i></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
