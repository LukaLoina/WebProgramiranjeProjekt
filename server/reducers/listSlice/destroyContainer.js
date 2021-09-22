import pool from '../../db/index.js'

export default function destroyContainer(state, action){
    const { guid } = action;
    
    delete state.elements[guid]
    
    let index = state.containers.findIndex(c => c === guid);
    if(index !== -1){
	state.containers.splice(index, 1);
    }

    pool.query('DELETE FROM containers WHERE guid = $1', [guid],(err, result) => {
	if (err) {
	    return console.error('Error executing query', err.stack)
    }})

    pool.query('DELETE FROM elements WHERE container = $1', [guid],(err, result) => {
	if (err) {
	    return console.error('Error executing query', err.stack)
    }})
} 
