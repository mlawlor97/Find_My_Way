import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import axios from 'axios';

class UploadFile extends React.Component {
    constructor() {
        super()
        this.state = { files: [] }
    }

    onDrop(files) {
        this.setState({
            files
        });

        //TODO configure to correct server and files
        axios({
            method: 'post',
            url: 'http://localhost:3000',
            data: {
                file: files[0]
                }
        });
    }

    render() {
        return (
            <section>
                <div className="dropzone">
                    <Dropzone onDrop={this.onDrop.bind(this)}>
                        <p>Try dropping some files here, or click to select files to upload.</p>
                    </Dropzone>
                </div>
                <aside>
                    <h2>Dropped files</h2>
                    <ul>
                        {
                            this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes 
                            <img src={f.preview}/> 
                            
                            
                            
                            </li>)
                        }
                    </ul>
                </aside>
            </section>
        );
    }
}

export default UploadFile;