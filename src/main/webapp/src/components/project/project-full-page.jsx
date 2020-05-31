import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Col, Card, CardHeader, CardBody, Row, ListGroup, ListGroupItem, Badge, Button } from 'reactstrap';
import TaksPage from '../tasks/tasks-page'
import { getProject } from '../../services/project-service';
import TaskAddDialog from '../forms/task-add-dialog'
import ProjectAddDialog from '../forms/project-add-form';
import ProjectDeleteDialog from '../forms/project-delete-dialog'

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
            deleteProjectDialogOpen : false,

            serverError: '',
            clientError: '',
            loading: true,

            refreshTaskList: false
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

    onEditProjectDialogCallback = (project, needRefresh) => {
        if (needRefresh === true) {
            this.readProject();
        }
        this.setState({ editProjectDialogOpen: false })
    }

    
    onDeleteProjectDialogOpen = () => {
        this.setState({ deleteProjectDialogOpen: true })
    }

    onDeleteProjectDialogCallback = (project, deleted) => {
        this.setState({ editProjectDialogOpen: false })
        if (deleted === true) {
            this.props.history.push("/projects")
        }
        
    }

    onAddTaskClick = (e) => {
        this.setState({
            addTaskDialogOpen: true
        })
    }

    onAddTaskCallback = (task, added) => {
        this.setState({ addTaskDialogOpen: false })
        if (added === true) {
            this.updateChild()
            this.readProject()
        }
    }

    onTaskListChanged = () => {
        this.readProject()
    }


    updateChild = () => {
        const { refreshTaskList } = this.state
        this.setState({
            refreshTaskList: !refreshTaskList
        })
    }

    render() {
        const { projectId, name, description, labels, tasksCount, todoTasksCount, doneTasksCount } = this.state.project
        const { refreshTaskList, addTaskDialogOpen, editProjectDialogOpen, deleteProjectDialogOpen, project } = this.state

        return (
            <Card>
                <TaskAddDialog projectId={projectId} isOpen={addTaskDialogOpen} callback={this.onAddTaskCallback} labelsToChoose={labels} />
                <ProjectAddDialog project={project} isOpen={editProjectDialogOpen} callback={this.onEditProjectDialogCallback} />
                <ProjectDeleteDialog project={project} isOpen={deleteProjectDialogOpen} callback={this.onDeleteProjectDialogCallback}/>
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
                                    <Button color="success" className="w-100" onClick={this.onDeleteProjectDialogOpen}>Delete project</Button>
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                        <Col xs="9">
                            <TaksPage projectId={projectId} callback={this.onTaskListChanged} refresh={refreshTaskList} />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        )
    }
}

export default withRouter(ProjectFullPage)