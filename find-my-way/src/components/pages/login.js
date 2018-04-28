import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import UploadScreen from './uploadscreen';
import { green100 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { ImagePalette } from 'material-ui';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            successful: ''
        }
    }

    handleClick(event) {
        var apiBaseUrl = "http://findmyway.ece.iastate.edu:5050/api/login";
        var self = this;
        var payload = {
            "email": this.state.email,
            "password": this.state.password,
        }
        axios.post(apiBaseUrl, payload)
            .then(function (response) {
                console.log(response.data);
                if (response.data.code == 200) {
                    console.log("Login successfull");
                    localStorage.setItem('activeEmail', this.state.email);
                    this.setState({successful: 'Currently logged in as: ' + this.state.email});
                }
                else if (response.data.code == 204) {
                    alert("username password do not match")
                }
                else {
                    alert("unknown error");
                }
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <div>{this.state.successful}</div>
                        <TextField
                            hintText="Enter your Email"
                            floatingLabelText="Email"
                            onChange={(event, newValue) => this.setState({ email: newValue })}
                        />
                        <br />
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange={(event, newValue) => this.setState({ password: newValue })}
                        />
                        <br />
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}
const style = {
    margin: 15,
};

export default Login;
