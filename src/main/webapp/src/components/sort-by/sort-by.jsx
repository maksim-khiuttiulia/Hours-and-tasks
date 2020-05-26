import React, { Component } from 'react'
import { ButtonGroup, Button } from 'reactstrap';
import {faArrowUp, faArrowDown  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class SortBy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            params: Array.isArray(this.props.params) ? this.props.params : [] ,
            selected: this.props.selected | null,
            orderBy : null
        }
    }


    componentDidUpdate(props) {
        if (this.props !== props) {
            this.setState({
                params: props.params,
                selected: props.selected,
            })
        }
    }

    onSelect = (e) => {
        e.target.blur()
        const {selected, orderBy} = this.state
        let key = e.target.value
        let newOrder = "asc"
        

        if (selected && key === selected){
            if (orderBy === "asc"){
                newOrder = "desc"
            }
            if (orderBy === "desc"){
                newOrder = null;
                key = null;
            }
        }
        if (!selected){
            newOrder = "asc"
        }
        this.setState({
            selected : key,
            orderBy : newOrder
        })

        if (typeof this.props.onSelect == "function"){
            this.props.onSelect(key, newOrder);
        }
    }


    renderButtons = () => {

        const {selected, orderBy} = this.state

        let icon

        if (orderBy === "asc"){
            icon = <FontAwesomeIcon icon={faArrowDown}/>
        } 
        if (orderBy === "desc"){
            icon = <FontAwesomeIcon icon={faArrowUp}/>
        } 

        let buttons = this.state.params.map((param, i) => {
            if (param.key === selected) {
            return <Button color="primary" key={i} className="active not-focusable" onClick={this.onSelect} value={param.key}>{param.value} {icon}</Button>
            }
            return <Button color="primary" key={i} className="not-focusable" onClick={this.onSelect} value={param.key}>{param.value} </Button>
        })
        return buttons
    }




    render() {
        return (
            <ButtonGroup>
                {this.renderButtons()}
            </ButtonGroup>
        )
    }
}