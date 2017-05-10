import React, { Component } from 'react';
import {Link} from 'react-router';

// App component - represents the whole app
export default class LogIn extends Component {

  loginin(){
  }

  loginout(){
    let self = this;
    this.refs.loginContainer.classList.remove("logincontainer--loginin");
    this.refs.loginContainer.classList.add("logincontainer--loginout");
    this.props.handlePrevSignIn()
    setTimeout(function(){self.refs.loginContainer.style.display = "none"}, 1000);
  }

  handleClickSignUp() {
    this.props.handleSignUp();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.isLogIn) {
      this.refs.loginContainer.style.display = "block";
      this.refs.loginContainer.classList.remove("logincontainer--loginout");
      this.refs.loginContainer.classList.add("logincontainer--loginin");
    }
  }

  render() {
    return (
      <div className="logincontainer" ref="loginContainer">
        <div className="logincontainer__login">
          <Link to="/"><div className="logincontainer__login__back" onClick={this.loginout.bind(this)}></div></Link>
          <div className="logincontainer__login__logo"></div>
          <form className="logincontainer__login__form">
            <input type="text" placeholder="USERNAME" /><br />
            <input type="password" placeholder="PASSWORD" /><br />
            <Link to="/app"><input className="submit" type="submit" value="GO" action="#"/></Link><br />
            <Link to="#"><p className="signupbutton" onClick={this.handleSignUp}>Don&rsquo;t have an account yet ? Sign up here</p></Link><br />
            <Link to="/menu"><p>Play as Guest000121 (no score)</p></Link>
          </form>
        </div>
      </div>
    );
  }
}
