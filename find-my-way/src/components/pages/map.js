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
  rotation: -50,
}

const indoorMaps = {
  images: [dali, pablo]
}

class SimpleMap extends Component {
  constructor(props){
    super(props);

    this.onZoomEnd = this.onZoomEnd.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.rotateImages = this.rotateImages.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onTLCornerChange = this.onTLCornerChange.bind(this);
    this.onBRCornerChange = this.onBRCornerChange.bind(this);

    this.state = {
      indoorMaps: indoorMaps,
      rotateSlider: 0,
      TLCorner: true,
      BRCorner: false,
    };
  }

  componentDidMount(){
    const leafletMap = this.leafletMap;
    console.log(leafletMap);
    this.rotateImages();
  }

  onZoomEnd(){
    this.rotateImages();
  }

  onMouseDown(e){
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

  handleChangeStart = () => {
    console.log('Change event started')
  };

  handleChange = value => {
    console.log(value);
    this.setState({
      rotateSlider: value
    })
  };

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
                <form action="">
                  <input type="radio" name="position" value="topleft" onChange={this.onTLCornerChange} checked={this.state.TLCorner} />Top-Left<br />
                  <input type="radio" name="position" value="bottomright" onChange={this.onBRCornerChange} checked={this.state.BRCorner}/>Bottom-Right<br />
                </form>
                    <Slider />
                  <div>{rotateSlider}</div>


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
