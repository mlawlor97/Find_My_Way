import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

class SimpleMap extends Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
  }

    render() {
       const position = [this.state.lat, this.state.lng]
        return (
          <Map center={position} style={{position: 'absolute', top:'90px', bottom: '90px', left: 0, right: 0}}  zoom={this.state.zoom}>
            <TileLayer
              attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </Map>
        )
    }
}

export default SimpleMap;
