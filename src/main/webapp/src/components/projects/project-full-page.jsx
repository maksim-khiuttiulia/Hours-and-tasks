import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Col, Card, CardHeader, CardBody, Row, ListGroup, ListGroupItem, Badge, Button } from 'reactstrap';
import TaksPage from '../tasks/tasks-page'
import { getProject } from '../../services/project-service';

class ProjectFullPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            projectId: props.match.params.id,
            project: null,

            tasksCount: 0,
            todoTasksCount: 0,
            doneTasksCount: 0,

            serverError: '',
            clientError: '',
            loading: true
        }
    }

    async componentDidMount() {
        this.readProject()
    }

    readProject() {
        this.setState({ loading: true })
        const { projectId } = this.state
        getProject(projectId).then(data => {
            const { name, description, tasksCount, todoTasksCount, doneTasksCount } = data;
            this.setState({
                name: name,
                description: description,
                tasksCount: tasksCount,
                todoTasksCount: todoTasksCount,
                doneTasksCount: doneTasksCount,
                loading: false
            })
        })
    }


    render() {
        const { projectId, name, description, tasksCount, todoTasksCount, doneTasksCount, loading } = this.state
        
        if (loading) {
            return <h1>asdsadda</h1>
        }

        console.log(projectId)
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
                        <Col xs="4">
                            <h6>Done tasks: </h6>
                            <TaksPage done={true} projectId={projectId} />
                        </Col>

                        <Col xs="4">
                            <h6>In progress: </h6>
                            <TaksPage done={false} projectId={projectId} />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        )
    }
}

export default withRouter(ProjectFullPage)