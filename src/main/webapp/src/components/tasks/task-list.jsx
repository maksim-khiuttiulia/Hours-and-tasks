import React from 'react'
import Task from './task'
import {ListGroup} from 'reactstrap'

const TaskList = ({tasks, onChangeStatus, onDeleteTask}) => {

    const renderedTasks = tasks.map(task => {
        return <Task task={task} key={task.id} onChangeTaskStatus={onChangeStatus} onDeleteTask={onDeleteTask}/>;
    })

    return (
        <ListGroup>
            {renderedTasks}
        </ListGroup>
    )
}
export default TaskList