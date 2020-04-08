import React, { Component } from 'react'
import Task from './task'
import TaskAddForm from './task-add'
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class TaskList extends Component {

    lastID = 5;
    labels = [
        { id: 1, name: "do later", color: "red" },
        { id: 2, name: "dont do it", color: "red" },
        { id: 3, name: "unpossible todo", color: "red" },
        { id: 4, name: "dont do it", color: "red" }
    ]

    constructor(props) {
        super(props);
        this.state = {
            

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

    onSaveNewTask = ({name, labels}) =>{
        const newTask = {
            id : this.lastID++,
            name : name,
            priority: "MIDDLE",
            isDone : false,
            labels : labels
        }
        this.setState(prevState => ({
            tasks : [...prevState.tasks, newTask],
        }))
    }


    render() {
        const doneTasks = this.state.tasks.filter((task) => task.isDone).map((task) => {
            return <Task task={task} key={task.id} onChangeStatus={this.onChangeStatus} onDelete={this.onDelete}/>;
        });
        const todoTasks = this.state.tasks.filter((task) => !task.isDone).map((task) => {
            return <Task task={task} key={task.id} onChangeStatus={this.onChangeStatus} onDelete={this.onDelete}/>;
        });
        return (
            <ListGroup>
                <TaskAddForm onSaveNewTask={this.onSaveNewTask} labels={this.labels}/>
                <ListGroupItem color="danger">In progress:</ListGroupItem>
                {todoTasks}
                <ListGroupItem color="success">Done:</ListGroupItem>
                {doneTasks}
                
            </ListGroup>
        );
    }
}