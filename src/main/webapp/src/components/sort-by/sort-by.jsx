import React, { Component } from 'react'
import { ButtonGroup, Button } from 'reactstrap';

export default class SortBy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: this.props.values,
            selected: this.props.selected
        }
    }


    componentDidUpdate(props) {
        if (this.props !== props) {
            this.setState({
                values: props.values,
                selected: props.selected
            })
        }
    }

    onSelect = (e) => {
        e.target.blur()
        let value = e.target.value
        const {selected} = this.state

        if (selected && value === selected){
            value = ''
        }
        this.setState({
            selected : value
        })

        if (typeof this.props.callback == "function"){
            this.props.callback(value);
        }
    }


    renderButtons = () => {
        let buttons = this.state.values.map((value, i) => {
            if (value === this.state.selected) {
                return <Button color="primary" key={i} className="active not-focusable" onClick={this.onSelect} value={value}>{value}</Button>
            }
            return <Button color="primary" key={i} className="not-focusable" onClick={this.onSelect} value={value}>{value}</Button>
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