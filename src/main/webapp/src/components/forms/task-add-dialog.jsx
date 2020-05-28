import React, { Component } from 'react';
import TaskLabel from '../tasks/task-label'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, DropdownItem, Input, UncontrolledDropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import DatePicker from 'reactstrap-date-picker'
import TimePicker from '../timepicker/timepicker'
import ServerError from '../error/server-error'
import UserError from '../error/user-error'
import { getCurrentDateJSON, concatDateAndTime, toJsonDate } from '../../utils/date-time'
import { getLabelsInProject } from '../../services/label-service'
import { saveNewTask } from '../../services/task-service'


export default class TaskAddDialog extends Component {


    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",
            deadlineDate: null,
            deadlineTime: null,
            labels: [],
            projectId: this.props.projectId,

            labelsToChoose: Array.isArray(this.props.labelsToChoose) ? this.props.labelsToChoose : [],
            isOpen: this.props.isOpen,

            serverError: '',
            userError : ''
        }
    }

    async componentDidUpdate(prevProps) {
        const {isOpen, projectId, labelsToChoose } = this.props

        if (prevProps !== this.props) {
            this.setState(prevState => ({
                isOpen: isOpen,
                projectId: projectId,
                labelsToChoose: labelsToChoose,
                deadlineDate: null,
                deadlineTime: null,
            }))
        } 

    }

    onSubmit = (e) => {
        const {projectId, name, description, labels, deadlineDate, deadlineTime} = this.state

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
        saveNewTask(data)
        .then(data => {
            if (typeof this.props.callback === "function") {
                this.props.callback(data, true)
            }
        }).catch(e => {
            this.setState({serverError : e})
        });
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

    onTaskTextChange = (e) => {
        let text = e.target.value
        this.setState({
            text: text,
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
        return (
            <Modal isOpen={this.state.isOpen} size="lg">
                <ModalHeader >Add new task</ModalHeader>
                <ServerError error={this.state.serverError}/>
                <UserError error={this.state.userError}/>
                <ModalBody>
                    <Row>
                        <Col xs="9" md="9">
                            <Input type="text" onChange={this.onTaskNameChange} placeholder="New task"></Input>
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
                            <Input type="textarea" name="text" onChange={this.onTaskTextChange} placeholder="Task description" />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col xs="6">
                            <DatePicker id="datepicker" value={this.state.deadlineDate} dateFormat="DD.MM.YYYY" minDate={getCurrentDateJSON()} onChange={this.onDateChange} showClearButton={false} />
                        </Col>
                        <Col xs="3">
                            <TimePicker className="w-100" onChange={this.onTimeChange} nullValue="No deadline" disabled={this.state.deadlineDate == null} />
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

