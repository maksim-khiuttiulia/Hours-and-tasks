import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ServerError from '../error/server-error'
import {deleteProject} from '../../services/project-service'



export default class ProjectDeleteDialog extends Component {


  constructor(props) {
    super(props)
    this.state = {
      isOpen: props.isOpen,
      project: props.project,

      serverError : ''
    }
  }


  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState(prevState => ({
        isOpen: this.props.isOpen,
        project: this.props.project
      }))
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {project} = this.state
    deleteProject(project.projectId)
    .then(data => {
      this.setState({
        isOpen : false,
        project : undefined
      })
      if (typeof this.props.callback === "function"){
          this.props.callback(project, true)
      }
    })
    .catch(e => this.setState({serverError : e}))
    
  }

  onCancel = (e) => {
    e.preventDefault();
    const {project} = this.state
    this.setState({
      isOpen : false,
      project : undefined
    })
    if (typeof this.props.callback === "function"){
      this.props.callback(project, false)
    }
  }



  render() {
    const projectName = this.state.project ? this.state.project.name : "Not project to delete";
    return (
      <Modal isOpen={this.state.isOpen} >
        <ModalHeader >Project deleting</ModalHeader>
        <ServerError error={this.state.serverError}/>
        <ModalBody>
          {projectName}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.onSubmit}>Delete</Button>
          <Button color="secondary" onClick={this.onCancel}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

