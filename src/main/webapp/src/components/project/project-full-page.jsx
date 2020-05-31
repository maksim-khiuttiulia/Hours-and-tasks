import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Col, Card, CardHeader, CardBody, Row, ListGroup, ListGroupItem, Badge, Button } from 'reactstrap';
import TaksPage from '../tasks/tasks-page'
import { getProject } from '../../services/project-service';
import TaskAddDialog from '../forms/task-add-dialog'
import ProjectAddDialog from '../forms/project-add-form';

class ProjectFullPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            project: {
                projectId: props.match.params.id,
                name: null,
                description: null,
                tasksCount: 0,
                todoTasksCount: 0,
                doneTasksCount: 0,
                labels: [],
            },


            addTaskDialogOpen: false,
            editProjectDialogOpen: false,

            serverError: '',
            clientError: '',
            loading: true,

            updateCounter: 0
        }
    }

    async componentDidMount() {
        this.readProject()
    }

    readProject() {
        this.setState({ loading: true })
        const { projectId } = this.state.project
        getProject(projectId).then(data => {
            const { projectId, name, description, tasksCount, todoTasksCount, doneTasksCount, labels } = data;

            this.setState({
                project: {
                    projectId: projectId,
                    name: name,
                    description: description,
                    tasksCount: tasksCount,
                    todoTasksCount: todoTasksCount,
                    doneTasksCount: doneTasksCount,
                    labels: labels,
                },

                loading: false,

            })
        })
    }

    onEditProjectDialogOpen = () => {
        this.setState({ editProjectDialogOpen: true })
    }

    onEditProjectDialogClose= () => {
        this.setState({ editProjectDialogOpen: false })
    }

    onEditProjectDialogCallback= (project, needRefresh) => {
        if (needRefresh === true){
            this.readProject();
        }
        this.setState({ editProjectDialogOpen: false })
    }

    onAddTaskClick = (e) => {
        this.setState({
            addTaskDialogOpen: true
        })
    }

    onAddTaskCallback = (task, added) => {
        if (added === true) {
            this.updateChild()
            this.readProject()
        }

        this.setState({ addTaskDialogOpen: false })
    }

    onTaskListChanged = () => {
        this.readProject()
    }



    updateChild = () => {
        const { updateCounter } = this.state.project
        this.setState({
            updateCounter: updateCounter + 1
        })
    }

    render() {
        const { projectId, name, description, labels, tasksCount, todoTasksCount, doneTasksCount } = this.state.project
        const { updateCounter, addTaskDialogOpen, editProjectDialogOpen, project } = this.state

        return (
            <Card>
                <TaskAddDialog projectId={projectId} isOpen={addTaskDialogOpen} callback={this.onAddTaskCallback} labelsToChoose={labels} />
                <ProjectAddDialog project={project} isOpen={editProjectDialogOpen} callback={this.onEditProjectDialogCallback}/>
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
                                    Total tasks: <Badge color="warning">{tasksCount}</Badge>
                                </ListGroupItem>
                                <ListGroupItem>
                                    Done tasks: <Badge color="warning">{doneTasksCount}</Badge>
                                </ListGroupItem>
                                <ListGroupItem>
                                    In progress tasks: <Badge color="warning">{todoTasksCount}</Badge>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Button color="success" className="w-100" onClick={this.onEditProjectDialogOpen}>Edit project</Button>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Button color="success" className="w-100">Delete project</Button>
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                        <Col xs="9">
                            <TaksPage projectId={projectId} callback={this.onTaskListChanged} updateCounter={updateCounter} />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        )
    }
}

export default withRouter(ProjectFullPage)