import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

//components
import Header from './components/headerComponent/header';
import Footer from './components/footerComponent/footer';
import Homepage from './components/pages/homePage';
import SimpleMap from './components/pages/map';
import Loginscreen from './components/pages/loginscreen'

//includes
import './Assets/css/default.min.css';

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginPage: [],
      uploadScreen: []
    }
  }
  componentWillMount() {
    var loginPage = [];
    loginPage.push(<Loginscreen parentContext={this} />);
    this.setState({
      loginPage: loginPage
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
        
          <Header />

          {/* this.state.loginPage */}
          {/* this.state.uploadScreen */}

          <Route exact path='/' component={Homepage} />
          <Route exact path='/map' component={SimpleMap} />
          <Route exact path='/login' component={Loginscreen} />

          <Footer />

        </div>
      </Router>
    );
  }
}

export default App;
