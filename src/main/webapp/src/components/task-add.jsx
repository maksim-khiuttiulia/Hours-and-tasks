import React, {Component} from 'react'
import {ListGroupItem,Button, Input, Row, Col} from 'reactstrap'


export default class TaskAddForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            name : "",
            labels : []
        }
    }

    onChange = (e) =>{
        this.setState({
            name : e.target.value
        })
    }

    onSubmit = (e) =>{
        e.preventDefault();
        if (this.state.name === ""){
            alert("Task name is empty");
        } else {
            this.props.onSaveNewTask(this.state)
        }
        this.setState({
            name : ""
        })
    }

    render() {
        return (
            <ListGroupItem color="info">
                <Row className="d-flex align-items-center">
                    <Col xs="6" md="6">
                        <Row>
                            <Col xs="12">
                                <Input type="text" onChange={this.onChange} placeholder="New task" value={this.state.name}></Input>
                            </Col>
                            <Col xs="12">
                                
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="6" md="6" className="d-flex justify-content-end">
                        <Button color="success" onClick={this.onSubmit} style={{minWidth : 200}}>Save</Button>
                    </Col>
                </Row>
                    <Row>
                        <Col>
                            
                        </Col>
                        <Col>
                            
                        </Col>
                    </Row>
            </ListGroupItem>
        );
    }
}