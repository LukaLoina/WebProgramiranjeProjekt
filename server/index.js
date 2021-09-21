import express from 'express'
import expressWs from 'express-ws'

import store from './reducers/index.js'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

let guid = uuidv4()
store.dispatch({type:'list/createContainer',
		name: "Server list",
		guid})

const app = express()
const wsInstance = expressWs(app);
const port = process.env.PORT || '8080'

app.get('/guid', (req, res) => {
    console.log("request guid");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json({"guid": store.getState().list.containers[0]});
})

app.ws('/', function(ws, req){
    ws.on('message', function(data){
	//send to all clients for all ws handlers,  ok here because we have only one ws handler
	try{
	    const msg = JSON.parse(data)
	    if(msg.type && msg.type === "server"){
		if(msg.action && msg.action === "getState"){
		    let state = JSON.stringify(store.getState().list.elements[guid])
		    console.log(JSON.stringify(store.getState()))
		    console.log(state);
		    ws.send(JSON.stringify({"type": "server", "action":"setState", state}))
		}
	    } else {
		store.dispatch(msg)
		
		wsInstance.getWss().clients.forEach(function each(client) {
		    //WebSocket.OPEN equals 1
		    if (client.readyState === 1) {
			client.send(data);
		    }
		});
	    }
	} catch(error) {
	    console.error(error);
	}

    })
})

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

