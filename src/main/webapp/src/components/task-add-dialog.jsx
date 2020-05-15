import React, { Component } from 'react';
import TaskLabel from './task-label'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, DropdownItem, Input, UncontrolledDropdown, DropdownMenu, DropdownToggle, Alert} from 'reactstrap';
import DatePicker from 'reactstrap-date-picker'
import TimePicker from './timepicker'
import { getCurrentDateJSON, concatDateAndTime, toJsonDate } from '../utils/date-time'
import {getAllLabels} from '../services/label-service'
import {saveNewTask} from '../services/task-service'


export default class TaskAddDialog extends Component {


    constructor(props) {
        super(props);

        this.state = {
            name : "",
            description : "",
            deadlineDate: null,
            deadlineTime: null,
            labels : [],
            projectId : this.props.projectId,

            labelsToChoose: [],
            errorMessage : "",
            isOpen: this.props.isOpen
        }
    }

    componentDidMount() {
        getAllLabels().then((data) => {
            this.setState({
                labelsToChoose : data
            })
        }) 
        
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
          this.setState(prevState => ({
            isOpen: this.props.isOpen,
          }))
        }
      }

    onSubmit = (e) => {
        const name = this.state.name;
        const description = this.state.description;
        const labels = this.state.labels;

        if (!name){
            this.showError("Name is empty")
            return;
        }

        let deadline = null;
        const deadlineDate = this.state.deadlineDate;
        const deadlineTime = this.state.deadlineTime;

        if (deadlineDate) {
            if (!deadlineTime) {
                this.showError("Deadline time is empty")
                return;
            }

            deadline = concatDateAndTime(deadlineDate, deadlineTime);
            deadline = toJsonDate(deadline)
        }
        
        let data = {
            name : name,
            description : description,
            deadline : deadline,
            isDone : false,
            projectId : 1,
            labels : labels,
        }
        saveNewTask(1, data).then(data => {
            this.setState({
                isOpen: false
            })
        });
    }

    onCancel = (e) => {
        e.preventDefault();
        this.setState({
            isOpen: false,
        })
    }

    showError = (error) => {
        this.setState({
            errorMessage : error
        })
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
        this.setState(prevState => ({
            name : name
        }))
    }

    onTaskTextChange = (e) => {
        let text = e.target.value
        this.setState(prevState => ({
            text : text
        }))
    }

    onDateChange = (deadline) => {
        this.setState(prevState => ({
            deadlineDate: deadline
        }))
    }

    onTimeChange = (deadline) => {
        this.setState(prevState => ({
            deadlineTime: deadline
        }))
    }

    onDeadlineClear = (e) => {
        e.preventDefault();
        this.setState(prevState => ({
            deadlineDate: null,
            deadlineTime: null
        }))
    }

    render() {
        const labelsToChoose = this.state.labelsToChoose.filter(label => !this.isLabelAdded(label)).map((label) => {
            return <DropdownItem key={label.id} value={label.id} onClick={this.onAddLabel}>{label.name}</DropdownItem>
        })
        const choosedLabels = this.state.labels.map((label) => {
            return <TaskLabel label={label} key={label.id} onClick={this.onDeleteLabel} />;
        })
        
        let alert = null;
        if (this.state.errorMessage){
            alert = <Alert color="danger">{this.state.errorMessage}</Alert>
        }
        return (
            <Modal isOpen={this.state.isOpen} size="lg">
                <ModalHeader >Add new task</ModalHeader>
                <ModalBody>
                    {alert}
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
                    <Button color="danger" onClick={this.onSubmit}>Save</Button>
                    <Button color="secondary" onClick={this.onCancel}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

