import HashTree from '../../structures/HashTree';

export default function createContainer(state, action){
    const { name, guid } = action;
    const container = { name, guid, children: []};
    container.hash = HashTree.computeHash(container)
    
    state.elements[guid] = [container];
    state.containers.push(container.guid);
} 
