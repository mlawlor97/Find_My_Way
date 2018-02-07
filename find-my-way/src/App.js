import React, { Component } from 'react';

//components
import './Assets/css/default.min.css';
import Header from './components/headerComponent/header';
import Footer from './components/footerComponent/footer';
import Homepage from './components/pages/homePage';
import SimpleMap from './components/pages/map';

class App extends Component {
  render() {
    return (
      <div className="App">
      
        <Header />

          <Homepage />

          <SimpleMap />

        <Footer />

      </div>
    );
  }
}

export default App;
