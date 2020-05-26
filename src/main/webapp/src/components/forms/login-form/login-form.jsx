import React, { Component } from 'react';
import {Redirect, withRouter } from "react-router-dom";
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { login, isLoggedIn } from '../../../services/user-service'
import ServerError from '../../error/server-error'
import UserError from '../../error/user-error'

class LoginForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLoggedIn : isLoggedIn(),
      from : "/",

      userError : '',
      serverError : ''
    }
  }

  onUsernameChanged = (e) => {
    let username = e.target.value
    this.setState({
      userError : "",
      serverError : "",
      username: username
    })
  }

  onPasswordChanged = (e) => {
    let password = e.target.value
    this.setState({
      userError : "",
      serverError : "",
      password: password
    })
  }

  onSubmit = (e) => {
    let username = this.state.username
    if (!username){
      this.setState({userError : "Username is empty"})
      return
    }

    let password = this.state.password

    if (!password){
      this.setState({userError : "Password is empty"})
      return
    }

    login(username, password).then(data => {
      this.setState({
        isLoggedIn : true
      })
    }).catch(e => this.setState({serverError : e}))
  }


  render() {
    if (this.state.isLoggedIn){
      return (<Redirect to={this.state.from} />)
    }
    return (
      <Container className="d-flex vh-100">
        
        <Form className="m-auto">

          <h2>Sign In</h2>
          <ServerError error={this.state.serverError}/>
          <UserError error={this.state.userError}/>

          <FormGroup>
            <Label>Username</Label>
            <Input id="input-username" type="text" placeholder="username" onChange={this.onUsernameChanged} required />
          </FormGroup>

          <FormGroup>
            <Label>Password</Label>
            <Input id="input-password" type="password" placeholder="********" onChange={this.onPasswordChanged} required/>
          </FormGroup>

          <FormGroup> 
            <Button id="submit" onClick={this.onSubmit} color="success" block>Login</Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

export default withRouter(LoginForm)