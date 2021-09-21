import store from '../reducers'
import BaseManager from './BaseManager'

export default class WebSocketActionManager extends BaseManager{
    constructor(name, guid, address, callback){
	super(name, guid);
	
	
	let url = new URL(address);
	let uuidURL = new URL("/guid", url);
	uuidURL.protocol = "http:"
	
	fetch(uuidURL, {method: 'GET', mode: 'cors',})
	    .then(response => response.json())
	    .then(data => {
		this.guid = data.guid
		if(callback) callback(this);
		
		url.protocol = "ws:";
		this.socket = new WebSocket(url)
		this.socket.addEventListener('message', this.handleMessage);

		this.socket.addEventListener('open', (event) => {
		    this.socket.send(JSON.stringify({"type":"server", "action":"getState"}))
		})
	    })
	    .catch((error) => {
		console.error('Error:', error);
	    });
    }

    handleMessage = (event) => {
	let data = JSON.parse(event.data)
	data.container = this.guid;

	if(data.type && data.type === "server"){
	    if(data.action && data.action === "setState" && data.state){
		const items = JSON.parse(data.state);
		items.forEach(item => this.updateItem(item));
	    }
	}
	
	store.dispatch(data);
    }
    
    apply(object){
	this.socket.send(JSON.stringify(object))
    }
} 
