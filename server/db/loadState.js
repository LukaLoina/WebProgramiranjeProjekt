import pool from './index.js'

async function loadState(){
    let elements = {}
    let containers = []

    const res = await pool.query("SELECT * FROM containers", [])
    if(res.rows[0]){
	//insert existing contianers
	containers = res.rows.map(c => c.guid);
	for(const container of containers){
	    elements[container] = []
	    const res = await pool.query("SELECT * FROM elements WHERE container = $1", [container]);
	    for(const element of res.rows){
		elements[container].push(element);
	    }
	}
	
    }
    return {elements, containers}
} 


export default loadState

/*

   if(res.rows[0]){
   res.rows.forEach(row =>{
   const res = pool.query("SELECT * FROM elements WHERE guid = $1", [row])
   .then(res => {
   if(res.rows[0]){
   
   const element = res.rows[0]
   store.dispatch({type:'list/addItem',
   title: element.title,
   guid: element.guid,
   children: []})
   //insert existing container elements
   guid = element.guid;
   pool.query("SELECT * FROM elements WHERE container = $1 AND NOT guid = $1", [element.guid])
   .then(child => {
   if(child.rows){
   child.rows.forEach(child => {
   store.dispatch({type:'list/addItem',
   item: {guid: child.guid,
   title: child.title,
   body: child.body,
   children: child.children},
   container: element.guid})
   })
   }
   })
   }
   })
   })

   } else {
   console.log("create by guid");

   }


 */
