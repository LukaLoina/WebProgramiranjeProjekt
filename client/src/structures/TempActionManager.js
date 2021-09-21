import store from '../reducers'
import BaseManager from './BaseManager'

export default class TempActionManager extends BaseManager{
    constructor(name, guid, callback){
	super(name, guid);
	if(callback) callback(this);
    }

    apply(object){
	store.dispatch(object);
    }
} 
