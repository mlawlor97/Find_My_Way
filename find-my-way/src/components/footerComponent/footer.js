import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="copyright">
                    © Find My Way
                </div>

                <ul>
                    <li className="first">
                        <a href="#">David Bis</a>
                    </li>
                    <li>
                        <a href="#">Mitchell Kerr</a>
                    </li>
                    <li>
                        <a href="#">Jacob Stair</a>
                    </li>
                    <li>
                        <a href="#">Emmett Kozlowski</a>
                    </li>
                    <li className="last">
                        <a href="#">Matt Lawlor</a>
                    </li>
                </ul>
            </footer>
        );
    }
}

export default Footer;
