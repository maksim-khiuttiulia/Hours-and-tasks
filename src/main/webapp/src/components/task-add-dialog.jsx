import React, { Component } from 'react';
import TaskLabel from './task-label'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, DropdownItem, Input, UncontrolledDropdown, DropdownMenu, DropdownToggle} from 'reactstrap';
import DatePicker from 'reactstrap-date-picker'
import TimePicker from './timepicker'
import {getCurrentDateJSON} from '../utils/date-time'


export default class TaskAddDialog extends Component {


    constructor(props) {
        super(props);

        this.state = {
            task: {
                taskId: null,
                name: "",
                text: "",
                created: null,
                deadline: null,
                done: false,
                projectId: 1,
                labels: []
            },
            labelsToChoose: [],
            deadlineDate : null,
            deadlineTime : null,
            isOpen: true
        }
    }


    componentDidUpdate(prevProps) {

        if (prevProps.labelsToChoose !== this.props.labelsToChoose) {
            this.setState(prevState => ({
                ...prevState,
                labelsToChoose: this.props.labelsToChoose
            }))
        }
        /*if (prevProps !== this.props) {
            this.setState(prevState => ({
                isOpen: this.props.isOpen,
                task: this.props.task
            }))
        }*/
    }

    onSubmit = (e) => {
        console.log(this.state)
    }

    onCancel = (e) => {
        e.preventDefault();
        this.props.onCancelDeleteTask(this.state.task)
        this.setState({
            isOpen: false,
            task: undefined
        })
    }


    onAddLabel = (e) => {
        e.preventDefault();
        const newLabel = this.state.labelsToChoose.find(label => label.id === parseInt(e.target.value))

        this.setState((prevState) => ({
            task: {
                ...prevState.task,
                labels: [...prevState.task.labels, newLabel]
            },
            labelsToChoose: prevState.labelsToChoose
        }))
    }

    onDeleteLabel = (id) => {
        this.setState(prevState => ({
            task: {
                ...prevState.task,
                labels: prevState.task.labels.filter(label => label.id !== parseInt(id))
            },
            labelsToChoose: prevState.labelsToChoose
        }))
    }

    isLabelAdded = (label) => {
        return this.state.task.labels.filter(el => el.id === label.id).length > 0 ? true : false;
    }

    onTaskNameChange = (e) => {
        let name = e.target.value
        this.setState(prevState =>({
            ...prevState,
            task : {
                ...prevState.task,
                name : name
            }
        }))
    }

    onTaskTextChange = (e) => {
        let text = e.target.value
        this.setState(prevState =>({
            ...prevState,
            task : {
                ...prevState.task,
                text : text
            }
        }))
    }

    onDateChange = (deadline) =>{
        this.setState(prevState =>({
            ...prevState,
            task : {
                ...prevState.task,
                deadline : deadline
            }
        }))
    }

    onTimeChange = (deadline) => {
        console.log(deadline)
    }


    render() {
        const labelsToChoose = this.state.labelsToChoose.filter(label => !this.isLabelAdded(label)).map((label) => {
            return <DropdownItem key={label.id} value={label.id} onClick={this.onAddLabel}>{label.name}</DropdownItem>
        })
        const choosedLabels = this.state.task.labels.map((label) => {
            return <TaskLabel label={label} key={label.id} onClick={this.onDeleteLabel} />;
        })

        return (
            <Modal isOpen={this.state.isOpen} size="lg">
                <ModalHeader >Add new task</ModalHeader>
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
                            <Input type="textarea" name="text" onChange={this.onTaskTextChange} />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col xs="6">
                            <DatePicker id="datepicker" value={this.state.deadlineDate} minDate={getCurrentDateJSON()} onChange={this.onDateChange} showClearButton={false}/>
                        </Col>
                        <Col xs="3">
                            <TimePicker className="w-100" onChange={this.onTimeChange} nullValue="No deadline"/>
                        </Col>
                        <Col xs="3">
                            <Button color="danger" className="w-100" >Clear</Button>
                        </Col>
                    </Row>

                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.onSubmit}>Save</Button>
                    <Button color="secondary" onClick={this.onCancel}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

