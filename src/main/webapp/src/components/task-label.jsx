import React, {Component} from 'react'
import { Badge } from 'reactstrap';

export default class TaskLabel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.label.id,
            name : this.props.label.name,
            color : this.props.label.color
        }
    }

    onClick = (e) => {
        e.preventDefault();
        if (typeof this.props.onClick === "function"){
            this.props.onClick(this.state.id)
        } else {
            console.warn("onClick is not function or not implemented")
            alert("Haha you found a bug");
        }
    }

    render(){
        return (
            <Badge href="#" pill style={{backgroundColor: this.state.color }} className="mr-1" onClick={this.onClick}>{this.state.name} </Badge>
        );
    }
}