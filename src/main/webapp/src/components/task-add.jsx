import React, { Component } from 'react'
import TaskLabel from './task-label'
import { ListGroupItem, Button, Input, Row, Col, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'



export default class TaskAddForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newTask :{
                name: "",
                labels: [],
            },
            
            labelsToChoose: []
        }

    }

    componentDidUpdate(prevProps) {
        if(prevProps.labelsToChoose !== this.props.labelsToChoose) {
          this.setState({
            labelsToChoose : this.props.labelsToChoose
          })
        }
      }

    isLabelAdded = (label) => {
        return this.state.newTask.labels.filter(el => el.id === label.id).length > 0 ? true : false;
    }

    onNameChange = (e) => {
        this.setState({
            newTask : {
                name : e.target.value
            }
        })
    }

    onAddLabel = (e) => {
        e.preventDefault();
        const newLabel = this.state.labelsToChoose.find(label => label.id === parseInt(e.target.value))

        this.setState((prevState) => ({
            newTask : {
                labels : [...prevState.newTask.labels, newLabel]
            }
        }))
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.name === "") {
            alert("Task name is empty");
        } else {
            console.log(this.state)
            this.props.onSaveNewTask(this.state)
            this.setState({
                name: "",
                labels: []
            })
        }

    }

    onDeleteLabel = (id) => {
        this.setState(prevState => ({
            labels: prevState.labels.filter(label => label.id !== parseInt(id))
        }))
    }

    render() {
        const labelsToChoose = this.state.labelsToChoose.filter(label => !this.isLabelAdded(label)).map((label) => {
            return <DropdownItem key={label.id} value={label.id} onClick={this.onAddLabel}>{label.name}</DropdownItem>
        })
        const choosedLabels = this.state.newTask.labels.map((label) => {
            return <TaskLabel label={label} key={label.id} onClick={this.onDeleteLabel} />;
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