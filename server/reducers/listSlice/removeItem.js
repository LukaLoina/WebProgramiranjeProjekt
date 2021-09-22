import HashTree from '../../structures/HashTree.js';
import pool from '../../db/index.js'

export default function removeItem(state, action){
    let { container, item, recursive } = action

    if(recursive){
	item.children.forEach(c => {
	    let child = state.elements[container].find(e => e.guid === c);
	    removeItem(state, {container, item: child, recursive: true})
	})
    }
    
    let parentElement = state.elements[container].find(e => e.guid === item.parent);

    //remove from parent
    let indexParent = parentElement.children.findIndex(e => e === item.guid);
    if(indexParent !== -1){
	parentElement.children.splice(indexParent, 1);
	const children = Array.from(parentElement.children)
	pool.query("UPDATE elements SET children = $2 WHERE guid = $1", [item.parent, children])
    }
    parentElement.hash = HashTree.computeHash(parentElement);

    //remove from elements
    let itemElementsIndex = state.elements[container].findIndex(e => e.guid === item.guid)
    if(itemElementsIndex !== -1){
	state.elements[container].splice(itemElementsIndex, 1);
	pool.query("DELETE FROM elements WHERE guid = $1", [item.guid])
    }
}
