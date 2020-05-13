import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import {login} from '../services/user-service'

export default  class LoginForm extends Component {


  onUsernameChanged= (e) =>{
    let username = e.target.value
    this.setState({
        username : username
    })
  }

  onPasswordChanged= (e) =>{
    let password = e.target.value
    this.setState({
        password : password
    })
  }

  onSubmit = (e) => {
        let username = this.state.username
        let password = this.state.password
        login(username, password).then(data => {
            location.reload()
        })
  }  
  render() {
    return (
      <Container className="App">
        <h2>Sign In</h2>
        <Form className="form">
          <Col>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="myemail@email.com"
                onChange={this.onUsernameChanged}/>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="********"
              onChange={this.onPasswordChanged}/>
            </FormGroup>
          </Col>
          <Button onClick={this.onSubmit}>Submit</Button>
        </Form>
      </Container>
    );
  }
}