import React, { Component } from 'react';
import {Link, browserHistory} from 'react-router';

// App component - represents the whole app
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      "usernameSignIn":"",
      "password":""
    };
  }

  loginin(){
    let login = document.body.querySelector(".logincontainer");
    login.style.display = "block";
    login.classList.remove("logincontainer--loginout");
    login.classList.add("logincontainer--loginin");
  }

  loginout(){
    let login = document.body.querySelector(".logincontainer");
    let menu = document.body.querySelector(".menu");
    menu.style.display = "block";
    menu.classList.remove("menu--loginout");
    menu.classList.add("menu--loginin");
    login.classList.remove("logincontainer--loginin");
    login.classList.add("logincontainer--loginout");
    setTimeout(function(){login.style.display = "none"}, 1000);
  }

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

  handleChangeUsernameLogIn(event) {
    this.setState({usernameSignIn: event.target.value});
  }

  handleChangePasswordLogIn(event) {
    this.setState({passwordSignIn: event.target.value});
  }

  handleSubmitLogIn(event) {
    event.preventDefault();
    let users = this.props.data.users;
    for (var i = users.length - 1; i >= 0; i--) {
      console.log(users[i].username , this.state.usernameSignIn)
      console.log(users[i].password , this.state.passwordSignIn)
      if(users[i].username == this.state.usernameSignIn && users[i].password == this.state.passwordSignIn){
        console.log(this.transitionTo)
        browserHistory.push('/menu/'+users[i].username)
      }
    }

  }

  render() {
    console.log(this.state.usernameSignIn,this.state.passwordSignIn)
    return (
      <div className="Home-container">
        <div className="bg1"></div>
        <div className="bg2"></div>
        <div className="bg3"></div>
        <div className="bg4"></div>
        <nav className="menu">
          <div className="menu__logo"></div>
          <ul className="menu__list">
            <li className="menu__list__item play" onClick={this.loginin}>PLAY</li><br />
            <li className="menu__list__item"><Link to="/about">ABOUT</Link></li>
          </ul>
        </nav>






        <div className="logincontainer">
          <div className="logincontainer__login">
            <Link to="#"><div className="logincontainer__login__back" onClick={this.loginout}></div></Link>
            <div className="logincontainer__login__logo"></div>
            <form className="logincontainer__login__form" onSubmit={this.handleSubmitLogIn.bind(this)}>
              <input type="text" placeholder="USERNAME" value={this.state.usernameSignIn} onChange={this.handleChangeUsernameLogIn.bind(this)}/><br />
              <input type="password" placeholder="PASSWORD" value={this.state.passwordSignIn} onChange={this.handleChangePasswordLogIn.bind(this)}/><br />
              <input className="submit" type="submit" value="GO" action="#"/><br />
              <Link to="#"><p className="signupbutton" onClick={this.signupin}>Don&rsquo;t have an account yet ? Sign up here</p></Link><br />
              <Link to="/menu"><p>Play as Guest000121 (no score)</p></Link>
            </form>
          </div>
        </div>







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
      </div>
    );
  }
}
