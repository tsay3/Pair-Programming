import '../css/WelcomeScreen.css';
import React from "react";
import axios from "axios";

class WelcomeScreen extends React.Component {
    async switchToHostSelector() {
        console.log("toggled hostSelector");
        this.props.callback([{"cmd":"hostSelector", "val":0}])
    }
    
    switchToSelector() {
        console.log("toggled selector");
        this.props.callback([{"cmd":"sessionSelector", "val":0}]);
    }
    
    render() {
    return (
        <div className="Welcome-Header">
        <div className="menu-elements">
            <div class="container">
                <div class="shape"></div>
                <div class="shape"></div>
                <div class="shape"></div>
                <div class="logo"></div>
            </div>
            <div className="intro-box">
                <p className="welcome-text">Welcome to,</p>
                <p className="title-text">PAIR CODING</p>
                <p className="tagline-text">where two heads are better than one.</p>
            </div>
            <div className="role-prompt-container">
                <p className="prompt">JOIN OR HOST SESSION?</p>
                <hr />
                <div className="role-button-container">
                    <button class="join-button" onClick={this.switchToSelector.bind(this)}>Join</button>
                    <button class="host-button" onClick={this.switchToHostSelector.bind(this)} >Host</button>
                </div>
            </div>
        </div>
        </div>
    )
    }
}

export default WelcomeScreen;