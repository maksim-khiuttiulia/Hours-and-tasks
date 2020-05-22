import React, { Component } from 'react'
import Task from './task'
import TaskDeleteDialog from '../forms/task-delete-dialog'
import TaskAddDialog from '../forms/task-add-dialog'
import { ListGroup, ListGroupItem, Spinner, Button } from 'reactstrap';
import { getAllTasks, changeTaskStatus } from '../../services/task-service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from 'react-router-dom'


class TaskList extends Component {

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
        this.setState({
            loading: true
        })

        getAllTasks().then((tasks) => {
            this.setState({
                tasks: tasks,
                loading: false
            })
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

    addTaskDialogCallback = (task, added) => {
        const { tasks } = this.state
        if (added === true) {
            this.setState({
                newTaskDialog: {
                    isOpen: false,
                },
                tasks: [...tasks, task]
            })
        } else {
            this.setState({
                newTaskDialog: {
                    isOpen: false,
                }
            })
        }

    }

    deleteDialogCallback = (task, deleted) => {
        const { tasks } = this.state
        if (deleted === true) {
            this.setState({
                deleteDialog: {
                    isOpen: false
                },
                tasks: tasks.filter(t => t.id !== task.id)
            })
        } else {
            this.setState({
                deleteDialog: {
                    isOpen: false
                }
            })
        }

    }


    onChangeTaskStatus = (task) => {
        changeTaskStatus(task).then((data) => {
            this.setState(prevState => {
                return prevState.tasks.map(t => {
                    if (task.id === t.id) {
                        return t.done = task.done;
                    }
                    return t;
                })
            })
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
                <TaskAddDialog projectId={1} isOpen={this.state.newTaskDialog.isOpen} callback={this.addTaskDialogCallback}></TaskAddDialog>
                <TaskDeleteDialog isOpen={this.state.deleteDialog.isOpen} task={this.state.deleteDialog.task} callback={this.deleteDialogCallback} />
                <ListGroup>
                    <ListGroupItem className="d-flex justify-content-end">
                        <Button color="info" onClick={this.openAddTaskDialog} style={{ minWidth: 100 }}><FontAwesomeIcon icon={faPlusSquare} /></Button>
                    </ListGroupItem>
                    <ListGroupItem color="danger">In progress:</ListGroupItem>
                    {todoTasks}

                </ListGroup>
                <ListGroup className="mt-3">
                    <ListGroupItem color="success" >Done:</ListGroupItem>
                    {doneTasks}
                </ListGroup>
            </div>


        );
    }
}

export default withRouter(TaskList)