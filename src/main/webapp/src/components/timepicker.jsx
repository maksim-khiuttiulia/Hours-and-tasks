import React, { Component } from 'react';
import { DropdownItem, UncontrolledDropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import './timepicker-style.css'


export default class TimePicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEmpty: this.props.isEmpty || true,
            time: "00:00",
            nullValue: this.props.nullValue || "--:--",
            disabled: this.props.disabled || false
        }
    }

    componentDidUpdate(prevProps) {

        if (prevProps !== this.props) {
            this.setState(prevState => ({
                isEmpty: this.props.isEmpty || true,
                time: "00:00",
                nullValue: this.props.nullValue || "--:--",
                disabled: this.props.disabled || false
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
        items.push(<DropdownItem value={this.state.nullValue} onClick={this.onChange}>{this.state.nullValue}</DropdownItem>)
        for (let i = 0; i < 24; i++) {
            const fullHour = this.getFormatedTime(i, 0)
            const halfHour = this.getFormatedTime(i, 30)
            items.push(<DropdownItem value={fullHour} onClick={this.onChange}>{fullHour}</DropdownItem>)
            items.push(<DropdownItem value={halfHour} onClick={this.onChange}>{halfHour}</DropdownItem>)
        }
        return items;
    }

    getFormatedTime = (hours, minutes) => {
        return ('0' + hours).slice(-2) + ":" + ('0' + minutes).slice(-2)
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