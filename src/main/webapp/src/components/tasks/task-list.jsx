import React, { Component } from 'react'
import Task from './task'
import TaskDeleteDialog from '../forms/task-delete-dialog'
import TaskAddDialog from '../forms/task-add-dialog'
import { ListGroup, ListGroupItem, Spinner, Button } from 'reactstrap';
import { getAllTasks, changeTaskStatus } from '../../services/task-service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from 'react-router-dom'
import { getTasksInProject, getDoneTasksInProject, getNotDoneTasksInProject } from '../../services/project-service'
import ServerError from '../error/server-error'


class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projectId: this.props.projectId | 1,
            showDone: this.props.showDone | false,
            showNotDone: this.props.showNotDone | false,


            loading: false,
            labels: [],
            tasks: [],
            deleteDialog: {
                task: null,
                isOpen: false
            },
            newTaskDialog: {
                isOpen: false
            },

            serverError : ''

        }
    }

    componentDidMount() {
        this.readTasks();
    }


    readTasks() {
        this.setState({
            loading: true
        })

        const { projectId } = this.state
        if (projectId) {
            const { showDone, showNotDone } = this.state
            if (Boolean(showDone) && Boolean(showNotDone)) {
                getTasksInProject(projectId).then((response) => {
                    this.setState({
                        tasks: response.content,
                        loading: false
                    })
                }).catch(e => {
                    this.setState({
                        serverError : e
                    })
                })
            } else if (Boolean(showDone)) {
                getDoneTasksInProject(projectId).then((response) => {
                    this.setState({
                        tasks: response.content,
                        loading: false
                    })
                }).catch(e => {
                    this.setState({
                        serverError : e
                    })
                })
            } else if (Boolean(showNotDone)) {
                getNotDoneTasksInProject(projectId).then((response) => {
                    this.setState({
                        tasks: response.content,
                        loading: false
                    })
                }).catch(e => {
                    this.setState({
                        serverError : e
                    })
                })
            } else {
                console.log("asd")
                this.setState({
                    tasks: [],
                    loading: false
                })
            }
        } else {
            getAllTasks().then((tasks) => {
                this.setState({
                    tasks: tasks,
                    loading: false
                })
            })
        }
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

    renderTasks = () => {
        let tasks = <ListGroupItem color="success"><Spinner animation="border" /></ListGroupItem>

        const { showDone, showNotDone } = this.state
        if (!this.state.loading) {
            if (Boolean(showDone) && Boolean(showNotDone)) {
                

                tasks = this.state.tasks.map((task) => {
                    return <Task task={task} key={task.id} onChangeTaskStatus={this.onChangeTaskStatus} onDeleteTask={this.openDeleteDialog} />;
                });

            } else if (Boolean(showDone)) {
                tasks = this.state.tasks.filter((task) => task.done).map((task) => {
                    return <Task task={task} key={task.id} onChangeTaskStatus={this.onChangeTaskStatus} onDeleteTask={this.openDeleteDialog} />;
                });
            } else if (Boolean(showNotDone)) {
                tasks = this.state.tasks.filter((task) => !task.done).map((task) => {
                    return <Task task={task} key={task.id} onChangeTaskStatus={this.onChangeTaskStatus} onDeleteTask={this.openDeleteDialog} />;
                });
            } else {
                tasks = []
            }
        }
        return (
            <ListGroup>
                {tasks}
            </ListGroup>
        )
    }




    render() {
        return (
            <div>
                <TaskAddDialog projectId={1} isOpen={this.state.newTaskDialog.isOpen} callback={this.addTaskDialogCallback}></TaskAddDialog>
                <TaskDeleteDialog isOpen={this.state.deleteDialog.isOpen} task={this.state.deleteDialog.task} callback={this.deleteDialogCallback} />
                <ServerError error={this.state.serverError}/>
                <ListGroup>
                    <ListGroupItem className="d-flex justify-content-end">
                        <Button color="info" onClick={this.openAddTaskDialog} style={{ minWidth: 100 }}><FontAwesomeIcon icon={faPlusSquare} /></Button>
                    </ListGroupItem>
                </ListGroup>
                {this.renderTasks()}
            </div>
        );
    }
}

export default withRouter(TaskList)