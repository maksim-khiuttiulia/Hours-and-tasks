import React, {Component} from 'react'
import TaskLabel from './task-label'
import TaskDeadLineLabel from './task-deadline'
import {Button, ButtonGroup, Col, ListGroupItem, Row} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheck, faTrash, faTimesCircle  } from '@fortawesome/free-solid-svg-icons'

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task : this.props.task
        }
    }

    onDelete = (e) => {
       e.preventDefault();
        let task = {
            ...this.state.task,
        }
        this.props.onDeleteTask(task)
    }

    onDone = (e) => {
        e.preventDefault();
        let task = {
            ...this.state.task,
            done : true
        }
        this.props.onChangeTaskStatus(task)
    }

    onNotDone = (e) => {
        e.preventDefault();
        let task = {
            ...this.state.task,
            done : false
        }
        this.props.onChangeTaskStatus(task)
    }

    render() {
        const deadlineLabel = <TaskDeadLineLabel deadline={this.state.task.deadline}/>
        const labelsElement = this.state.task.labels.map((label) => {
            return <TaskLabel label={label} key={label.id} />;
        })

        let buttonState;
        if (this.state.task.done) {
            buttonState = <Button color="info" onClick={this.onNotDone} style={{ minWidth: 100 }}><FontAwesomeIcon icon={faTimesCircle}/></Button>
        } else {
            buttonState = <Button color="success" onClick={this.onDone} style={{ minWidth: 100 }}><FontAwesomeIcon icon={faCheck}/></Button>
        }
        let buttonDelete = <Button color="danger" onClick={this.onDelete}  style={{ minWidth: 100 }}><FontAwesomeIcon icon={faTrash}/></Button>

        return (
            <ListGroupItem color={this.state.task.done ? "success" : "danger"} className="justify-content-between" key={this.state.task.id}>

                <Row className="d-flex align-items-center">
                    <Col xs="6" md="6">
                        <Row>
                            <Col xs="12">
                                <h4>{this.state.task.name}</h4>
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