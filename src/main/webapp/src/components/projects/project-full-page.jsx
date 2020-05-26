import React, { Component } from 'react';
import { Redirect, withRouter } from "react-router-dom";
import { Col, Card, CardHeader, CardBody, Row, ListGroup, ListGroupItem, Badge, Button } from 'reactstrap';
import TaskDeadLineLabel from '../tasks/task-deadline'


export default class ProjectFullPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            projectId: this.props.projectId,

            tasksCount: 0,
            todoTasksCount : 0,
            doneTasksCount : 0
        }
    }


    render() {
        const { name, description, tasksCount, todoTasksCount, doneTasksCount }

        return (
            <Card>
                <CardHeader className="bg-danger text-white">
                    <h3 className="pb-5" style={{ fontWeight: 300 }}>{name}</h3>
                    <p>{description}</p>
                </CardHeader>

                <CardBody>
                    <Row>
                        <Col xs="3">
                            <ListGroup flush>
                                <ListGroupItem>
                                    <Button color="success" className="w-100">Add task</Button>
                                </ListGroupItem>
                                <ListGroupItem>
                                    Total tasks: <Badge color="light">{tasksCount}</Badge>
                                </ListGroupItem>
                                <ListGroupItem>
                                    Done tasks: <Badge color="light">{doneTasksCount}</Badge>
                                </ListGroupItem>
                                <ListGroupItem>
                                    In progress tasks: <Badge color="light">{todoTasksCount}</Badge>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Button color="success" className="w-100">Edit project</Button>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Button color="success" className="w-100">Delete project</Button>
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                        <Col className="offset-1" xs="3">
                            <h6>Done tasks: </h6>

                        </Col>
                        
                        <Col className="offset-1" xs="3">
                            <h6>In progress: </h6>

                        </Col>
                    </Row>
                </CardBody>
            </Card>
        )
    }
}