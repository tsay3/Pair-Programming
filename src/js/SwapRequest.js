import '../css/SwapRequest.css'
import React from "react"

class SwapRequest extends React.Component {
    swapPrivilege() {
        this.props.callback([{"cmd":"swapPrivilege", "val":0}])
    }
    
    turnOffSwap() {
        this.props.callback([{"cmd":"editor", "val":0}])
    }
    
    render() {
        return (
            <div className="Swap-Request">
                <div className="Swap-Container">
                    <div className="Notification">
                        <p>OTHER USER HAS REQUESTED TO WRITE.</p>
                    </div>
                    <div className="Request-Buttons-Container">
                        <button className="Allow-Button" onClick={this.swapPrivilege.bind(this)}>Allow</button>
                        <button className="Deny-Button" onClick={this.turnOffSwap.bind(this)}>Deny</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SwapRequest;