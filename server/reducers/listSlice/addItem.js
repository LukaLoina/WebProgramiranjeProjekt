import HashTree from '../../structures/HashTree.js';

export default function addItem(state, action){
    const { container, item, before } = action
    console.log(action);
    let parentElement = state.elements[container].find(e => e.guid === item.parent);

    if(parentElement){
	let index = before ? parentElement.children.findIndex(e => e === before) : parentElement.children.length
	parentElement.children.splice(index, 0, item.guid);
	parentElement.hash = HashTree.computeHash(parentElement);
	state.elements[container].push(item);
    } else {
	//do something on error
	state.elements[container].push(item);
    }


   
} 
