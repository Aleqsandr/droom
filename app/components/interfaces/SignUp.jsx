import React, { Component } from 'react';
import {Link} from 'react-router';

// App component - represents the whole app
export default class LogIn extends Component {

  signupin(){
    let signup = document.body.querySelector(".signupcontainer");
    let login = document.body.querySelector(".logincontainer");
    let menu = document.body.querySelector(".menu");
    login.classList.remove("logincontainer--loginin");
    login.classList.add("logincontainer--loginout");
    setTimeout(function(){login.style.display = "none"}, 1000);
    menu.classList.remove("menu--loginin");
    menu.classList.add("menu--loginout");
    setTimeout(function(){menu.style.display = "none"}, 1000);
    signup.classList.remove("signupcontainer--loginout");
    signup.style.display = "block";
    signup.classList.add("signupcontainer--loginin");
    setTimeout(function(){login.style.display = "none"}, 1000);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.isSignup)
      this.signupin();
  }

  signupout(){
    let signup = document.body.querySelector(".signupcontainer");
    let login = document.body.querySelector(".logincontainer");
    signup.classList.remove("signupcontainer--loginin");
    signup.classList.add("signupcontainer--loginout");
    login.style.display = "block";
    login.classList.remove("logincontainer--loginout");
    login.classList.add("logincontainer--loginin");
    setTimeout(function(){signup.style.display = "none"}, 1000);
  }

  render() {
    return (
      <div className="signupcontainer">
        <div className="signupcontainer__signup">
          <Link to="#"><div className="signupcontainer__signup__back" onClick={this.signupout}></div></Link>
          <p>WELCOME ON DROOM.<br/>READY TO KICK THE INTERNET ?</p>
          <form className="signupcontainer__signup__form">
            <input type="text" placeholder="USERNAME" /><br />
            <input type="password" placeholder="PASSWORD" /><br />
            <input type="text" placeholder="EMAIL" /><br />
            <input type="number" placeholder="YOUR AGE" /><br /><br />
            <input className="submit" type="submit" value="I SIGN UP" action="#"/><br />
          </form>
        </div>
      </div>
    );
  }
}
