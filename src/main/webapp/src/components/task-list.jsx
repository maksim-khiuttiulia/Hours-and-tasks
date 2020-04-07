import React, { Component } from 'react'
import Task from './task'
import TaskAddForm from './task-add'
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lastID : 5,
            tasks: [
                {
                    id: 1, name: "Todo", priority: "HIGH", isDone: false, labels: [
                        { id: 1, name: "do later", color: "tomato" },
                        { id: 2, name: "dont do it", color: "red" }]
                },

                {
                    id: 2, name: "Todotodo", priority: "MIDDLE", isDone: false, labels: [
                        { id: 1, name: "do later", color: "blue" },
                        { id: 2, name: "dont do it", color: "red" }]
                },

                {
                    id: 3, name: "Tododododo", priority: "LOW", isDone: false, labels: [
                        { id: 1, name: "do later", color: "red" },
                        { id: 2, name: "dont do it", color: "tomato" }]
                },

                {
                    id: 4, name: "Go sleep", priority: "HIGH", isDone: true, labels: [
                        { id: 1, name: "do later", color: "red" },
                        { id: 2, name: "dont do it", color: "red" },
                        { id: 3, name: "unpossible todo", color: "red" },
                        { id: 4, name: "dont do it", color: "red" }]
                }
            ]
        }
    }

    onChangeStatus = (id) => {
        this.setState(prevState => ({

            tasks : prevState.tasks.map(
                task => task.id === parseInt(id, 10) ? {...task, isDone : !task.isDone} : task)
        }))
    }

    onDelete = (id) => {
        this.setState(prevState => ({

            tasks : prevState.tasks.filter((task) => task.id !== parseInt(id))
        }))
    }

    onSaveNewTask = ({name}) =>{
        console.log(name);
        const newTask = {
            id : this.state.lastID,
            name : name,
            priority: "MIDDLE",
            isDone : false,
            labels : []
        }
        this.setState(prevState => ({
            tasks : [...prevState.tasks, newTask],
            lastID : prevState.lastID++
        }))
    }


    render() {
        console.log(this.state)
        const doneTasks = this.state.tasks.filter((task) => task.isDone).map((task) => {
            return <Task task={task} key={task.id} onChangeStatus={this.onChangeStatus} onDelete={this.onDelete}/>;
        });
        const todoTasks = this.state.tasks.filter((task) => !task.isDone).map((task) => {
            return <Task task={task} key={task.id} onChangeStatus={this.onChangeStatus} onDelete={this.onDelete}/>;
        });
        return (
            <ListGroup>
                <TaskAddForm onSaveNewTask={this.onSaveNewTask}/>
                <ListGroupItem color="danger">In progress:</ListGroupItem>
                {todoTasks}
                <ListGroupItem color="success">Done:</ListGroupItem>
                {doneTasks}
                
            </ListGroup>
        );
    }
}