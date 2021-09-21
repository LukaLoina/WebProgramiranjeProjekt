import React from 'react';

import { connect } from 'react-redux'

import ContentEditable from 'react-contenteditable'

class Element extends React.Component {
    constructor(props){
	super(props);
	this.titleRef = React.createRef();
	this.bodyRef = React.createRef();
	this.updateTimer = null;
	this.updateCounter = 0;
	this.state = {hidden: false}
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
	this.props.actionManager.updateItem({...this.props.element, title:this.titleRef.current.lastHtml, body: this.bodyRef.current.lastHtml})
    }

    componentDidUpdate(){
	if(this.props.drake){
	    this.props.drake.containers = [...document.querySelectorAll(".elements")]
	}
    }

    addItem = () => {
	const item = this.props.actionManager.createItem(this.props.guid, "", "")
	this.props.actionManager.addItem(this.props.guid, item, this.props.element.children[0]);
    }

    removeElement = () => {
	this.props.actionManager.removeItem(this.props.element, true);
    }

    toggleHidden = () => {
	this.setState({hidden: !this.state.hidden})
    }
    
    render(){
	if(this.props.element){
	    return <div className="element" data-key={this.props.element.guid}>
		<div className="element-title">
		    <button class="add-element-button" onClick={this.addItem}>+</button>
		    <div className="element-depth-marker" onClick={this.toggleHidden}>{"*".repeat(this.props.depth)}</div>
		    <ContentEditable ref={this.titleRef} className="element-title-text" html={this.props.element.title} onChange={this.handleChange} />
		    <button class="remove-element-button" onClick={this.removeElement}>X</button>
		</div>	
		<div className={this.state.hidden ? "element-body hidden" : "element-body"}>
		    <ContentEditable ref={this.bodyRef} className="element-body-text" html={this.props.element.body} onChange={this.handleChange} />
		    <div class="elements" data-key={this.props.element.guid}>
			{this.props.element.children && this.props.element.children.map(child => <ConnectedElement drake={this.props.drake} key={child} guid={child} depth={this.props.depth+1} actionManager={this.props.actionManager} />)}
		    </div>
		</div>
		
	    </div>
	} else {
	    return <></>
	}
    }
}

	    function mapStateToProps(state, ownProps){
    const element = ownProps.actionManager.getItem(ownProps.guid)
    return { element }
}

//needed for recursive rendering
const ConnectedElement = connect(mapStateToProps)(Element)

export default ConnectedElement;
