import React, { Component } from 'react';
import { DropdownItem, UncontrolledDropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import './timepicker-style.css'
import {getFormatedHoursMinutes} from '../utils/date-time'


export default class TimePicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEmpty: this.props.isEmpty || true,
            time: null,
            nullValue: this.props.nullValue || "--:--",
            disabled: this.props.disabled || false
        }
    }

    componentDidUpdate(prevProps) {

        if (prevProps !== this.props) {
            this.setState(prevState => ({
                isEmpty: this.props.isEmpty || prevState.isEmpty,
                disabled: this.props.disabled,
            }))
        }
    }

    onChange = (e) => {
        const value = e.target.value;
        if (this.props.onChange) {
            const returnValue = value === this.state.nullValue ? null : value
            this.props.onChange(returnValue)
        }
        this.setState(prevState => ({
            ...prevState,
            isEmpty: value === this.state.nullValue,
            time: value
        }))

    }

    // Prepare dropdown items for render
    prepareItems = () => {
        let items = [];
        items.push(<DropdownItem key="1" value={this.state.nullValue} onClick={this.onChange}>{this.state.nullValue}</DropdownItem>)
        for (let i = 0; i < 24; i++) {
            for(let j = 1; j <= 2; j++){
                const time = getFormatedHoursMinutes(i, 60/j)
                items.push(<DropdownItem key={time} value={time} onClick={this.onChange}>{time}</DropdownItem>)
            }
        }
        return items;
    }




    render() {
        const currentValue = this.state.isEmpty ? this.state.nullValue : this.state.time
        return (
            <UncontrolledDropdown disabled={this.state.disabled}>
                <DropdownToggle caret className={this.props.className} disabled={this.state.disabled}>
                    {currentValue}
                </DropdownToggle>
                <DropdownMenu className="scrollable-menu">
                    {this.prepareItems()}
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }
}