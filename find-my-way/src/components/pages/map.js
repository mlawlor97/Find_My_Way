import React, { Component } from 'react';
import {GroundOverlay, withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const IndoorMap = ({ text }) => <div>{text}<img src={require("../../Assets/DurhamCenter.png")} /></div>;

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 40.712216, lng: -74.22655 }}
  >
    <GroundOverlay
      defaultUrl="https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg"
      defaultBounds={new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(40.712216, -74.22655),
        new window.google.maps.LatLng(40.773941, -74.12544)
      )}
      defaultOpacity={0.5}
    />

    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
));

class SimpleMap extends Component {
    static defaultProps = {
        center: { lat: 42.025, lng: -93.646 },
        zoom: 18
    };



    render() {
        return (
          <MyMapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{position: 'absolute', top:"90px", bottom: 0, left: 0, right: 0}} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        )
    }
}

export default SimpleMap;
