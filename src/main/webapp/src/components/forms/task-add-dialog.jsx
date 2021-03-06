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


export default class TaskAddDialog extends Component {


    constructor(props) {
        super(props);

        this.state = {
            taskId : null,
            name: "",
            description: "",
            deadlineDate: null,
            deadlineTime: null,
            labels: [],
            projectId: this.props.projectId,

            labelsToChoose: [],
            isOpen: this.props.isOpen,
            editMode : false,

            serverError: '',
            userError : ''
        }
    }

    async componentDidUpdate(prevProps) {
        const {isOpen, task } = this.props
        if (prevProps !== this.props) {

            this.setState({isOpen : isOpen})

            if (isOpen === true){
                if (task) {
                    this.setStateEditMode(task)
                } else {
                    this.setStateNewMode()
                }
            }
        } 
    }

    setStateEditMode = async (task) =>{
            let labelsToChoose = await getLabelsInProject(task.project.projectId)
            let deadlineTime = getHHMM(task.deadline)
            this.setState({
                taskId : task.id,
                name : task.name,
                description : task.description,
                projectId : task.project.projectId,
                labels : task.labels,
                labelsToChoose : labelsToChoose,
                deadlineTime : deadlineTime,
                deadlineDate : task.deadline,
                editMode : true,
            })
    }

    setStateNewMode = async () =>{
        const { projectId } = this.props
        let labelsToChoose = await getLabelsInProject(projectId)
        console.log(labelsToChoose)
        this.setState(prevState => ({
            projectId: projectId,
            labelsToChoose: labelsToChoose,
            deadlineDate: null,
            deadlineTime: null,
            editMode : false
        }))
    }

    onSubmit = (e) => {
        const { taskId,projectId, name, description, labels, deadlineDate, deadlineTime} = this.state

        if (!name) {
            this.setState({userError : "Task name is empty"})
            return;
        }

        let deadline = null;

        if (deadlineDate) {
            if (!deadlineTime) {
                this.setState({userError : "Deadline time is empty"})
                return;
            }

            deadline = concatDateAndTime(deadlineDate, deadlineTime);
            deadline = toJsonDate(deadline)
        }

        let data = {
            name: name,
            description: description,
            deadline: deadline,
            isDone: false,
            project : {
                projectId : projectId
            },
            labels: labels,
        }
        if (taskId){
            updateTask(taskId, data).then(data => {
                if (typeof this.props.callback === "function") {
                    this.props.callback(data, true)
                }
            }).catch(e => {
                this.setState({serverError : e})
            });
        } else {
            saveNewTask(data)
            .then(data => {
                if (typeof this.props.callback === "function") {
                    this.props.callback(data, true)
                }
            }).catch(e => {
                this.setState({serverError : e})
            });
        }
        this.setState({
            taskId : '',
            name : '',
            description : '',
            labels : [],
            deadlineTime : '',
            deadlineDate : '',
        })
    }

    onCancel = (e) => {
        e.preventDefault();
        this.setState({
            taskId : '',
            name : '',
            description : '',
            labels : [],
            deadlineTime : '',
            deadlineDate : '',
        })
        if (typeof this.props.callback === "function") {
            this.props.callback(null, false)
        }
    }


    onAddLabel = (e) => {
        e.preventDefault();
        const newLabel = this.state.labelsToChoose.find(label => label.id === parseInt(e.target.value))

        this.setState((prevState) => ({
            labels: [...prevState.labels, newLabel],
            labelsToChoose: prevState.labelsToChoose
        }))
    }

    onDeleteLabel = (id) => {
        this.setState(prevState => ({
            labels: prevState.labels.filter(label => label.id !== parseInt(id)),
        }))
    }

    isLabelAdded = (label) => {
        return this.state.labels.filter(el => el.id === label.id).length > 0 ? true : false;
    }

    onTaskNameChange = (e) => {
        let name = e.target.value
        this.setState({
            name: name,
            serverError : '',
            userError : ''
        })
    }

    onTaskDescriptionChange = (e) => {
        let description = e.target.value
        this.setState({
            description: description,
            serverError : '',
            userError : ''
        })
    }

    onDateChange = (deadline) => {
        this.setState({
            deadlineDate: deadline,
            serverError : '',
            userError : ''
        })
    }

    onTimeChange = (deadline) => {
        this.setState({
            deadlineTime: deadline,
            serverError : '',
            userError : ''
        })
    }

    onDeadlineClear = (e) => {
        e.preventDefault();
        this.setState({
            deadlineDate: null,
            deadlineTime: null,
            serverError : '',
            userError : ''
        })
    }

    render() {
        const labelsToChoose = this.state.labelsToChoose.filter(label => !this.isLabelAdded(label)).map((label) => {
            return <DropdownItem key={label.id} value={label.id} onClick={this.onAddLabel}>{label.name}</DropdownItem>
        })
        const choosedLabels = this.state.labels.map((label) => {
            return <TaskLabel label={label} key={label.id} onClick={this.onDeleteLabel} />;
        })

        const {name, description} = this.state

        const header = this.state.editMode ? "Edit task" : "Add new task"
        return (
            <Modal isOpen={this.state.isOpen} size="lg">
                <ModalHeader >{header}</ModalHeader>
                <ServerError error={this.state.serverError}/>
                <UserError error={this.state.userError}/>
                <ModalBody>
                    <Row>
                        <Col xs="9" md="9">
                            <Input type="text" onChange={this.onTaskNameChange} placeholder="New task" value={name}></Input>
                        </Col>
                        <Col xs="3" md="3" className="d-flex justify-content-end">
                            <UncontrolledDropdown className="w-100">
                                <DropdownToggle caret className="w-100">Labels</DropdownToggle>
                                <DropdownMenu>
                                    {labelsToChoose}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs="12" md="12">
                            {choosedLabels}
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col xs="12">
                            <Input type="textarea" name="text" onChange={this.onTaskDescriptionChange} placeholder="Task description" value={description}/>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col xs="6">
                            <DatePicker id="datepicker" value={this.state.deadlineDate} dateFormat="DD.MM.YYYY" minDate={getCurrentDateJSON()} onChange={this.onDateChange} showClearButton={false} />
                        </Col>
                        <Col xs="3">
                            <TimePicker className="w-100" onChange={this.onTimeChange} nullValue="No deadline" disabled={this.state.deadlineDate == null} isEmpty={false} time={this.state.deadlineTime} />
                        </Col>
                        <Col xs="3">
                            <Button color="danger" className="w-100" onClick={this.onDeadlineClear} >Clear</Button>
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

