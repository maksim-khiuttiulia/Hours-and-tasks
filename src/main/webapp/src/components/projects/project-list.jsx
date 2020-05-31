import React from 'react';
import ProjectCard from './project-card'
import {withRouter} from 'react-router-dom'
import { Row, Container, Col } from 'reactstrap';


const ProjectList = ({ projects }) => {

    const projectsCards = projects.map((project) => {
            return (<Col key={project.projectId} xs="4" className="mb-4">
                <ProjectCard project={project} />
            </Col>)
        })
    
    
    return (
        <Container>
            <Row>
                {projectsCards}
            </Row>
        </Container>
    )
}

export default withRouter(ProjectList)