import React, { Component } from 'react'
import TaskLabel from './task-label'
import { ListGroupItem, Button, Input, Row, Col, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'



export default class TaskAddForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            task: {
                taskId : null,
                name: "",
                text: "",
                created : null,
                deadline : null,
                done : false,
                projectId : 1,
                labels: []
            },
            labelsToChoose: []
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.labelsToChoose !== this.props.labelsToChoose) {
            this.setState(prevState => ({
                task : prevState.task,
                labelsToChoose: this.props.labelsToChoose
            }))
        }
    }

    onNameChange = (e) => {
        let name = e.target.value
        this.setState(prevState => ({
            task: {
                ...prevState.task,
                name: name
            }
        }))
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.task.name === "") {
            alert("Task name is empty");
            return;
        }
        if (typeof this.props.onAddTask !== "function") {
            console.error("onAddTask is not function or not implemented");
            return;
        }

        this.props.onAddTask(this.state.task)
        this.setState((prevState) => ({
            task: {
                id : null,
                name: "",
                text: "",
                created : null,
                deadline : null,
                done : false,
                projectId : 1,
                labels: []
            },
            labelsToChoose: prevState.labelsToChoose
        }))
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

    render() {
        const labelsToChoose = this.state.labelsToChoose.filter(label => !this.isLabelAdded(label)).map((label) => {
            return <DropdownItem key={label.id} value={label.id} onClick={this.onAddLabel}>{label.name}</DropdownItem>
        })
        const choosedLabels = this.state.task.labels.map((label) => {
            return <TaskLabel label={label} key={label.id} onClick={this.onDeleteLabel} />;
        })

        return (
            <ListGroupItem color="info">
                <Row className="d-flex align-items-center">
                    <Col xs="6" md="6">
                        <Row>
                            <Col xs="12">
                                <Input type="text" onChange={this.onNameChange} placeholder="New task" value={this.state.task.name}></Input>
                            </Col>
                            <Col xs="12">
                                {choosedLabels}
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="6" md="6" className="d-flex justify-content-end">
                        <UncontrolledDropdown >
                            <DropdownToggle caret style={{ minWidth: 100 }}>Labels</DropdownToggle>
                            <DropdownMenu>
                                {labelsToChoose}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <Button color="success" onClick={this.onSubmit} style={{ minWidth: 100 }}>Save</Button>
                    </Col>
                </Row>
            </ListGroupItem>
        );
    }
}