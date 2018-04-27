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
            username: '',
            password: ''
        }
    }

    handleClick(event) {
        var apiBaseUrl = "http://findmyway.ece.iastate.edu:5050/api/login";
        var self = this;
        var payload = {
            "email": this.state.username,
            "password": this.state.password
        }
        axios.post(apiBaseUrl, payload)
            .then(function (response) {
                console.log("Here " + response);
                if (response.data.code == 200) {
                    console.log("Login successfull");
                    var uploadScreen = [];
                    uploadScreen.push(<UploadScreen appContext={self.props.appContext} />)
                    self.props.appContext.setState({ loginPage: [], uploadScreen: uploadScreen })
                }
                else if (response.data.code == 204) {
                    console.log("Username password do not match");
                    alert("username password do not match")
                }
                else {
                    // console.log("Username does not exists");
                    // alert("Username does not exist");
                    console.log("Login successfull");
                    var uploadScreen = [];
                    uploadScreen.push(<UploadScreen appContext={self.props.appContext} />)
                    self.props.appContext.setState({ loginPage: [], uploadScreen: uploadScreen })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

//     tryLogin = async (data, reg) => {
//         if (data.username === '' || data.password === '') {
//             alert('Invalid Username or Password');
//             return 24;
//         }

//         let ip = 'proj-319-B5.cs.iastate.edu';
//         // let ip = '10.36.19.28';

//         let response;
//         let url = 'http://' + ip + ':3000/users';
//         if (reg) { url += '/new'; }

//         response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//             },
//             body: JSON.stringify(data)
//         });

//         if (response.status === 500) {
//             if (reg) {
//                 alert('Username is taken');
//             } else {
//                 alert(data.username + ' is not a registered user');
//             }
//             return -1;
//         }

//         if (!response.ok) {
//             console.error(response.status);
//             throw Error(response.status);
//         }

//         if (response.status === 200) {
//             const message = await response.json();
//             alert(message['message']);
//             if (message['message'] === 'you are logged in') {
//                 // User.name = data.username;
//                 // this.props.history.push('/');
//             }
//         }
//     };

//     handleSubmit(event) {
//         if (!event.target.checkValidity()) {
//             console.log('invalid form');
//             return;
//         }
//         event.preventDefault();

//         let data = {
//             username: this.state.username,
//             password: this.state.password
//         };

//         this.tryLogin(data, false);
//     }

//     handleRegister(event) {
//         if (!event.target.checkValidity()) {
//             console.log('invalid form');
//             return;
//         }
//         event.preventDefault();

//         let data = {
//             username: this.state.username,
//             password: this.state.password
//         };

//         this.tryLogin(data, true);
//     }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <TextField
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                            onChange={(event, newValue) => this.setState({ username: newValue })}
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
