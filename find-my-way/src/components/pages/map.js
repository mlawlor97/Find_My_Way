import React, { Component } from 'react';
import {ImageOverlay, Map, TileLayer} from 'react-leaflet'
import Control from 'react-leaflet-control';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
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

    this.onZoomEnd = this.onZoomEnd.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.rotateImage = this.rotateImage.bind(this);
    this.rotateImages = this.rotateImages.bind(this);
    this.handleRotateChange = this.handleRotateChange.bind(this);
    this.onTLCornerChange = this.onTLCornerChange.bind(this);
    this.onBRCornerChange = this.onBRCornerChange.bind(this);
    this.onEditModeChange = this.onEditModeChange.bind(this);

    this.state = {
      indoorMaps: indoorMaps,
      rotate: 0,
      TLCorner: true,
      BRCorner: false,
      editMode: false,
    };
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
    var daliMove = this.state.indoorMaps;
    var newBounds = [e.latlng.lat, e.latlng.lng];
    daliMove.images[0].bounds[cornerIndex] = newBounds;
    this.setState({indoorMaps: daliMove});
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
    var rotation = e.target.value;
    this.setState({
      rotate: rotation
    })
    this.rotateImage(1);
  };

  onEditModeChange(e){
    var checkState = e.target.value;
    console.log("PRE: ", checkState);
    // // checkState = !checkState;
    // console.log("POST: ", checkState);
    this.setState({
      editMode: !checkState
    });
  }

    render() {
       const { rotateSlider } = this.state;

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
                <input type="radio" name="position" value="topleft" onChange={this.onTLCornerChange} checked={this.state.TLCorner} />Top-Left<br />
                <input type="radio" name="position" value="bottomright" onChange={this.onBRCornerChange} checked={this.state.BRCorner}/>Bottom-Right<br />
                <input type="number" onChange={this.handleRotateChange} value={this.state.rotate}/>


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
