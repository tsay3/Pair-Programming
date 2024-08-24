import '../css/SessionSelector.css'
import React from "react";

class SessionSelectorScreen extends React.Component {
    state = {
        sessionPick: -1
    };
    
    joinSession() {
        this.props.callback([{
            "cmd":"joinSession", "val":this.state.sessionPick
        }]);
    }
    
    setSession = (event) => {
        this.setState(
            ({sessionPick: event.target.value})
        )
    };
    
    switchToWelcome() {
        console.log("toggled welcome");
        this.props.callback([{
            "cmd":"welcome", "val":0}]);
    }
    
    render() {
       return (
            <div className="Selector-Main">
                <div className="selCon">

                    <div id="main-panel">
                        <p>Please enter the class session ID.</p>
                        <input type="text" className="id-input"
                        onChange={this.setSession}/>
                    </div>
                    <div id="sidebar" display="block">
                        <button onClick={this.joinSession.bind(this)} >Join</button>
                        <button onClick={this.switchToWelcome.bind(this)} >Back</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SessionSelectorScreen;