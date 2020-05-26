import React from 'react';
import { Redirect, withRouter } from "react-router-dom";
import { Col, Card, CardHeader, CardBody, Row, ListGroup, ListGroupItem, Badge } from 'reactstrap';
import TaskDeadLineLabel from '../tasks/task-deadline'




const ProjectCard = ({ projectId, projectName, tasksCount, doneTasksCount,
    todoTasksCount, deadlineTaskName, deadlineTaskDeadline, spentTime, moneyEarned, history }) => {

    const onOpenProject = () => {
        console.warn("Open project: ", projectId)
    }

    return (
        <Card onClick>
            <CardHeader className="bg-success text-white pb-5">
                {projectName}
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
                <ListGroup flush="true" className="border-top">
                    <ListGroupItem>
                        Priority task: {deadlineTaskName} <TaskDeadLineLabel deadline={deadlineTaskDeadline} />
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