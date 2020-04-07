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

    render(){
        return (
            <Badge pill style={{backgroundColor: this.state.color }} className="mr-1">{this.state.name} </Badge>
        );
    }
}