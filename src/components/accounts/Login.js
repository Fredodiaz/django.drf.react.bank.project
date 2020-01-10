import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { Redirect } from 'react-router-dom';

export class Login extends Component {

    state = {
        email: '',
        password: '',
    }

    static propTypes = {
      login: PropTypes.func.isRequired,
      isAuthenticated: PropTypes.bool,
    }

    emailInput = (emailText) => {
        this.setState({email: emailText.target.value});
    }

    passwordInput = (passwordText) => {
        this.setState({password: passwordText.target.value});
    }

    formSubmit = (e) => {
        e.preventDefault();
        console.log('Creds: ' + this.state.email + ' ' + this.state.password)
        this.props.login(this.state.email, this.state.password);
        this.setState({email: ''});
        this.setState({password: ''});
    }


    render() {
        if(this.props.isAuthenticated) {
          return <Redirect to="/" />
        }

        let {email, password} = this.state;

        return (
            <form onSubmit={this.formSubmit} style={this.FormStyle}>
              <div style={this.headerStyle} className="login-header">
                Login
              </div>
              <div style={this.inputStyle} className="form-group">
                <label htmlFor="exampleInputEmail1">Username</label>
                <input onChange={this.emailInput} value={email} type="username" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                <small id="emailHelp" className="form-text text-muted">Username credentials for signing in</small>
              </div>
              <div style={this.inputStyle} className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input onChange={this.passwordInput} value={password} type="password" className="form-control" id="exampleInputPassword1"/>
              </div>
              <button style={this.buttonStyle} type="submit" className="btn btn-primary">Submit</button>
            </form>
        )
    }

    inputStyle = {
      margin: '10px 20px 10px 20px',
    }

    buttonStyle = {
      margin: '0 20px 10px 20px',
    }

    FormStyle = {
      width: '80%',
      backgroundColor: '#fcfcfc',
      height: 'fit-content',
      margin: '65px auto 0 auto',
    }

    headerStyle = {
      backgroundColor: '#312f8b',
      height: '40px',
      textAlign: 'center',
      paddingTop: '7px',
      color: 'white',
    }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login)