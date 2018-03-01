import React, { Component } from 'react';
import GoogleMap from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
    static defaultProps = {
        center: { lat: 59.95, lng: 30.33 },
        zoom: 11
    };

    render() {
        return (
          <div>
            TESTING
            <GoogleMap style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}
                bootstrapURLKeys={{ key: ['AIzaSyACXU64fnp6wB0w3YPbxC5se2WKfkJclMM'] }}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
            >
                <AnyReactComponent
                    lat={59.955413}
                    lng={30.337844}
                    text={'Kreyser Avrora'}
                />
            </GoogleMap>
          </div>
        );
    }
}

export default SimpleMap;
