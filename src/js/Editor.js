import '../css/Editor.css'
import React from "react"
import saveToDatabase from "./saveToDatabase.js";
import getFromDatabase from './getFromDatabase.js';
import axios from "axios";
import WindowManager from './WindowManager';

class EditorScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomID: props.roomID
        }
        this.begin(props.roomID)
    }

    switchToWelcome() {
        console.log("toggled welcome");
        this.props.callback([{"cmd":"welcome", "val":0}])
    }
    
    requestSwitch() {
        this.props.callback([{"cmd":"swapRequest", "val":0}])
    }

    downloadFile(content) {
        const element = document.createElement('a');
        const blob = new Blob([content], { type: 'text/javascript' });
      
        const fileUrl = URL.createObjectURL(blob);
      
        element.setAttribute('href', fileUrl); //file location
        element.setAttribute('download', "testFile"); // file name
        element.style.display = 'none';
      
        document.body.appendChild(element);
        element.click();
      
        document.body.removeChild(element);
      };

    saveToFile() {
        console.log("Saving to file");
        const content = document.getElementById('code-box').value;
        console.log(`Content: ${content}`);
        this.downloadFile(content);
    }

    saveToDatabase() {
        const content = document.getElementById('code-box').value;
        console.log(`EditorRoomID: ${WindowManager.state.roomID}`)
        saveToDatabase(content, WindowManager.roomID);
    }

    async getFromDatabase() {
        const code = await getFromDatabase();
        const currentProgram = code[0].code;
        console.log(`HERE: ${JSON.stringify(code)}`);
        await axios.get('http://127.0.0.1:5000/code', {code: currentProgram}, {
        headers: {
            "Content-Type": "application/json"
        }
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err.response);
        });
    
        document.getElementById('code-box').value = currentProgram;
    }

    begin(roomID) {
        axios.get(`http://127.0.0.1:5000/code/${roomID}`)
            .then(res => {
            console.log(res.data)
            document.getElementById('code-box').value = res.data[0].code.S;
        })

        this.reload = setInterval(async function(){
            const currentProgram = document.getElementById('code-box').value;
            saveToDatabase(currentProgram, Number(roomID));
          }, 1000);
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:5000/users`)
          .then(res => {
            const users = res.data;
            this.setState({ users });
          })
    
      }
	  
	  componentWillUnmount() {
		  clearInterval(this.reload);
	  }


    render() {
       return (
        <div className="Editor">
            <div class="menuBar"></div>
            <div class="BARCON">
                <div class="shape2"></div>
                <div class="shape2"></div>
                <div class="shape2"></div>
                <div class="logo2"></div>
                <div id="Editor-sidebar" display="block">
                    <div className="Editor-explorer">
                        <button class="menu-A" onClick={this.saveToFile.bind(this)} >Save to file</button>
                        <button className = "LEAVE-B" onClick={this.switchToWelcome.bind(this)} >Leave Sessions</button>
                    </div>
                </div>
            </div>
        <div className="Editor-Header">
        </div>
        <div className="Editor-Content">
            <div className="Editor-Main">
                <div className="Editor-Top-Menu">
                    <div className="Request-Field">
                        <button className = "swap-C" onClick={this.requestSwitch.bind(this)} >Request</button>
                        <text class="text-glow">
                             Host

                        </text>
                    </div>
                </div>
                <div id="main-panel">
                    <textarea className="code-box" id="code-box" spellCheck="false" />
                </div>
            </div>
        </div>
    </div>
        )
    }
}

export default EditorScreen;