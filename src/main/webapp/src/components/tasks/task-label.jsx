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
        }
    }

    render(){
        let clickable = typeof this.props.onClick === "function";
        let taskLabel = <Badge pill style={{backgroundColor: this.state.color }} className="mr-1" >{this.state.name} </Badge>;
        if (clickable){
            taskLabel = <Badge pill href="#" style={{backgroundColor: this.state.color }} className="mr-1" onClick={this.onClick} >{this.state.name} </Badge>;
        }
        return (
            taskLabel
        );
    }
}