import React, { Component } from 'react';
import {Redirect, withRouter } from "react-router-dom";
import { Container, Alert, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { login, isLoggedIn } from '../../../services/user-service'

class LoginForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLoggedIn : isLoggedIn(),
      from : "/"
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

    let password = this.state.password
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

    if (this.state.isLoggedIn){
      return (<Redirect to={this.state.from} />)
    }
    return (
      <Container className="d-flex vh-100">
        
        <Form className="m-auto">
        

          <h2>Sign In</h2>

          <FormGroup>
            <Label>Username</Label>
            <Input id="input-username" type="text" placeholder="username" onChange={this.onUsernameChanged} required />
          </FormGroup>

          <FormGroup>
            <Label>Password</Label>
            <Input id="input-password" type="password" placeholder="********" onChange={this.onPasswordChanged} required/>
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