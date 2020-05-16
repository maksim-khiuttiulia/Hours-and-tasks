import React, {Component} from 'react'
import { Badge } from 'reactstrap';
import {formatedDate} from '../../utils/date-time'

export default class TaskDeadLineLabel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deadline : this.props.deadline
        }
    }

    render(){
        let deadlineBadge = <Badge color="success" className="mr-1" >No deadline</Badge>;
        if (this.state.deadline){
            deadlineBadge = <Badge color="danger" className="mr-1" >{formatedDate(this.state.deadline)}</Badge>;
        }
        return (
            deadlineBadge
        );
    }
}