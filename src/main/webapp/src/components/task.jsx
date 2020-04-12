import React, { Component } from 'react'
import TaskLabel from './task-label'
import TaskDeadLineLabel from './task-deadline'
import { ListGroupItem, ButtonGroup, Button, Row, Col } from 'reactstrap';

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.task.id,
            name: this.props.task.name,
            done: this.props.task.done,
            text: this.props.task.text,
            created: this.props.task.created,
            deadline: this.props.task.deadline,
            projectId: this.props.task.projectId,
            labels: this.props.task.labels,
        }
    }

    onDelete = (e) => {
        e.preventDefault();
        let task = {
            ...this.state,
        }
        this.props.onDeleteTask(task)
    }

    onDone = (e) => {
        e.preventDefault();
        let task = {
            ...this.state,
            done : true
        }
        this.props.onChangeTaskStatus(task)
    }

    onNotDone = (e) => {
        e.preventDefault();
        let task = {
            ...this.state,
            done : false
        }
        this.props.onChangeTaskStatus(task)
    }

    render() {
        const deadlineLabel = <TaskDeadLineLabel deadline={this.state.deadline}/>
        const labelsElement = this.state.labels.map((label) => {
            return <TaskLabel label={label} key={label.id} />;
        })

        let buttonState;
        if (this.state.done) {
            buttonState = <Button color="info" onClick={this.onNotDone} style={{ minWidth: 100 }}>Not done</Button>
        } else {
            buttonState = <Button color="success" onClick={this.onDone} style={{ minWidth: 100 }}>Done</Button>
        }
        let buttonDelete = <Button color="danger" onClick={this.onDelete}  style={{ minWidth: 100 }}>Delete</Button>

        return (
            <ListGroupItem color={this.state.done ? "success" : "danger"} className="justify-content-between" key={this.state.id}>

                <Row className="d-flex align-items-center">
                    <Col xs="6" md="6">
                        <Row>
                            <Col xs="12">
                                <h4>{this.state.name}</h4>
                            </Col>
                            <Col xs="12">
                                {deadlineLabel}
                                {labelsElement}
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="6" md="6" className="d-flex justify-content-end">
                        <ButtonGroup>
                            {buttonState}
                            {buttonDelete}
                        </ButtonGroup>
                    </Col>
                </Row>


            </ListGroupItem>
        );
    }
}