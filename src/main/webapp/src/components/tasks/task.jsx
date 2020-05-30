import React, { Component } from 'react'
import TaskLabel from './task-label'
import TaskDeadLineLabel from './task-deadline'
import { Button, ButtonGroup, Col, ListGroupItem, Row, Badge } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import TaskFull from './task-full';

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: this.props.task,

            taskFullOpen: false
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({
                task: this.props.task
            })
        }
    }

    onDelete = () => {
        this.setState({taskFullOpen : false})
        let { task } = this.state
        if (typeof this.props.onDeleteTask === "function") {
            this.props.onDeleteTask(task)
        }
    }

    onDone = (e) => {
        e.preventDefault();
        let task = {
            ...this.state.task,
            done: true
        }
        if (typeof this.props.onChangeTaskStatus === "function") {
            this.props.onChangeTaskStatus(task)
        }
    }

    onNotDone = (e) => {
        e.preventDefault();
        let task = {
            ...this.state.task,
            done: false
        }
        if (typeof this.props.onChangeTaskStatus === "function") {
            this.props.onChangeTaskStatus(task)
        }
    }

    onEditTask = () => {
        this.setState({taskFullOpen : false})
        let { task } = this.state
        if (typeof this.props.onEditTask === "function") {
            this.props.onEditTask(task)
        }
    }

    onOpenTaskView = (e) => {
        this.setState({ taskFullOpen: true })
    }

    onCloseTaskView = (e) => {
        this.setState({ taskFullOpen: false })
    }

    render() {
        const { id, name, deadline, labels, done, project } = this.state.task


        const deadlineLabel = <TaskDeadLineLabel deadline={deadline} />
        const labelsElement = labels.map((label) => {
            return <TaskLabel label={label} key={label.id} />;
        })
        let buttonState;
        if (this.state.task.done) {
            buttonState = <Button color="info" onClick={this.onNotDone} style={{ minWidth: 100 }}><FontAwesomeIcon icon={faTimesCircle} /></Button>
        } else {
            buttonState = <Button color="success" onClick={this.onDone} style={{ minWidth: 100 }}><FontAwesomeIcon icon={faCheck} /></Button>
        }

        return (
            <div>
                <TaskFull isOpen={this.state.taskFullOpen} task={this.state.task} onClose={this.onCloseTaskView} onDelete={this.onDelete} onEdit={this.onEditTask}/>
                <ListGroupItem color={done ? "success" : "danger"} key={id}>
                    <Row>
                        <Col xs="10">
                            <Row xs="12" className="ml-1">
                                <h4 style={{ cursor: "pointer" }} onClick={this.onOpenTaskView}>{name}</h4>
                            </Row>
                            <Row className="ml-1 d-flex align-items-end">
                                <Badge color="info">{project.name}</Badge>
                            </Row>
                            <Row className="ml-1 mt-2 d-flex align-items-end">
                                {deadlineLabel}
                                {labelsElement}
                            </Row>

                        </Col>
                        <Col xs="2" className="d-flex justify-content-end">
                            <ButtonGroup className="pt-4">
                                {buttonState}
                            </ButtonGroup>
                        </Col>
                    </Row>
                </ListGroupItem>
            </div>


        );
    }
}
