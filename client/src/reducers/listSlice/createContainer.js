import HashTree from '../../structures/HashTree';

export default function createContainer(state, action){
    const { title, guid } = action;
    const container = { title, guid, children: []};
    container.hash = HashTree.computeHash(container)
    
    state.elements[guid] = [container];
    state.containers.push(container.guid);
} 
