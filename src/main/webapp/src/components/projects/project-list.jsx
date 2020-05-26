import React from 'react';
import ProjectCard from './project-card'
import { Row, Container, Col } from 'reactstrap';


const ProjectList = ({ projects }) => {

    const projectsCards = projects.map((project) => {
            return (<Col xs="4">
                <ProjectCard {...project} />
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

export default ProjectList