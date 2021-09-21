import React from 'react';
import { connect } from 'react-redux';

import ContentEditable from 'react-contenteditable'
import Element from './element'

class ListContainer extends React.Component {
    constructor(props){
	super(props)
	this.titleRef = React.createRef();
    }
    
    addItem = () => {
	const item = this.props.actionManager.createItem(this.props.container.guid, "", "")
	this.props.actionManager.addItem(this.props.container.guid, item, null);
    }

    componentDidUpdate(){
	if(this.props.drake){
	    this.props.drake.containers = [...document.querySelectorAll(".elements")]
	}
    }

    destroyContainer = () => {
	console.log("destroy container");
	this.props.actionManager.destroyContainer();
	if(this.props.destroyContainer) this.props.destroyContainer(this.props.actionManager);
    }

    handleChange = (event) => {
	clearTimeout(this.updateTimer);
	if(this.updateCounter < 10){
	    this.updateTimer = setTimeout(this.updateItem, 100);
	} else {
	    this.updateItem();
	}
    }

    updateItem = () => {
	this.updateCounter = 0;
	this.props.actionManager.updateItem({...this.props.container, name:this.titleRef.current.lastHtml})
    }
    
    render(){
	if(this.props.container){
	    return <div class="list-container" data-guid={this.props.container.guid}>
		<div className="list-container-title">
		    <ContentEditable ref={this.titleRef} className="list-container-title-text" html={this.props.container.name} onChange={this.handleChange} />
		    <button class="remove-list-container-button" onClick={this.destroyContainer}>X</button>
		</div>
		<div className="elements" data-key={this.props.container.guid}>
		    {this.props.container.children && this.props.container.children.map(child => <Element drake={this.props.drake} key={child} guid={child} depth={1} actionManager={this.props.actionManager} />)}
		</div>
		<button class="list-add-button" onClick={this.addItem}>add list item</button>
	    </div>
	} else {
	    return <>Error rendering {this.props.guid}</>
	}
    }
}

function mapStateToProps(state, ownProps){
    if(ownProps.actionManager){
	const container = ownProps.actionManager.getItem(ownProps.guid)
	return { container }
    } else {
	return {}
    }
}

export default connect(mapStateToProps)(ListContainer)
