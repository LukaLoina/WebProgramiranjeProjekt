import store from '../reducers'
import { v4 as uuidv4 } from 'uuid';
import HashTree from './HashTree';

export default class BaseManager{
    constructor(name, guid){
	this.name = name;
	this.guid = guid;
    }

    destructor(){return;}
    
    apply(object){return;}

    createContainer(){
	const data = {type:'list/createContainer',
		      name: this.name,
		      guid: this.guid}
	store.dispatch(data);
    }

    destroyContainer(){
	const data = {type: 'list/destroyContainer',
		      guid: this.guid}
	store.dispatch(data);
    }
    
    addItem(parent, item, before){
	const data = {type: 'list/addItem',
		      container: this.guid,
		      before,
		      item:{...item, parent}}
	this.apply(data);
    }

    removeItem(item, recursive){
	const data = {type: 'list/removeItem',
		      container: this.guid,
		      item,
		     recursive}
	this.apply(data);
    }

    moveItem(target, item, before){
	const data = {type: 'list/moveItem',
		      container: this.guid,
		      item,
		      target,
		      before}
	this.apply(data);
    }

    updateItem(item){
	const data = {type: 'list/updateItem',
		      container: this.guid,
		      item}
	this.apply(data);
    }

    getItem(guid){
	return store.getState().list.elements[this.guid].find(e => e.guid === guid);
    }

    createItem(parent, title, body, children = []){
	const guid = uuidv4()
	const item = {title, body, parent, guid, children: []}
	item.hash = HashTree.computeHash(item)
	return item
    
    }
} 
