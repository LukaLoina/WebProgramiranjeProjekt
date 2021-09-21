export default class LocalStorage {
    static read(key){
	try{
	    return JSON.parse(localStorage.getItem(key))
	} catch{
	    return undefined
	}
    }
    static write(key, object){
	localStorage.setItem(key, JSON.stringify(object))
    }
    static remove(key){
	localStorage.removeItem(key);
    }
} 
