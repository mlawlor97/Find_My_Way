import React, { Component } from 'react';
import {ImageOverlay, Map, TileLayer} from 'react-leaflet'
import Control from 'react-leaflet-control';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import $ from 'jquery'

const dali = {
  bounds: [[32, -130], [13, -100]],
  url: "http://www.moma.org/media/W1siZiIsIjM4NjQ3MCJdLFsicCIsImNvbnZlcnQiLCItcmVzaXplIDIwMDB4MjAwMFx1MDAzZSJdXQ.jpg?sha=f6522ef85554762b",
  className: "dali",
  rotation: 0,
}

const pablo = {
  bounds: [[0, 0], [20, 20]],
  url: "https://static01.nyt.com/images/2018/03/02/arts/design/02picasso-print/01picasso1-blog427.jpg",
  className: "pablo",
  rotation: 0,
}

const indoorMaps = {
  images: [dali, pablo]
}

class SimpleMap extends Component {
  constructor(props){
    super(props);

    // Do loading of map images here!

    this.onZoomEnd = this.onZoomEnd.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.rotateImage = this.rotateImage.bind(this);
    this.rotateImages = this.rotateImages.bind(this);
    this.handleRotateChange = this.handleRotateChange.bind(this);
    this.onTLCornerChange = this.onTLCornerChange.bind(this);
    this.onBRCornerChange = this.onBRCornerChange.bind(this);
    this.onEditModeChange = this.onEditModeChange.bind(this);
    this.onActiveFloorplanChange = this.onActiveFloorplanChange.bind(this);
    this.clickMe = this.clickMe.bind(this);

    this.state = {
      indoorMaps: indoorMaps,
      rotate: 0,
      TLCorner: true,
      BRCorner: false,
      editMode: false,
      activeImage: 0
    };
  }

  clickMe(){
    for(var i = 0; i < this.state.indoorMaps.images.length; i++){
      console.log(this.state.indoorMaps.images[i].className);
    }
  }

  componentDidMount(){
    this.rotateImages();
  }

  onZoomEnd(){
    this.rotateImages();
  }

  onMouseDown(e){
    if(!this.state.editMode){
      return;
    }
    var cornerIndex = 0;
    if(this.state.BRCorner){
      cornerIndex = 1;
    }
    var imgMove = this.state.indoorMaps;
    var newBounds = [e.latlng.lat, e.latlng.lng];
    imgMove.images[this.state.activeImage].bounds[cornerIndex] = newBounds;
    this.setState({indoorMaps: imgMove});
    this.rotateImages();
  }

  rotateImage(img){
    var images = this.state.indoorMaps.images;
    var rotate = this.state.rotate;
    $(document).ready(function() {
        var existingCss =  $('.' + images[img].className).css('transform');
        $('.' + images[img].className).css('transform', existingCss + ' rotate('+ rotate +'deg)');
    });
  }

  rotateImages(){
    var images = this.state.indoorMaps.images;
    $(document).ready(function() {
      for(var i = 0; i < images.length; i++){
        var existingCss =  $('.' + images[i].className).css('transform');
        $('.' + images[i].className).css('transform', existingCss + ' rotate('+ images[i].rotation +'deg)');
      }
    });
  }

  onTLCornerChange(){
    this.setState({TLCorner: true, BRCorner: false});
  }

  onBRCornerChange(){
    this.setState({TLCorner: false, BRCorner: true});
  }

  handleRotateChange(e){
    if(!this.state.editMode){
      return;
    }
    var rotation = e.target.value;
    this.setState({
      rotate: rotation
    });
    this.rotateImage(this.state.activeImage);
  };

  onEditModeChange(e){
    let checkState = (this.state.editMode === "on" || this.state.editMode === true) ? false : true;
    this.setState({
      editMode: checkState
    });
  }

  onActiveFloorplanChange(e){
    this.setState({
      activeImage: e.target.value
    })
  }

    render() {
      const isEditing = this.state.editMode;

      const editOptions = isEditing ? (
        <div>
          <input type="radio" name="position" value="topleft" onChange={this.onTLCornerChange} checked={this.state.TLCorner} />Top-Left<br />
          <input type="radio" name="position" value="bottomright" onChange={this.onBRCornerChange} checked={this.state.BRCorner}/>Bottom-Right<br />
          <input type="number" onChange={this.handleRotateChange} value={this.state.rotate}/> <br />
          <select onChange={this.onActiveFloorplanChange}>
          {this.state.indoorMaps.images.map(function(floorplan, index){
            return <option value={index}>{floorplan.className}</option>
          })}
          </select> <br />
        </div>
      ) : (
        <div />
       )

      function generateKey(){
        return Math.floor(Math.random() * 100000);
      }

        return (
          <Map ref={m => { this.leafletMap = m; }}
               center={[0,0]}
               style={{position: 'absolute', top:'90px', bottom: '90px', left: 0, right: 0}}
               zoom={4.5}
               worldCopyJump={true}
               zoomAnimation={false}
               onZoomEnd={this.onZoomEnd}
               onMouseDown={this.onMouseDown}>

            <TileLayer
              attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Control position="topright">
                <div
                    style={{
                        backgroundColor: 'white',
                        padding: '25px',
                    }}
                >

                <div>EDIT OPTIONS</div><br/>
                <input type="checkbox" name="editmode" onChange={this.onEditModeChange} checked={this.state.editMode} /> Edit Mode <br />
                {editOptions}
                <button onClick={this.clickMe}>CLICK ME</button>


                </div>
            </Control>

            {this.state.indoorMaps.images.map(function(floorplan, index){
              return <ImageOverlay key={generateKey()}
                                   className={floorplan.className}
                                   bounds={floorplan.bounds}
                                   url={floorplan.url} />
            })}

          </Map>
        )
    }
}

export default SimpleMap;