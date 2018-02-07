import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header>

                <div className="logo">
                Find My Way
                </div>

                <nav>
                    <ul>
                        <li className="first">
                            <a href="#">Upload</a>
                        </li>
                        <li>
                            <a href="#">Help</a>
                        </li>
                        <li>
                            <a href="#">Sign Up</a>
                        </li>
                        <li className="last">
                            <a href="#">Log in</a>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;
