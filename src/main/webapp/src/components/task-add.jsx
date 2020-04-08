import React, { Component } from 'react'
import TaskLabel from './task-label'
import { ListGroupItem, Button, Input, Row, Col, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'


export default class TaskAddForm extends Component {

    possibleLabels = []

    constructor(props) {
        super(props);
        this.possibleLabels = this.props.labels;

        this.state = {
            name: "",
            labels: []
        }
    }

    isLabelAdded = (label) => {
        return this.state.labels.filter(el => el.id === label.id).length > 0 ? true : false;
    }

    onNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    onAddLabel = (e) => {
        e.preventDefault();
        const newLabel =this.possibleLabels.find(label => label.id === parseInt(e.target.value))
        
        this.setState((prevState) => ({
            labels : [...prevState.labels, newLabel]
        }))
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.name === "") {
            alert("Task name is empty");
        } else {
            this.props.onSaveNewTask(this.state)
            this.setState({
                name: "",
                labels : []
            })
        }
        
    }

    onDeleteLabel = (id) => {
        this.setState(prevState => ({
            labels : prevState.labels.filter(label => label.id !== parseInt(id))
        }))
    }

    render() {
        const labelsToChoose = this.possibleLabels.filter(label => !this.isLabelAdded(label)).map((label) => {
            return <DropdownItem key={label.id} value={label.id} onClick={this.onAddLabel}>{label.name}</DropdownItem>
        })
        const choosedLabels = this.state.labels.map((label) => {
            return <TaskLabel label={label} key={label.id} onClick={this.onDeleteLabel}/>;
        })

        return (
            <ListGroupItem color="info">
                <Row className="d-flex align-items-center">
                    <Col xs="6" md="6">
                        <Row>
                            <Col xs="12">
                                <Input type="text" onChange={this.onNameChange} placeholder="New task" value={this.state.name}></Input>
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