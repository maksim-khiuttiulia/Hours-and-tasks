import React from 'react'
import { Modal, ModalBody, ModalFooter, Button, Row, Col, Container } from 'reactstrap'
import TaskLabel from './task-label'
import { formatedDate } from '../../utils/date-time'

const TaskFull = ({ task, isOpen, onClose, onDelete, onEdit }) => {


    const onModalClose = (e) => {
        if (typeof onClose === "function") {
            onClose()
        }
    }

    const onTaskDelete = (e) => {
        if (typeof onDelete === "function") {
            onDelete()
        }
    }

    const onTaskEdit = (e) => {
        if (typeof onEdit === "function") {
            onEdit()
        }
    }

    const labels = task.labels.map(label => {
        return <TaskLabel label={label} key={label.id} />;
    })

    return (
        <Modal isOpen={isOpen} size="xs">
            <ModalBody>
                <Container>
                    <br/>
                <Row>
                    <Col xs="12" md="12">
                        <h5>Name: {task.name}</h5>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <h6>Description: {task.description}</h6>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <h6>Project: {task.project.name}</h6>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col xs="6">
                        <h6>Created: {formatedDate(task.created)}</h6>
                    </Col>
                </Row>
                <Row>
                    <Col xs="6">
                        <h6>Deadline: {task.deadline ? formatedDate(task.deadline) : "No deadline"}</h6>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" md="12">
                        <h6>Labels:</h6>{labels}
                    </Col>
                </Row>
                </Container>
                

            </ModalBody>
            <ModalFooter>
                <Button color="danger" style={{ minWidth: 50 }} onClick={onTaskEdit}>Edit</Button>
                <Button color="danger" style={{ minWidth: 50 }} onClick={onTaskDelete}>Delete</Button>
                <Button color="secondary" style={{ minWidth: 50 }} onClick={onModalClose} >Close</Button>
            </ModalFooter>
        </Modal>
    )
}
export default TaskFull