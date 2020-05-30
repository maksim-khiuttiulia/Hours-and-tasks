import React, { Component } from 'react'
import TaskDeleteDialog from '../forms/task-delete-dialog'
import TaskList from '../tasks/task-list'
import { ListGroup, ListGroupItem } from 'reactstrap';
import { changeTaskStatus } from '../../services/task-service'
import { withRouter } from 'react-router-dom'
import { getTasksInProject } from '../../services/project-service'
import ServerError from '../error/server-error'
import SortBy from '../sort-by/sort-by';
import PaginationComponent from '../pagination/pagination-component'
import {getTasks} from '../../services/task-service'


class TasksPage extends Component {

    sortByParams = [
        { key: "name", value: "By name" },
        { key: "isDone", value: "By done" },
        { key: "deadline", value: "By deadline" },
    ]

    constructor(props) {
        super(props);
        this.state = {
            projectId: this.props.projectId,
            done: this.props.done == null ? null : Boolean(this.props.done),
            sortBy: null,
            orderBy: null,

            loading: true,
            labels: [],
            tasks: [],
            deleteDialog: {
                task: null,
                isOpen: false
            },

            serverError: '',

            activePage: 1,
            totalPages: null,
            itemsCountPerPage:  5,
            totalItemsCount: null,
        }
    }

    async componentDidMount() {
        const {activePage} = this.state
        this.readTasks(activePage);
    }

    componentDidUpdate(prevProps){
        const prevUpdateCounter = prevProps.updateCounter
        const currentUpdateCounter = this.props.updateCounter

        if (currentUpdateCounter > prevUpdateCounter) {
            const {activePage, sortBy, orderBy} = this.state
            this.readTasks(activePage, sortBy, orderBy);
        }
    }

    readTasks(pageNumber, sortBy, orderBy) {

        const { projectId, itemsCountPerPage, done, totalPages } = this.state
        let page = (pageNumber > 0 && pageNumber != null) ? pageNumber - 1 : 0
        page = (totalPages !== null && page + 1 > totalPages) ? totalPages : page

        if (projectId) {
            getTasksInProject(projectId, page, itemsCountPerPage, done, sortBy, orderBy).then((response) => {
                this.setStateAfterLoadTasks(response)
            }).catch(e => {
                this.setState({ serverError: e })
            })
        } else {
            getTasks(page, itemsCountPerPage, done, sortBy, orderBy).then((response) => {
                this.setStateAfterLoadTasks(response)
            }).catch(e => {
                this.setState({ serverError: e })
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

    deleteDialogCallback = (task, deleted) => {
        const { activePage, sortBy, orderBy } = this.state
        if (deleted === true) {
            
            this.readTasks(activePage, sortBy, orderBy)
            this.parentRefresh(activePage, sortBy, orderBy)
        }
        this.setState({
            deleteDialog: {
                isOpen: false
            }
        })

    }


    onChangeTaskStatus = (task) => {
        changeTaskStatus(task).then((data) => {
            const tasks = this.state.tasks.map(t => {
                if (task.id === t.id) {
                     t.done = task.done;
                }
                return t;
            })
            
            this.parentRefresh()
            this.setState({tasks : tasks})
        }).catch(e => {
            this.setState({serverError : e})
        })
        
    }

    onSelectPage = (page) => {
        const {activePage, sortBy, orderBy} = this.state
        if (activePage !== page){
            this.setState({
                activePage: page
            })
            this.readTasks(page, sortBy, orderBy);
        }
    }

    onSelectSortBy = (key, orderBy) => {
        this.setState({
            sortBy: key,
            orderBy: orderBy
        })
        this.readTasks(this.state.activePage, key, orderBy);
    }

    parentRefresh = () => {
        if (typeof this.props.callback === "function"){
            this.props.callback()
        }
    }

    render() {
        const { itemsCountPerPage, totalItemsCount, activePage } = this.state;
        return (
            <div>
                <TaskDeleteDialog isOpen={this.state.deleteDialog.isOpen} task={this.state.deleteDialog.task} callback={this.deleteDialogCallback} />
                <ServerError error={this.state.serverError} />
                <ListGroup>
                    <ListGroupItem className="d-flex justify-content-start">
                        <SortBy params={this.sortByParams} selected={this.state.sortBy} orderBy={this.state.orderBy} onSelect={this.onSelectSortBy} ></SortBy>
                    </ListGroupItem>

                    <TaskList tasks={this.state.tasks} onDeleteTask={this.openDeleteDialog} onChangeStatus={this.onChangeTaskStatus} />

                    <ListGroupItem className="d-flex justify-content-center">
                        <PaginationComponent currentPage={activePage} countPerPage={itemsCountPerPage} totalCount={totalItemsCount} onSelected={this.onSelectPage} />
                    </ListGroupItem>
                </ListGroup>
            </div>
        );
    }
}

export default withRouter(TasksPage)