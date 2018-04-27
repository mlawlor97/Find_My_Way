import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import axios from 'axios';

class UploadFile extends React.Component {
    constructor() {
        super()
        this.state = { files: [], activeFile: "" }
        this.clickMe = this.clickMe.bind(this);
    }

    onDrop(files) {
        this.setState({
            files
        });

        this.setState({activeFile: files[0].name})
    }

    clickMe(){
      var reader = new FileReader();

      reader.addEventListener("load", function(){
        var newImageURL = reader.result;
        var userData ={email: "dsbis@iastate.edu"};
        axios.post('http://findmyway.ece.iastate.edu:5050/api/getFloorplans', userData).then(function(response){
            
        });
        var floorplansStringed = "";
        var floorplans = JSON.parse(floorplansStringed);
        var length;
        if(!floorplans.images){
          length = 0;
          floorplans = {images: []};
        } else {
          length = floorplans.images.length;
        }
        var newFloorplan = {
          bounds: [[10, 10], [-10, -10]],
          url: newImageURL,
          className: "floorplan" + length,
          rotation: 0,
        }
        floorplans.images.push(newFloorplan);
        // axios call
      }, false);

      reader.readAsDataURL(this.state.files[0]);
      this.setState({activeFile: ""});
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
                    <h2>Dropped file</h2>
                </aside>
                {this.state.activeFile}

                <div> <button onClick={this.clickMe}>Upload</button> </div>
            </section>
        );
    }
}

export default UploadFile;
