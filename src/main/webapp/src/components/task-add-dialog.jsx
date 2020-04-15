import React, { Component } from 'react';
import TaskLabel from './task-label'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, DropdownItem, Input, UncontrolledDropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import DatePicker from 'reactstrap-date-picker'
import TimePicker from './timepicker'
import { getCurrentDateJSON } from '../utils/date-time'


export default class TaskAddDialog extends Component {


    constructor(props) {
        super(props);

        this.state = {
            name : "",
            text : "",
            deadlineDate: null,
            deadlineTime: null,
            project : this.props.project,
            labels : [],


            labelsToChoose: [],
            isOpen: true
        }
    }


    componentDidUpdate(prevProps) {

        if (prevProps.labelsToChoose !== this.props.labelsToChoose) {
            this.setState(prevState => ({
                ...prevState,
                project : this.props.project,
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
        let deadline = null;
        if (this.state.deadlineDate || this.state.deadlineTime){
            if (!this.state.deadlineDate){
                
            } 
        }
        console.log(this.state)
    }

    onCancel = (e) => {
        e.preventDefault();
        this.props.onCancelDeleteTask(this.state.task)
        this.setState({
            isOpen: false,
        })
    }


    onAddLabel = (e) => {
        e.preventDefault();
        const newLabel = this.state.labelsToChoose.find(label => label.id === parseInt(e.target.value))

        this.setState((prevState) => ({
            ...prevState,
            labels: [...prevState.task.labels, newLabel],
            labelsToChoose: prevState.labelsToChoose
        }))
    }

    onDeleteLabel = (id) => {
        this.setState(prevState => ({
            ...prevState,
            labels: prevState.task.labels.filter(label => label.id !== parseInt(id)),
        }))
    }

    isLabelAdded = (label) => {
        return this.state.labels.filter(el => el.id === label.id).length > 0 ? true : false;
    }

    onTaskNameChange = (e) => {
        let name = e.target.value
        this.setState(prevState => ({
            ...prevState,
            name : name
        }))
    }

    onTaskTextChange = (e) => {
        let text = e.target.value
        this.setState(prevState => ({
            ...prevState,
            text : text
        }))
    }

    onDateChange = (deadline) => {
        console.log(deadline)
        this.setState(prevState => ({
            ...prevState,
            deadlineDate: deadline
        }))
    }

    onTimeChange = (deadline) => {
        console.log(deadline)
        this.setState(prevState => ({
            ...prevState,
            deadlineTime: deadline
        }))
    }

    onDeadlineClear = (e) => {
        e.preventDefault();
        this.setState(prevState => ({
            ...prevState,
            deadlineDate: null,
            deadlineTime: null
        }))
    }

    onProjectChange = (e) => {
        e.preventDefault();
        const projectId = parseInt(e.target.value);
        this.setState(prevState => ({
            ...prevState,
            projectId : projectId
        }))
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
                <ModalHeader >Add new task to {this.state.project.name}</ModalHeader>
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
                            <DatePicker id="datepicker" value={this.state.deadlineDate} minDate={getCurrentDateJSON()} onChange={this.onDateChange} showClearButton={false} />
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
                    <Button color="danger" onClick={this.onSubmit}>Save</Button>
                    <Button color="secondary" onClick={this.onCancel}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

