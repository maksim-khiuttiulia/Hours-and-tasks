import React, { Component } from 'react'
import { ButtonGroup, Button } from 'reactstrap';

export default class SortBy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            params: this.props.params,
            selected: this.props.selected
        }
    }


    componentDidUpdate(props) {
        if (this.props !== props) {
            this.setState({
                params: props.params,
                selected: props.selected
            })
        }
    }

    onSelect = (e) => {
        e.target.blur()
        let key = e.target.value
        const {selected} = this.state

        if (selected && key === selected){
            key = ''
        }
        this.setState({
            selected : key
        })

        if (typeof this.props.onSelect == "function"){
            this.props.onSelect(key);
        }
    }


    renderButtons = () => {
        let buttons = this.state.params.map((param, i) => {
            if (param.key === this.state.selected) {
                return <Button color="primary" key={i} className="active not-focusable" onClick={this.onSelect} value={param.key}>{param.value}</Button>
            }
            return <Button color="primary" key={i} className="not-focusable" onClick={this.onSelect} value={param.key}>{param.value}</Button>
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