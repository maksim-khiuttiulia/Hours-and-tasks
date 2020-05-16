import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



export default class TaskDeleteDialog extends Component {


  constructor(props) {
    super(props)
    this.state = {
      isOpen: props.isOpen,
      task: props.task
    }
  }


  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState(prevState => ({
        isOpen: this.props.isOpen,
        task: this.props.task
      }))
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.deleteDialogCallback(this.state.task, true)
    this.setState({
      isOpen : false,
      task : undefined
    })
  }

  onCancel = (e) => {
    e.preventDefault();
    this.props.deleteDialogCallback(this.state.task, false)
    this.setState({
      isOpen : false,
      task : undefined
    })
  }



  render() {
    const taskName = this.state.task ? this.state.task.name : "Not task to delete";
    return (
      <Modal isOpen={this.state.isOpen} >
        <ModalHeader >Task deleting</ModalHeader>
        <ModalBody>
          {taskName}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.onSubmit}>Delete</Button>
          <Button color="secondary" onClick={this.onCancel}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

