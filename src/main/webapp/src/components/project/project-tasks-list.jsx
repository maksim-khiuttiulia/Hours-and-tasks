import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Col, Card, CardHeader, CardBody, Row, ListGroup, ListGroupItem, Badge, Button } from 'reactstrap';
import TaskList from '../tasks/task-list'

class ProjectTasksList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            projectId: props.match.params.id,

            doneTasks : [],
            todoTasks : []

        }
    }

    async componentDidMount() {
        this.readProject()
    }

    render() {
        const { projectId,  doneTasks, todoTasks} = this.state
        
        console.log(projectId)
        return (
                    <Row>
                        <Col xs="6">
                            <h6>Done tasks: </h6>
                            <TaskList tasks={doneTasks}/>
                        </Col>

                        <Col xs="6">
                            <h6>In progress: </h6>
                            <TaskList tasks={todoTasks}/>
                        </Col>
                    </Row>
        )
    }
}

export default withRouter(ProjectTasksList)