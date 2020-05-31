import React, { useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ServerError from '../error/server-error'
import {deleteTask} from '../../services/task-service'
import { withRouter } from 'react-router-dom';



const TaskDeleteDialog = ({isOpen, task, callback}) => {

  const [serverError, setServerError] = useState('')

const onSubmit = (e) => {
  e.preventDefault();
  deleteTask(task)
  .then(data => {
    if (typeof callback === "function"){
        callback(task, true)
    }
  })
  .catch(e => setServerError(e))
}

const onCancel = (e) => {
  e.preventDefault();
  if (typeof callback === "function"){
    callback(task, false)
  }
}



  const taskname = task ? task.name : "Not project to delete";
  return (
    <Modal isOpen={isOpen} >
      <ModalHeader >Project deleting</ModalHeader>
      <ServerError error={serverError}/>
      <ModalBody>
        {taskname}
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={onSubmit}>Delete</Button>
        <Button color="secondary" onClick={onCancel}>Cancel</Button>
      </ModalFooter>
    </Modal>
  )

}

export default withRouter(TaskDeleteDialog)


