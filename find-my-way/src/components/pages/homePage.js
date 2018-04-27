import React, { Component } from 'react';

class Homepage extends Component {


    render() {
      var email = localStorage.getItem('activeEmail');
      if(email == null){
        localStorage.setItem('activeEmail', 'guest');
      }

        return (
            <div>
              Welcome to Find My Way! Log-In to use to place your floorplans on the map and drag them to location!
            </div>
        );
    }
}

export default Homepage;
