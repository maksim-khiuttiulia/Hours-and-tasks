import React, { Component } from 'react'
import Task from './task'
import TaskAddForm from './task-add'
import TaskDeleteDialog from './task-delete-dialog'
import { ListGroup, ListGroupItem, Spinner } from 'reactstrap';
import API from '../utils/API'


export default class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading : false,
            labels: [],
            tasks: [],
            deleteDialog : {
                task : null,
                isOpen : false
            }
            
        }
    }

    async componentDidMount() {
        this.readTasks();
        this.readLabels();
    }

    async readLabels() {
        try {
            let response = await API.get("/task-labels");
            let labels = response.data;
            this.setState(prevState => ({
                ...prevState,
                labels: labels,
            }))
        } catch (e) {
            console.error(e)
        }
    }

    async readTasks() {
        try {
            this.setState(prevState => ({
                ...prevState,
                loading : true
            }))

            let response = await API.get("/tasks")
            let tasks = response.data;

            this.setState(prevState => ({
                ...prevState,
                tasks: tasks,
                loading : false
            }))
        } catch (e) {
            console.error(e)
        }
    }

    openDeleteDialog = (task) => {
        this.setState(prevState => ({
            ...prevState,
            deleteDialog : {
                isOpen : true,
                task : task
            }
        }))

    }

    deleteDialogCallback = (task, isDeleted) => {
        this.setState(prevState => ({
            ...prevState,
            deleteDialog : {
                isOpen : false
            }
        }))

        if (isDeleted && task) {
            this.onDeleteTask(task);
        }
    }



    onAddTask = (task) => {
        API.post(`/tasks`, task).then(res => {
            this.readTasks();
        })
    }

    onDeleteTask = (task) => {
        API.delete(`/tasks/${task.id}`).then(res => {
            this.readTasks();
        })
    }

    onChangeTaskStatus = (task) => {
        API.put(`/tasks/${task.id}/done`, task).then(res => {
            this.readTasks();
        })
    }




    render() {

        let todoTasks = <ListGroupItem color="danger"><Spinner animation="border" /></ListGroupItem>
        let doneTasks = <ListGroupItem color="success"><Spinner animation="border" /></ListGroupItem>
        if (!this.state.loading){
            todoTasks = this.state.tasks.filter((task) => !task.done).map((task) => {
                return <Task task={task} key={task.id} onChangeTaskStatus={this.onChangeTaskStatus} onDeleteTask={this.openDeleteDialog} />;
            });
            doneTasks = this.state.tasks.filter((task) => task.done).map((task) => {
                return <Task task={task} key={task.id} onChangeTaskStatus={this.onChangeTaskStatus} onDeleteTask={this.openDeleteDialog} />;
            });
        }

        return (
            <ListGroup>
                <TaskDeleteDialog isOpen={this.state.deleteDialog.isOpen} task={this.state.deleteDialog.task} deleteDialogCallback={this.deleteDialogCallback}/>
                <TaskAddForm onAddTask={this.onAddTask} labelsToChoose={this.state.labels} />
                <ListGroupItem color="danger">In progress:</ListGroupItem>
                {todoTasks}
                <ListGroupItem color="success">Done:</ListGroupItem>
                {doneTasks}
            </ListGroup>

        );
    }
}