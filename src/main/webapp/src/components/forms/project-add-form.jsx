import React, { Component } from 'react';
import TaskLabel from '../tasks/task-label'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, DropdownItem, Input, UncontrolledDropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import DatePicker from 'reactstrap-date-picker'
import TimePicker from '../timepicker/timepicker'
import ServerError from '../error/server-error'
import UserError from '../error/user-error'
import { getCurrentDateJSON, concatDateAndTime, toJsonDate, getHHMM} from '../../utils/date-time'
import { saveNewTask, updateTask } from '../../services/task-service'
import {getLabelsInProject} from '../../services/label-service'


export default class ProjectAddDialog extends Component {


    constructor(props) {
        super(props);

        this.state = {
            projectId : null,
            name: "",
            description: "",
            labels: [],

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
                        labels: project.labels,
                    })
                } else {
                    this.setState({
                        projectId : null,
                        name: "",
                        description: "",
                        labels: [],
                    })
                }
            
        } 
    }


    onSubmit = (e) => {
        
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


    onAddLabel = (e) => {

    }

    onDeleteLabel = (id) => {

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

        const {projectId, name, description, labels} = this.state

        const projectLabels = labels.map((label) => {
            return <TaskLabel label={label} key={label.id} onClick={this.onDeleteLabel} />;
        })

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
                        <Col xs="12" md="12">
                            {projectLabels}
                        </Col>
                    </Row>
                    <br />
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

