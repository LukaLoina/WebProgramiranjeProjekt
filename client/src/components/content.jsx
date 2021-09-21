import React from 'react';
import { connect } from 'react-redux'

import dragula from 'dragula';

import AddList from './AddList.jsx'

import ListContainer from './ListContainer.jsx'

import LocalStorage from '../structures/LocalStorage'
import LocalActionManager from '../structures/LocalActionManager'

class Content extends React.Component {

    constructor(props){
	super(props)
	
	this.drake = undefined;

	const containers = LocalStorage.read("containers") ?? []
	const actionManagers = {}
	containers.forEach(c => {
	    const state = LocalStorage.read(c)
	    const name = state.find(e => e.guid === c).name
	    actionManagers[c] = new LocalActionManager(name, c)
	})
	
	this.state = {actionManagers};
    }
    
    componentDidMount(){
	this.drake = dragula([...document.querySelectorAll(".elements")], {revertOnSpill: true})

	this.drake.on('drop', this.moveElement)
    }

    componentDidUpdate(){
	this.drake.containers = [...document.querySelectorAll(".elements")]
    }

    addActionManager = (actionManager) => {
	let actionManagers = this.state.actionManagers;
	actionManagers[actionManager.guid] = actionManager;
	this.setState({actionManagers})
    }
    
    render(){
	return	<div className="content">
	<AddList addActionManager={this.addActionManager} />
	{ this.props.containers && this.props.containers.map(c => <ListContainer destroyContainer={this.deleteActionManager} drake={this.drake} key={c} guid={c} actionManager={this.state.actionManagers[c]} />) }
	</div>;
    }

    moveElement = (el, destination, source, sibling) => {
	this.drake.cancel();

	const sourceContainerElement = el.closest(".list-container");
	const destinationContainerElement = destination.closest(".list-container");
	
	if(sourceContainerElement === destinationContainerElement){
	    //move item
	    const sourceContainer = this.state.actionManagers[sourceContainerElement.dataset.guid]
	    const itemElement = sourceContainer.getItem(el.dataset.key);
	    sourceContainer.moveItem(destination.dataset.key, itemElement , sibling && sibling.dataset.key);
	} else {
	    //remove and add element
	    //then remove and add all items children
	    //then remove and add all items children children
	    //...
	    
	    let item = el.dataset.key
	    let target = destination.dataset.key
	    let before = sibling && sibling.dataset.key 
	    const sourceContainer = this.state.actionManagers[sourceContainerElement.dataset.guid]
	    const destinationContainer = this.state.actionManagers[destinationContainerElement.dataset.guid]

	    this.moveToDifferentContainer(sourceContainer, destinationContainer, item, target, before)
	}
	this.drake.containers = [...document.querySelectorAll(".elements")]
    }

    moveToDifferentContainer(sourceContainer, destinationContainer, item, target, before){
	const itemElement = sourceContainer.getItem(item);

	itemElement.children.forEach(child => this.moveToDifferentContainer(sourceContainer, destinationContainer, child, item, null))
	
	sourceContainer.removeItem(itemElement);
	destinationContainer.addItem(target, itemElement, before);
    }

    deleteActionManager = (actionManager) =>{
	let actionManagers = this.state.actionManagers;
	delete actionManagers[actionManager.guid];
	actionManager.destructor()
	this.setState({actionManagers})
    }

    pruneActionManagers = () => {
	const managers = this.state.actionManagers
	const keys = this.props.containers
	let updated = false
	Object.keys(managers).forEach(k => {if(!keys.includes(k)){ updated=true; delete managers[k] }})
	if(updated){this.setState({actionManagers: managers})}
    }
}

function mapStateToProps(state, ownProps){
    const containers = state.list.containers;
    return { containers }
}

export default connect(mapStateToProps)(Content)

 
