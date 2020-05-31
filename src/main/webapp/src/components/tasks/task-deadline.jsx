import React from 'react'
import { Badge } from 'reactstrap';
import { formatedDate } from '../../utils/date-time'

const TaskDeadLineLabel = ({ deadline }) => {


    let deadlineBadge = <Badge color="success" className="mr-1" >No deadline</Badge>;
    if (deadline) {
        deadlineBadge = <Badge color="danger" className="mr-1" >{formatedDate(deadline)}</Badge>;
    }
    return (
        deadlineBadge
    );

}

export default  TaskDeadLineLabel