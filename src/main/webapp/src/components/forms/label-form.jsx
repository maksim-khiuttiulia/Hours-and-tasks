import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Input } from 'reactstrap';
import ServerError from '../error/server-error'
import UserError from '../error/user-error'
import { getLabelColors, addLabelToProject } from '../../services/label-service'


const AddLabelForm = ({ projectId, isOpen, callback }) => {
    const [serverError, setServerError] = useState('')
    const [userError, setUserError] = useState('')

    const [colors, setColors] = useState([])
    const [color, setColor] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {
        if (colors.length === 0) {
            getColors()
        }
    }, [])

    const onSubmit = (e) => {
        if (!name){
            setUserError("Name is empty")
            return
        }
        if (!color){
            setUserError("Color not selected")
            return
        }
        let label = {
            name : name,
            color : color
        }
        addLabelToProject(projectId, label).then(data => {
            if (typeof callback === "function"){
                callback(data, true)
            }
        }).catch(e => setServerError(e))
    }

    const onCancel = (e) => {
        if (typeof callback === "function"){
            callback(null, false)
        }
    }

    const onNameChange = (e) => {
        setName(e.target.value)
        setUserError('')
    }

    const selectColor = (e) => {
        setColor(e.target.value)
    }

    const getColors = async () => {
        let colors = await getLabelColors();
        setColors(colors)
        setColor(colors[0].hex)
    }

    const renderColors = () => {
        let elements = colors.map(c => {
            return <Button key={c.hex} value={c.hex} onClick={selectColor} className="form-check-label" style={{ backgroundColor: c.hex, width: 38 + 'px', height: 38 + 'px' }}></Button>
        })
        return elements
    }


    return (
        <Modal isOpen={isOpen} >
            <ModalHeader >Add new label</ModalHeader>
            <UserError error={userError}/>
            <ServerError error={serverError} />
            <ModalBody>
                <Row>
                    <Input type="text" placeholder="Label name" onChange={onNameChange} required />
                </Row>
                <br />
                <Row>
                    <Col xs="5">Color: <Button className="form-check-label" style={{ backgroundColor: color, width: 38 + 'px', height: 38 + 'px' }}></Button>
                    </Col>
                    <Col xs="7">
                    {renderColors()}
                    </Col>
                </Row>


            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={onSubmit}>Save</Button>
                <Button color="secondary" onClick={onCancel}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )

}

export default AddLabelForm

