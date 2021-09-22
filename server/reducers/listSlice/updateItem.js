import pool from '../../db/index.js'

export default function updateItem(state, action){
    const { container, item } = action;

    const index = state.elements[container].findIndex(e => e.guid === item.guid)

    if(index !== -1){
	state.elements[container][index] = item;
    } else {
	state.elements[container].push(item);
    }

    pool.query("UPDATE elements SET guid = $1, title = $2, body = $3, hash = $4, children = $5 WHERE guid = $1", [item.guid, item.title, item.body, item.hash, item.children])
    
} 
