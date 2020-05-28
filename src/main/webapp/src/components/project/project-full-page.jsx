import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Col, Card, CardHeader, CardBody, Row, ListGroup, ListGroupItem, Badge, Button } from 'reactstrap';
import TaksPage from '../tasks/tasks-page'
import { getProject } from '../../services/project-service';
import TaskAddDialog from '../forms/task-add-dialog'

class ProjectFullPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            projectId: props.match.params.id,

            name : null,
            description: null,
            tasksCount: 0,
            todoTasksCount: 0,
            doneTasksCount: 0,
            labels : [],

            addTaskDialogOpen : false,

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
            console.log(data)
            const { name, description, tasksCount, todoTasksCount, doneTasksCount, labels } = data;
            console.log(data)
            this.setState({
                name: name,
                description: description,
                tasksCount: tasksCount,
                todoTasksCount: todoTasksCount,
                doneTasksCount: doneTasksCount,
                labels : labels,
                loading: false
            })
        })
    }

    onAddTaskClick = (e) => {
        this.setState({
            addTaskDialogOpen : true
        })
    }

    onAddTaskCallback = (task, added) => {
        if (added === true){

        }

        this.setState({addTaskDialogOpen : false})
    }


    render() {
        const { projectId, name, description, labels, tasksCount, todoTasksCount, doneTasksCount, loading, addTaskDialogOpen} = this.state
        
        return (
            <Card>
                <TaskAddDialog projectId={projectId} isOpen={addTaskDialogOpen} callback={this.onAddTaskCallback} labelsToChoose={labels}/>
                <CardHeader className="bg-danger text-white">
                    <h3 className="pb-5" style={{ fontWeight: 300 }}>{name}</h3>
                    <p>{description}</p>
                </CardHeader>

                <CardBody>
                    <Row>
                        <Col xs="3">
                            <ListGroup flush>
                                <ListGroupItem>
                                    <Button color="success" className="w-100" onClick={this.onAddTaskClick}>Add task</Button>
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
                        <Col xs="9">
                            <TaksPage projectId={projectId}/>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        )
    }
}

export default withRouter(ProjectFullPage)