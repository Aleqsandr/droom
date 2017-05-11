import React, { Component } from 'react';
import {Link, browserHistory } from 'react-router';
import * as firebase from "firebase";

// App component - represents the whole app
export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            signupEmail: null,
            signupPwd: null,
            signinEmail: null,
            signinPwd: null
        };
    }

    componentWillMount(){

        setTimeout(function(){
            let curUser;
            curUser = firebase.auth().currentUser;
            console.log("cur :",curUser.email)
            if(!(curUser)){
                console.log("welcome visitor !")
            }
            else{
                browserHistory.push('/menu');
            }
        },1500)

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

    handleChangeSignupEmail(event) {
        this.setState({signupEmail: event.target.value});
    }

    handleChangeSignupPwd(event) {
        this.setState({signupPwd: event.target.value});
    }

    handleChangeSigninEmail(event) {
        this.setState({signinEmail: event.target.value});
    }

    handleChangeSigninPwd(event) {
        this.setState({signinPwd: event.target.value});
    }

    handleSubmitLogIn(e) {
        e.preventDefault();

        let myEmail = this.state.signinEmail;
        let myPwd = this.state.signinPwd;

        if( myEmail == null && myPwd == null){
            alert('You need to complete the following inputs : Email, Password');
        }
        else{

            firebase.auth().signInWithEmailAndPassword(myEmail, myPwd)
                    .then((firebaseUser)=>{
                        browserHistory.push('/menu');
                    })
                    .catch((error) => {
                        console.log(error)
                    });

        }


    }

    handleSubmitSignup(e){
        e.preventDefault();
        let myEmail = this.state.signupEmail;
        let myPwd = this.state.signupPwd;
        if( myEmail == null && myPwd == null){
            alert('You need to complete the following inputs : Email, Password');
        }
        else{
            firebase.auth().createUserWithEmailAndPassword(myEmail, myPwd)
                    .then(()=>{
                        console.log("bien joué")

                        var curUser = firebase.auth().currentUser;
                        firebase.database().ref('users').push({
                            id: curUser.uid,
                            email:myEmail
                        });
                    })
                    .then( ()=> {
                        browserHistory.push('/menu');
                    })
                    .catch((error) => {
                        console.log(error)
                    })
        }

    }

    render() {
        return (
            <div className="Home-container">
                <div className="bg-overlay"></div>
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
                            <input type="text" placeholder="EMAIL" value={this.state.signinEmail} onChange={this.handleChangeSigninEmail.bind(this)}/><br />
                            <input type="password" placeholder="PASSWORD" value={this.state.signinPwd} onChange={this.handleChangeSigninPwd.bind(this)}/><br />
                            <input className="submit" type="submit" value="GO" action="#"/><br />
                            <Link to="#"><p className="signupbutton" onClick={this.signupin}>Don&rsquo;t have an account yet ? Sign up here</p></Link><br />
                            <Link to="/menu"><p>Play as Droomy (guest with no score)</p></Link>
                        </form>
                    </div>
                </div>

                <div className="signupcontainer">
                    <div className="signupcontainer__signup">
                        <Link to="#"><div className="signupcontainer__signup__back" onClick={this.signupout}></div></Link>
                        <p>WELCOME TO DROOM.<br/>READY TO KICK THE INTERNET ?</p>
                        <form className="signupcontainer__signup__form" onSubmit={this.handleSubmitSignup.bind(this)}>
                            <input type="mail" placeholder="EMAIL" value={this.state.signupEmail} onChange={this.handleChangeSignupEmail.bind(this)}/><br />
                            <input type="password" placeholder="PASSWORD" value={this.state.signupPwd} onChange={this.handleChangeSignupPwd.bind(this)}/><br />
                            <input className="submit" type="submit" value="I SIGN UP" action="#"/><br />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
