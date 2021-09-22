import HashTree from '../../structures/HashTree.js';
import pool from '../../db/index.js'

import {original} from "immer"

export default function addItem(state, action){
    const { container, item, before } = action
    console.log(action);
    let parentElement = state.elements[container].find(e => e.guid === item.parent);

    if(parentElement){
	console.log("parent element");
	let index = before ? parentElement.children.findIndex(e => e === before) : parentElement.children.length
	parentElement.children.splice(index, 0, item.guid);
	parentElement.hash = HashTree.computeHash(parentElement);
	state.elements[container].push(item);
	pool.query('INSERT INTO elements(container, guid, title, body, hash, children, parent) VALUES ($1, $2, $3, $4, $5, $6, $7)', [container, item.guid, item.title, item.body, item.hash, item.children, item.parent],(err, result) => {
	    if (err) {
		return console.error('Error executing query', err.stack)
	}})

	const children = Array.from(parentElement.children)
	console.log(children);
	pool.query('UPDATE elements SET children = $3 WHERE container = $1 AND guid = $2', [container, item.parent, children],(err, result) => {
	    if (err) {
		return console.error('Error executing query', err.stack)
	}})
	
    } else {
	//do something on error
	console.log("no parent");
	state.elements[container].push(item);
	pool.query('INSERT INTO elements(container, guid, title, body, hash, children, parent) VALUES ($1, $2, $3, $4, $5, $6, $7)', [container, item.guid, item.title, item.body, item.hash, item.children, ""],(err, result) => {
	    if (err) {
		return console.error('Error executing query', err.stack)
	}})
    }

   
	
} 
