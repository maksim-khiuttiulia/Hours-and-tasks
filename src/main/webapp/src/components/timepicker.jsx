import React, { Component } from 'react';
import { DropdownItem, UncontrolledDropdown, DropdownMenu, DropdownToggle } from 'reactstrap';


export default class TimePicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items : [],
            isEmpty: false,
            hours: 0,
            minutes: 0
        }
    }

    onChange = (e) => {
        const values = e.target.value.split(":")
        let hours = values[0];
        let minutes = values[1];
        this.setState(prevState => ({
            ...prevState,
            isEmpty: false,
            hours: hours,
            minutes: minutes
        }))
    }

    onEmpty = (e) => {
        this.setState(prevState => ({
            ...prevState,
            isEmpty: true,
            hours: null,
            minutes: null
        }))
    }

    prepareItems = () => {
        let items = [];
        items.push(<DropdownItem onClick={this.onEmpty}>No deadline</DropdownItem>)
        for (let i = 0; i < 24; i++) {
            items.push(<DropdownItem value={i + ":00"} onClick={this.onChange}>{i + ":00"}</DropdownItem>)
            items.push(<DropdownItem value={i + ":30"} onClick={this.onChange}>{i + ":30"}</DropdownItem>)
        }
        return items;
    }

    prepareDropDownMenu = () => {
        const menu = (<DropdownMenu className="dropdown-thin"
            modifiers={{
                setMaxHeight: {
                    enabled: true,
                    order: 890,
                    fn: (data) => {
                        return {
                            ...data,
                            styles: {
                                ...data.styles,
                                overflow: 'auto',
                                maxHeight: '200px',
                            },
                        };
                    },
                },
            }}>
            {this.prepareItems()}
        </DropdownMenu>)
        console.warn("redt")
        return menu
    }


    render() {
        const currentValue = this.state.isEmpty ? "No deadline" : this.state.hours + ":" + this.state.minutes
        return (
            <UncontrolledDropdown>
                <DropdownToggle caret>
                    {currentValue}
                </DropdownToggle>
                {this.prepareDropDownMenu()}
            </UncontrolledDropdown>
        );
    }
}