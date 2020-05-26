import React, { Component } from 'react'
import Task from './task'
import TaskDeleteDialog from '../forms/task-delete-dialog'
import TaskAddDialog from '../forms/task-add-dialog'
import { ListGroup, ListGroupItem, Spinner, Button } from 'reactstrap';
import { getAllTasks, changeTaskStatus } from '../../services/task-service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from 'react-router-dom'
import { getTasksInProject } from '../../services/project-service'
import ServerError from '../error/server-error'
import SortBy from '../sort-by/sort-by';
import PaginationComponent from '../pagination/pagination-component'


class TaskList extends Component {

    sortByParams = [
        {key : "name" , value : "By name"},
        {key : "created" , value : "By created"},
        {key : "deadline" , value : "By deadline"},
    ]

    constructor(props) {
        super(props);
        this.state = {
            projectId: this.props.projectId | 1,
            done: this.props.done == null ? null : Boolean(this.props.done),
            sortBy : null,
            orderBy : null,

            loading: true,
            labels: [],
            tasks: [],
            deleteDialog: {
                task: null,
                isOpen: false
            },
            newTaskDialog: {
                isOpen: false
            },

            serverError: '',

            activePage: 1,
            totalPages: null,
            itemsCountPerPage: this.props.itemsCountPerPage | 5,
            totalItemsCount: null
        }
    }

    componentDidMount() {
        this.readTasks();
    }


    readTasks(pageNumber, sortBy, orderBy) {
        this.setState({
            loading: true
        })

        const { projectId, itemsCountPerPage, done, totalPages} = this.state
        let page = (pageNumber > 0 && pageNumber !== null) ? pageNumber - 1 : 0
        page = page + 1 > totalPages ? totalPages : page

        if (projectId) {
            getTasksInProject(projectId, page, itemsCountPerPage, done, sortBy, orderBy).then((response) => {
                this.setStateAfterLoadTasks(response)
            }).catch(e => {
                this.setState({ serverError: e, loading: false })
            })
        } else {
            getAllTasks().then((tasks) => {
                this.setState({
                    tasks: tasks,
                    loading: false
                })
            }).catch(e => {
                this.setState({ serverError: e, loading: false })
            })
        }
    }

    setStateAfterLoadTasks = (response) => {
        const totalPages = response.totalPages;
        const itemsCountPerPage = response.size;
        const totalItemsCount = response.totalElements;
        const tasks = Array.isArray(response.content) ? response.content : []

        this.setState({
            totalPages: totalPages,
            totalItemsCount: totalItemsCount,
            itemsCountPerPage: itemsCountPerPage,
            tasks: tasks,
            loading: false
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

    onSelectPage = (page) => {
        this.setState({
            activePage: page
        })
        this.readTasks(page);
    }

    onSelectSortBy = (key, orderBy) => {
        this.setState({
            sortBy : key,
            orderBy : orderBy
        })
        this.readTasks(this.state.activePage, key, orderBy);
    }

    renderTasks = () => {
        let tasks = <ListGroupItem color="success"><Spinner animation="border" /></ListGroupItem>

        if (!this.state.loading) {
            tasks = this.state.tasks.map((task) => {
                return <Task task={task} key={task.id} onChangeTaskStatus={this.onChangeTaskStatus} onDeleteTask={this.openDeleteDialog} />;
            });
        }
        return (
            <ListGroup>
                {tasks}
            </ListGroup>
        )
    }

    renderPagination = () => {
        const { itemsCountPerPage, totalItemsCount, activePage } = this.state;
        return (
            <ListGroupItem className="d-flex justify-content-center">
                <PaginationComponent currentPage={activePage} countPerPage={itemsCountPerPage} totalCount={totalItemsCount} onSelected={this.onSelectPage} />
            </ListGroupItem>)
    }



    render() {
        return (
            <div>
                <TaskAddDialog projectId={1} isOpen={this.state.newTaskDialog.isOpen} callback={this.addTaskDialogCallback}></TaskAddDialog>
                <TaskDeleteDialog isOpen={this.state.deleteDialog.isOpen} task={this.state.deleteDialog.task} callback={this.deleteDialogCallback} />
                <ServerError error={this.state.serverError} />
                <ListGroup>
                    <ListGroupItem className="d-flex justify-content-end">
                        <SortBy params={this.sortByParams} selected={this.state.sortBy} orderBy={this.state.orderBy} onSelect={this.onSelectSortBy} ></SortBy>
                        <Button color="info" onClick={this.openAddTaskDialog} style={{ minWidth: 100 }}><FontAwesomeIcon icon={faPlusSquare} /></Button>
                    </ListGroupItem>
                </ListGroup>

                {this.renderTasks()}

                <ListGroup>
                    {this.renderPagination()}
                </ListGroup>
            </div>
        );
    }
}

export default withRouter(TaskList)