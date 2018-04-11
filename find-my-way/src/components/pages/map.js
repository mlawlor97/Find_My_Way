import React, { Component } from 'react';
import {ImageOverlay, Map, TileLayer, Marker, Popup } from 'react-leaflet'
import RotatedMarker from 'react-leaflet-rotatedmarker'
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
  images: [dali, pablo],
}

class SimpleMap extends Component {
  constructor(props){
    super(props);

    this.state = {
      indoorMaps: indoorMaps
    };
  }

  componentDidMount(){
    $(document).ready(function() {
      $('.dali').css({'transform': 'rotate(10deg)'});
    });
  }

  onZoomStart() {
    console.log("START");
  }

  onZoomEnd(){
    console.log("END");

  }

    render() {
        return (
          <Map center={[0,0]}
               style={{position: 'absolute', top:'90px', bottom: '90px', left: 0, right: 0}}
               zoom={4.5}
               onZoomStart={this.onZoomStart}
               onZoomEnd={this.onZoomEnd}>

            <TileLayer
              attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {this.state.indoorMaps.images.map(function(floorplan, index){
              return <ImageOverlay className={floorplan.className}
                                   bounds={floorplan.bounds}
                                   url={floorplan.url} />
            })}

          </Map>
        )
    }
}

export default SimpleMap;
