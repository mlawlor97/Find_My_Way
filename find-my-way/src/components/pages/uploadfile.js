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
        var email = 'se329@iastate.edu';
        if(localStorage.getItem('activeEmail') != 'se329@iastate.edu'){
          email = localStorage.getItem('activeEmail')
        }
        var userData ={email: email};
        axios.post('http://findmyway.ece.iastate.edu:5050/api/getFloorplans', userData)
            .then(function(response){
            var currentFloorplans = JSON.parse(response.data.success);
            var length = currentFloorplans.images.length;
            var newFloorplan = {
              bounds: [[10, 10], [-10, -10]],
              url: newImageURL,
              className: "floorplan" + length,
              rotation: 0,
            };
            currentFloorplans.images.push(newFloorplan);


            var toUpdate = {
              email: email,
              floorplans: JSON.stringify(currentFloorplans),
            }

            axios.post('http://findmyway.ece.iastate.edu:5050/api/updateFloorplans', toUpdate).then(function(response){
              var code = response.data.code;
              console.log(code);
            });
        });
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
