import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
// import ImagesUploader from 'react-images-uploader';
// import 'react-images-uploader/styles.css';
// import 'react-images-uploader/font.css';

// class UploadFile extends Component {
//     render() {
//         return (
//             <ImagesUploader
//                 url="http://localhost:9090/notmultiple"
//                 optimisticPreviews
//                 multiple={false}
//                 onLoadEnd={(err) => {
//                     if (err) {
//                         console.error(err);
//                     }
//                 }}
//                 label="Upload a picture"
//             />
//         );
//     }
// }

// export default UploadFile;

class UploadFile extends React.Component {
    constructor() {
        super()
        this.state = { files: [] }
    }

    onDrop(files) {
        this.setState({
            files
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
                            this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                        }
                    </ul>
                </aside>
            </section>
        );
    }
}

export default UploadFile;