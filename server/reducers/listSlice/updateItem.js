export default function updateItem(state, action){
    const { container, item } = action;

    const index = state.elements[container].findIndex(e => e.guid === item.guid)

    if(index !== -1){
	state.elements[container][index] = item;
    } else {
	state.elements[container].push(item);
    }
    
} 
