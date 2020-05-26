import React from 'react';
import { Redirect, withRouter } from "react-router-dom";
import { Col, Card, CardHeader, CardBody, Row, ListGroup, ListGroupItem, Badge } from 'reactstrap';
import TaskDeadLineLabel from '../tasks/task-deadline'




const ProjectCard = ({ project, history }) => {


    const { projectId, name } = project

    let tasksCount = 0;
    let todoTasksCount = 0;
    let doneTasksCount = 0;
    let nearestDeadline = null;

    project.tasks.forEach(task => {
        tasksCount++;
        if (task.done === true){
            doneTasksCount++;
        } else {
            todoTasksCount++;
        }
        if (task.deadline != null){
            let deadline = new Date(task.deadline)
            if (nearestDeadline == null){
                nearestDeadline = deadline;
            } else {
                if (nearestDeadline > deadline){
                    nearestDeadline = deadline;
                }
            }
        }
    });


    const onOpenProject = () => {
        console.warn("Open project: ", projectId)
    }

    return (
        <Card onClick={onOpenProject} style={{cursor : "pointer"}}>
            <CardHeader className="bg-success text-white pb-5">
                <h3>{name}</h3>
            </CardHeader>
            <CardBody>
                <Row className="text-center">
                    <Col md="4">
                        <h6>All tasks</h6>
                        <span>{tasksCount}</span>
                    </Col>
                    <Col md="4">
                        <h6>In work</h6>
                        <span>{todoTasksCount}</span>
                    </Col>
                    <Col md="4">
                        <h6>Done</h6>
                        <span>{doneTasksCount}</span>
                    </Col>
                </Row>
                <ListGroup flush className="border-top">
                    <ListGroupItem>
                        Nearest deadline: <TaskDeadLineLabel deadline={nearestDeadline} />
                    </ListGroupItem>
                    <ListGroupItem>
                        Time spent: <Badge color="warning">Coming soon</Badge>
                    </ListGroupItem>
                    <ListGroupItem>
                        Money earned: <Badge color="warning">Coming soon</Badge>
                    </ListGroupItem>
                </ListGroup>
            </CardBody>
        </Card>
    )
}

export default withRouter(ProjectCard);