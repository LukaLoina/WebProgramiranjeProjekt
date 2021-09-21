export default function destroyContainer(state, action){
    const { guid } = action;
    
    delete state.elements[guid]
    
    let index = state.containers.findIndex(c => c === guid);
    if(index !== -1){
	state.containers.splice(index, 1);
    }
} 
