import React, { Component } from 'react'
import Task from './task'
import TaskAddForm from './task-add'
import { ListGroup, ListGroupItem } from 'reactstrap';
import API from '../utils/API'


export default class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            labels : [],
            tasks: []
        }
    }

    async componentDidMount() {
        this.readLabels();
        this.readTasks();
    }

    async readLabels(){
        try {
            let response = await API.get("/task-labels");
            let labels = response.data;
            this.setState(prevState => ({
                ...prevState, 
                labels : labels
            }))
        } catch (e) {
            console.error(e)
        }
    }

    async readTasks(){
        try {
            let response = await API.get("/tasks")
            let tasks = response.data;
            this.setState(prevState => ({
                ...prevState, 
                tasks : tasks
            }))
        } catch (e) {
            console.error(e)
        }
    }


    onChangeTaskStatus = (task) => {
        API.put(`/tasks/${task.id}/done`, task).then(res => {
            this.readTasks();
        })
        
    }

    onDeleteTask = (task) => {
        API.delete(`/tasks/${task.id}`).then(res => {
            this.readTasks();
        })
    }

    onAddTask = (task) =>{
        API.post(`/tasks`, task).then(res => {
            this.readTasks();
        })
    }


    render() {
        const doneTasks = this.state.tasks.filter((task) => task.done).map((task) => {
            return <Task task={task} key={task.id} onChangeTaskStatus={this.onChangeTaskStatus} onDeleteTask={this.onDeleteTask}/>;
        });
        const todoTasks = this.state.tasks.filter((task) => !task.done).map((task) => {
            return <Task task={task} key={task.id} onChangeTaskStatus={this.onChangeTaskStatus} onDeleteTask={this.onDeleteTask}/>;
        });

        return (
            <ListGroup>
                <TaskAddForm onAddTask={this.onAddTask} labelsToChoose={this.state.labels}/>
                <ListGroupItem color="danger">In progress:</ListGroupItem>
                {todoTasks}
                <ListGroupItem color="success">Done:</ListGroupItem>
                {doneTasks}
                
            </ListGroup>
        );
    }
}