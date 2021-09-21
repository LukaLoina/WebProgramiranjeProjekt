import HashTree from '../../structures/HashTree';

export default function removeItem(state, action){
    let { container, item, recursive } = action

    console.log(action);
    if(recursive){
	item.children.forEach(c => {
	    let child = state.elements[container].find(e => e.guid === c);
	    console.log(`delete ${c}, child of ${item.guid}`)
	    console.log(child.guid)
	    removeItem(state, {container, item: child, recursive: true})
	})
    }
    console.log("remove item");
    console.log(item.guid);
    let parentElement = state.elements[container].find(e => e.guid === item.parent);

    //remove from parent
    let indexParent = parentElement.children.findIndex(e => e === item.guid);
    if(indexParent !== -1){
	parentElement.children.splice(indexParent, 1);
    }
    parentElement.hash = HashTree.computeHash(parentElement);

    //remove from elements
    let itemElementsIndex = state.elements[container].findIndex(e => e.guid === item.guid)
    if(itemElementsIndex !== -1){
	state.elements[container].splice(itemElementsIndex, 1);
    }
}
