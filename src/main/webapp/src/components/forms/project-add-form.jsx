import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Input } from 'reactstrap';
import ServerError from '../error/server-error'
import UserError from '../error/user-error'
import { updateProject, createProject } from '../../services/project-service'


export default class ProjectAddDialog extends Component {


    constructor(props) {
        super(props);

        this.state = {
            projectId : null,
            name: "",
            description: "",

            isOpen: this.props.isOpen,
            editMode : false,

            serverError: '',
            userError : ''
        }
    }

    async componentDidUpdate(prevProps) {
        const {isOpen, project } = this.props
        if (prevProps !== this.props) {

            this.setState({isOpen : isOpen})

                if (project) {
                    this.setState({
                        projectId : project.projectId,
                        name: project.name,
                        description: project.description,
                    })
                } else {
                    this.setState({
                        projectId : null,
                        name: "",
                        description: "",
                    })
                }
            
        } 
    }


    onSubmit = (e) => {
        const {projectId, name, description} = this.state
        if (!name){
            this.setState({userError : "Name is empty"})
            return
        }
        if (!description){
            this.setState({userError : "Description is empty"})
            return
        }

        const project = {
            projectId : projectId,
            name : name,
            description : description
        }
        if (projectId) {
            updateProject(projectId, project).then(data => {
                if (typeof this.props.callback == "function"){
                    this.props.callback(project, true)
                }
            }).catch( e=> this.setState({serverError : e}))
        } else {
            createProject(project).then(data => {
                if (typeof this.props.callback == "function"){
                    this.props.callback(data, true)
                }
            }).catch( e=> this.setState({serverError : e}))
        }
    }

    onCancel = (e) => {
        e.preventDefault();
        this.setState({
            isOpen: false,
            serverError : '',
            userError : ''
        })
        if (typeof this.props.callback === "function") {
            this.props.callback(null, false)
        }
    }

    onProjectNameChange = (e) => {
        let name = e.target.value
        this.setState({
            name: name,
            serverError : '',
            userError : ''
        })
    }

    onProjectDescriptionChange = (e) => {
        let description = e.target.value
        this.setState({
            description: description,
            serverError : '',
            userError : ''
        })
    }

    render() {

        const {projectId, name, description} = this.state

        const header = projectId ? "Edit project" : "Add new project"
        return (
            <Modal isOpen={this.state.isOpen} size="lg">
                <ModalHeader >{header}</ModalHeader>
                <ServerError error={this.state.serverError}/>
                <UserError error={this.state.userError}/>
                <ModalBody>
                    <Row>
                        <Col xs="9" md="9">
                            <Input type="text" onChange={this.onProjectNameChange} placeholder="New project" value={name}></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <Input type="textarea" name="text" onChange={this.onProjectDescriptionChange} placeholder="Project description" value={description}/>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.onSubmit} style={{ minWidth: 100 }}>Save</Button>
                    <Button color="secondary" onClick={this.onCancel} style={{ minWidth: 100 }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

