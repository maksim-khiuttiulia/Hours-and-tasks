import React, { Component } from 'react'
import Task from './task'
import TaskAddForm from './task-add'
import TaskDeleteDialog from './task-delete-dialog'
import TaskAddDialog from './task-add-dialog'
import { ListGroup, ListGroupItem, Spinner, Button, Icon } from 'reactstrap';
import { getAllTasks, saveNewTask, changeTaskStatus, deleteTask } from '../services/task-service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'


export default class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            labels: [],
            tasks: [],
            deleteDialog: {
                task: null,
                isOpen: false
            },
            newTaskDialog: {
                isOpen: false
            }

        }
    }

    componentDidMount() {
        this.readTasks();
    }


    readTasks() {
        this.setState(prevState => ({
            loading: true
        }))

        getAllTasks(1).then((tasks) => {
            this.setState(prevState => ({
                tasks: tasks,
                loading: false
            }))
        })
    }

    openDeleteDialog = (task) => {
        this.setState({
            deleteDialog: {
                isOpen: true,
                task: task
            }
        })

    }

    openAddTaskDialog = () => {
        this.setState({
            newTaskDialog: {
                isOpen: true,
            }
        })

    }

    deleteDialogCallback = (task, isDeleted) => {
        this.setState({
            deleteDialog: {
                isOpen: false
            }
        })

        if (isDeleted && task) {
            this.onDeleteTask(task);
        }
    }



    onAddTask = (task) => {
        saveNewTask(1, task).then((data) => {
            this.readTasks()
        })
    }

    onDeleteTask = (task) => {
        deleteTask(1, task).then((data) => {
            this.readTasks()
        })
    }

    onChangeTaskStatus = (task) => {
        changeTaskStatus(1, task).then((data) => {
            this.readTasks()
        })
    }




    render() {

        let todoTasks = <ListGroupItem color="danger"><Spinner animation="border" /></ListGroupItem>
        let doneTasks = <ListGroupItem color="success"><Spinner animation="border" /></ListGroupItem>
        if (!this.state.loading) {
            todoTasks = this.state.tasks.filter((task) => !task.done).map((task) => {
                return <Task task={task} key={task.id} onChangeTaskStatus={this.onChangeTaskStatus} onDeleteTask={this.openDeleteDialog} />;
            });
            doneTasks = this.state.tasks.filter((task) => task.done).map((task) => {
                return <Task task={task} key={task.id} onChangeTaskStatus={this.onChangeTaskStatus} onDeleteTask={this.openDeleteDialog} />;
            });
        }

        return (
            <div>
                <TaskAddDialog projectId={1} isOpen={this.state.newTaskDialog.isOpen}></TaskAddDialog>
                <TaskDeleteDialog isOpen={this.state.deleteDialog.isOpen} task={this.state.deleteDialog.task} deleteDialogCallback={this.deleteDialogCallback} />
                <ListGroup>
                    <ListGroupItem className="d-flex justify-content-end">
                        <Button color="info" onClick={this.openAddTaskDialog} style={{ minWidth: 100 }}><FontAwesomeIcon icon={faPlusSquare}/></Button>
                    </ListGroupItem>
                    <ListGroupItem color="danger">In progress:</ListGroupItem>
                    {todoTasks}
                    <ListGroupItem color="success">Done:</ListGroupItem>
                    {doneTasks}
                </ListGroup>
            </div>


        );
    }
}