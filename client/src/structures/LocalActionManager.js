import store from '../reducers'
import TempActionManager from './TempActionManager'
import LocalStorage from './LocalStorage'

export default class LocalActionManager extends TempActionManager{
    constructor(name, guid, callback){
	super(name, guid);
	this.unsubscribe = store.subscribe(this.listener);
	if(callback) callback(this);
	
	const containers = LocalStorage.read("containers") ?? [];
	if(!containers.includes(this.guid)){
	    containers.push(this.guid)
	    LocalStorage.write("containers", containers)
	}
    }
    destructor(){
	this.unsubscribe()
	LocalStorage.remove(this.guid);

	const containers = LocalStorage.read("containers");
	const index = containers.indexOf(this.guid);
	if (index !== -1) {
	    containers.splice(index, 1);
	    LocalStorage.write("containers", containers);
	}
	
    }

    listener = () => {
	const state = store.getState().list.elements[this.guid]
	LocalStorage.write(this.guid, state);
    }
} 
