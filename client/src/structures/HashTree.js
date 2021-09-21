import objectHash from 'object-hash'

export default class HashTree {
    static computeHash(object){
	const dataHash = objectHash(object, {
	    excludeKeys: function(key) {
		//exclude everything except guid, title and body
		return !["title", "body", "guid"].includes(key)
	}});
	const newHash = objectHash([dataHash, ...object.children.map(c => c.hash)]);
	return newHash;
    }
} 
