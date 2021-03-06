import React from 'react';

import { v4 as uuidv4 } from 'uuid'
import TempActionManager from '../structures/TempActionManager'
import LocalActionManager from '../structures/LocalActionManager'
import WebSocketActionManager from '../structures/WebSocketActionManager'

export default class AddList extends React.Component{
    constructor(props){
	super(props);
	this.state = {selection: "temporary", name: "", remoteAddress: ""}
    }

    onActionManagerCreate = (actionManager) => {
	actionManager.createContainer();
	this.props.addActionManager(actionManager);
    }
    
    addActionManager = () => {
	//if no name is provided
	if(this.state.selection !== "websocket" && this.state.name === ""){
	    //TODO: display error message
	    return;
	}

	//if remote without address
	if(this.state.selection === "websocket" && this.state.remoteAddress === ""){
	    //TODO: display error message
	    return;
	}
	
	const guid = uuidv4();
	if(this.state.selection === "temporary"){
	    new TempActionManager(this.state.name, guid, this.onActionManagerCreate);
	} else if(this.state.selection === "local"){
	    new LocalActionManager(this.state.name, guid, this.onActionManagerCreate);
	} else if(this.state.selection === "websocket"){
	    new WebSocketActionManager("websocket", guid, this.state.remoteAddress, this.onActionManagerCreate);
	} else {
	    return;
	}
	this.setState({name: "", remoteAddress: ""})
    }

    setSelection = (event) => {
	this.setState({selection: event.target.value});
    }

    setName = (event) => {	this.setState({name: event.target.value});}
    setRemoteAddress = (event) => {this.setState({remoteAddress: event.target.value});}
    
    render(){
	return <div className="add-list">
	    <label className="add-list-label" for="selection">Type of list:</label>
	    <select class="add-selection" name="selection" onChange={this.setSelection}>
		<option value="temporary">temporary</option>
		<option value="local">local</option>
		<option value="websocket">WebSocket</option>
	    </select>

	    <div className={(this.state.selection !== "websocket") ? "add-list-entry" : "add-list-entry hidden"}>
		<label className="add-list-label" for="type">Name</label>
		<input className="add-list-input" onChange={this.setName} value={this.state.name} />
	    </div>
	    
	    <div className={(this.state.selection === "websocket") ? "add-list-entry" : "add-list-entry hidden"}>
		<label className="add-list-label" for="type">Address</label>
		<input className="add-list-input" onChange={this.setRemoteAddress} value={this.state.remoteAddress} />
	    </div>
	    
	    <button onClick={this.addActionManager}>add list</button>
	</div>
    }
}
