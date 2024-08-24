import React from "react"
import WelcomeScreen from './WelcomeScreen'
import EditorScreen from './Editor'
import SessionSelectorScreen from './SessionSelector'
import SwapRequest from './SwapRequest'
import ViewerScreen from './viewer'
import HostSelectorScreen from "./HostSelector"

class WindowManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showWelcome: true,
            showEditor: false,
            showSessionSelector: false,
            showSwapRequest: false,
            roomID: 0,
        }
        this.handleCallback = this.handleCallback.bind(this);
    }
    
    handleCallback(props) {
        console.log(`${JSON.stringify(props)}`)
        switch (props[0].cmd) {
            case "welcome":
                this.setState({
                    showWelcome: true,
                    showEditor: false,
					showViewer: false,
                    showSessionSelector: false,
                    showHostSelector: false,
                    showSwapRequest: false});
                break;
            case "editor":
                this.setState({
                    showWelcome: false,
                    showEditor: true,
                    showViewer: false,
                    showSessionSelector: false,
                    showHostSelector: false,
                    showSwapRequest: false,
                    roomID: props[0].val
                });
                console.log(`This:${this.state.roomID}`)
                break;
            case "sessionSelector":
                this.setState({
                    showWelcome: false,
                    showEditor: false,
					showViewer: false,
                    showSessionSelector: true,
					showHostSelector: false,
                    showSwapRequest: false});
                break;
            case "swapRequest":
                this.setState({
                    showWelcome: false,
                    showEditor: true,
                    showSessionSelector: false,
                    showSwapRequest: true});
                break;
            case "joinSession":
                this.setState({
                    showWelcome: false,
                    showEditor: false,
                    showSessionSelector: false,
                    showSwapRequest: false,
                    showViewer: true,
                    showHostSelector: false,
                    roomID: props[0].val
                });
                break;
            case "hostSelector":
                this.setState({
                    showWelcome: false,
                    showEditor: false,
                    showSessionSelector: false,
                    showSwapRequest: false,
                    showViewer: false,
                    showHostSelector: true
                });
                break;
            default:
                console.log(props.name);
        }
    }
    
    render() {
        return (
            <div>
            <div class="welcome">
            {this.state.showWelcome && <WelcomeScreen callback={this.handleCallback}/> }
            </div>
            <div class="joinSession">
            {this.state.showViewer && <ViewerScreen 
                callback={this.handleCallback}
                roomID={this.state.roomID}
            /> }
            </div>
            <div class="editor">
            {this.state.showEditor && <EditorScreen 
                callback={this.handleCallback}
                roomID={this.state.roomID}
            /> }
            </div>
            <div class="swapRequest">
            {this.state.showSwapRequest && <SwapRequest callback={this.handleCallback}/> }
            </div>
            <div class="selector">
            {this.state.showSessionSelector && <SessionSelectorScreen callback={this.handleCallback}/> }
            </div>
            <div class="hostSelector">
            {this.state.showHostSelector && <HostSelectorScreen callback={this.handleCallback}/> }
            </div>
            </div>
        )
    }
}
    
export default WindowManager;