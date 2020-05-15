import React, { Component } from 'react';
import {Redirect, withRouter } from "react-router-dom";
import { Container, Alert, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { login } from '../services/user-service'

class LoginForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLoggedIn : props.isLoggedIn
    }
  }

  onUsernameChanged = (e) => {
    let username = e.target.value
    this.setState({
      errorMessage : "",
      username: username
    })
  }

  onPasswordChanged = (e) => {
    let password = e.target.value
    this.setState({
      errorMessage : "",
      password: password
    })
  }

  onSubmit = (e) => {
    let username = this.state.username
    if (!username){
      this.showError("Username is empty");
      return;
    }

    let password = this.state.password

    if (!password){
      this.showError("Password is empty");
      return;
    }
    login(username, password).then(data => {
      this.setState({
        isLoggedIn : true
      })
    })
  }

  showError = (error) => {
    this.setState({
        errorMessage : error
    })
  }

  render() {

    let alert = null;
    if (this.state.errorMessage){
        alert = <Alert color="danger">{this.state.errorMessage}</Alert>
    }
    
    if (this.state.isLoggedIn === true){
        return (<Redirect to="/"/>)
    }
    return (
      <Container className="d-flex h-100">
        
        <Form className="m-auto">
        

          <h2>Sign In</h2>

          <FormGroup>
            <Label>Username</Label>
            <Input type="text" placeholder="username" onChange={this.onUsernameChanged} />
          </FormGroup>

          <FormGroup>
            <Label>Password</Label>
            <Input type="password" placeholder="********" onChange={this.onPasswordChanged} />
          </FormGroup>

          <FormGroup> 
            <Button onClick={this.onSubmit} color="success" block>Login</Button>
            {alert}
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

export default withRouter(LoginForm)