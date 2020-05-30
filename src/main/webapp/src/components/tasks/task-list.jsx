import React from 'react'
import Task from './task'
import {ListGroup} from 'reactstrap'

const TaskList = ({tasks, onChangeStatus, onDeleteTask, onEditTask}) => {

    const renderedTasks = tasks.map(task => {
        return <Task task={task} key={task.id} onChangeTaskStatus={onChangeStatus} onDeleteTask={onDeleteTask} onEditTask={onEditTask}/>;
    })

    return (
        <ListGroup>
            {renderedTasks}
        </ListGroup>
    )
}
export default TaskList