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
                            <Link to="/upload">Upload</Link>
                        </li>
                        <li>
                            <a href="#Help">Help</a>
                        </li>
                        <li className="last">
                            <Link to="/login">Log In</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;
