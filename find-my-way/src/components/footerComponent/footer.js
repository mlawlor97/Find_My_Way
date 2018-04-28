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
                        <a href="#Dave">David Bis</a>
                    </li>
                    <li>
                        <a href="#Mitch">Mitchell Kerr</a>
                    </li>
                    <li>
                        <a href="#Jake">Jacob Stair</a>
                    </li>
                    <li>
                        <a href="#Emmett">Emmett Kozlowski</a>
                    </li>
                    <li>
                        <a href="#Matt">Matt Lawlor</a>
                    </li>
                    <li className="last">
                        <a href="#Junjie">Junjie Wen</a>
                    </li>
                </ul>
            </footer>
        );
    }
}

export default Footer;
