import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header>

                <div className="logo">
                logo
                </div>

                <nav>
                    <ul>
                        <li>
                            <a href="#">Upload Map</a>
                        </li>
                        <li>
                            <a href="#">Help</a>
                        </li>
                        <li>
                            <a href="#">Sign Up</a>
                        </li>
                        <li>
                            <a href="#">Log in</a>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;
