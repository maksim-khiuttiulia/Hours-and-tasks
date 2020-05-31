import React, { Component, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ServerError from '../error/server-error'
import {deleteProject} from '../../services/project-service'
import { withRouter } from 'react-router-dom';



const ProjectDeleteDialog = ({isOpen, project, callback}) => {

    const [serverError, setServerError] = useState('')

  const onSubmit = (e) => {
    e.preventDefault();
    deleteProject(project.projectId)
    .then(data => {
      if (typeof callback === "function"){
          callback(project, true)
      }
    })
    .catch(e => setServerError(e))
  }

  const onCancel = (e) => {
    e.preventDefault();
    if (typeof callback === "function"){
      callback(project, false)
    }
  }



    const projectName = project ? project.name : "Not project to delete";
    return (
      <Modal isOpen={isOpen} >
        <ModalHeader >Project deleting</ModalHeader>
        <ServerError error={serverError}/>
        <ModalBody>
          {projectName}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={onSubmit}>Delete</Button>
          <Button color="secondary" onClick={onCancel}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  
}

export default withRouter(ProjectDeleteDialog)

