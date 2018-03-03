import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <header>

                <div className="logo">
                <Link to="/">Find My Way</Link>
                </div>

                <nav>
                    <ul>
                        <li className="first">
                            <Link to="/map">Map</Link>
                        </li>
                        <li>
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
