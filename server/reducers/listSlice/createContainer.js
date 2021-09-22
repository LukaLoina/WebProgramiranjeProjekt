import HashTree from '../../structures/HashTree.js';
import pool from '../../db/index.js'

export default function createContainer(state, action){
    const { title, guid } = action;
    const container = { title, guid, children: []};
    container.hash = HashTree.computeHash(container)
    
    state.elements[guid] = [container];
    state.containers.push(container.guid);


    pool.query("INSERT INTO containers(guid) VALUES ($1);", [guid],(err, result) => {
	if (err) {
	    return console.error('Error executing query', err.stack)
    }});
    
    pool.query("INSERT INTO elements(container, guid, title, body, hash, children) VALUES ($1, $1, $2, $3, $4, $5)", [guid, title, "", "", []], (err, result) => {
	if (err) {
	    return console.error('Error executing query', err.stack)
	}
	console.log("insert container result");
	console.log(result);
    })
} 
