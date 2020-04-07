import React, { Component } from 'react'
import Task from './task'
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [
                {
                    id: 1, name: "task1", priority: "HIGH", isDone: false, labels: [
                        { id: 1, name: "do later", color: "pink" },
                        { id: 2, name: "dont do it", color: "red" }]
                },

                {
                    id: 2, name: "task2", priority: "MIDDLE", isDone: true, labels: [
                        { id: 1, name: "do later", color: "blue" },
                        { id: 2, name: "dont do it", color: "red" }]
                },

                {
                    id: 3, name: "task3", priority: "LOW", isDone: false, labels: [
                        { id: 1, name: "do later", color: "red" },
                        { id: 2, name: "dont do it", color: "tomato" }]
                },

                {
                    id: 4, name: "task4", priority: "HIGH", isDone: true, labels: [
                        { id: 1, name: "do later", color: "red" },
                        { id: 2, name: "dont do it", color: "red" }]
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


    render() {
        const doneTasks = this.state.tasks.filter((task) => task.isDone).map((task) => {
            return <Task task={task} key={task.id} onChangeStatus={this.onChangeStatus} onDelete={this.onDelete}/>;
        });
        const todoTasks = this.state.tasks.filter((task) => !task.isDone).map((task) => {
            return <Task task={task} key={task.id} onChangeStatus={this.onChangeStatus} onDelete={this.onDelete}/>;
        });
        return (
            <ListGroup>
                <ListGroupItem color="danger">In progress:</ListGroupItem>
                {todoTasks}
                <ListGroupItem color="success">Done:</ListGroupItem>
                {doneTasks}
            </ListGroup>
        );
    }
}