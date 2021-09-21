import HashTree from '../../structures/HashTree.js';

import addItem from './addItem.js'
import removeItem from './removeItem.js'

export default function moveItem(state, action){
    const { item, target } = action;

    removeItem(state, action);
    
    let modifiedItem = { ...item, parent: target}
    modifiedItem.hash = HashTree.computeHash(modifiedItem);
    let modifiedAction = { ...action, item:modifiedItem}
    
    addItem(state, modifiedAction);
} 
