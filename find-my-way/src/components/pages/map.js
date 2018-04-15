import React, { Component } from 'react';
import {ImageOverlay, Map, TileLayer} from 'react-leaflet'
import $ from 'jquery'

const dali = {
  bounds: [[32, -130], [13, -100]],
  url: "http://www.moma.org/media/W1siZiIsIjM4NjQ3MCJdLFsicCIsImNvbnZlcnQiLCItcmVzaXplIDIwMDB4MjAwMFx1MDAzZSJdXQ.jpg?sha=f6522ef85554762b",
  className: "dali",
  rotation: 20,
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

    this.state = {
      indoorMaps: indoorMaps,
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
    var daliMove = this.state.indoorMaps;
    var newBounds = [e.latlng.lat, e.latlng.lng];
    daliMove.images[0].bounds[0] = newBounds;
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

    render() {

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
