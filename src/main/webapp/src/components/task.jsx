import React, { Component } from 'react'
import TaskLabel from './task-label'
import { ListGroupItem, ButtonGroup, Button, Row, Col} from 'reactstrap';

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.task.id,
            name: this.props.task.name,
            priority: this.props.task.priority,
            labels: this.props.task.labels,
            isDone: this.props.task.isDone
        }
    }

    onDelete = (e) => {
        this.props.onDelete(e.target.value)
    }

    onDone = (e) => {
        this.props.onChangeStatus(e.target.value)
    }

    onNotDone = (e) => {
        this.props.onChangeStatus(e.target.value)
    }

    render() {
        const labelsElement = this.state.labels.map((label) => {
            return <TaskLabel label={label} key={label.id} />;
        })

        let buttonState;
        if (this.state.isDone) {
            buttonState = <Button color="info" onClick={this.onNotDone} value={this.state.id}  style={{minWidth : 100}}>Not done</Button>
        } else {
            buttonState = <Button color="success" onClick={this.onDone} value={this.state.id}  style={{minWidth : 100}}>Done</Button>
        }
        let buttonDelete = <Button color="danger" onClick={this.onDelete} value={this.state.id}  style={{minWidth : 100}}>Delete</Button>

        return (
            <ListGroupItem color={this.state.isDone ? "success" : "danger"} className="justify-content-between" key={this.state.id}>

                <Row className="d-flex align-items-center">
                    <Col xs="6" md="6">
                        <Row>
                            <Col xs="12">
                                <h4>{this.state.name}</h4>
                            </Col>
                            <Col xs="12">
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