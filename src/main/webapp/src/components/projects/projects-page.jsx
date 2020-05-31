import React, { Component } from 'react';
import ServerError from '../error/server-error'
import ProjectList from './project-list'
import { Row, Container, Alert, Button } from 'reactstrap';
import { getAllProjects } from '../../services/project-service'
import { Spinner } from 'reactstrap';
import PaginationComponent from '../pagination/pagination-component';
import ProjectAddDialog from '../forms/project-add-form';



export default class ProjectsPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            projects: [],

            serverError: '',
            addProjectDialogOpen : false,

            activePage: 1,
            totalPages: null,
            itemsCountPerPage: 9,
            totalItemsCount: 0
        }
    }

    async componentDidMount() {
        const {pageNumber} = this.state
        this.readProjects(pageNumber);
    }

    readProjects(pageNumber) {
        this.setState({
            loading: true
        })

        const { itemsCountPerPage, totalPages } = this.state
        let page = (pageNumber > 0 && pageNumber !== null) ? pageNumber - 1 : 0
        page = page + 1 > totalPages ? totalPages : page

        getAllProjects().then(response => {
            this.setStateAfterLoadProjects(response, page, itemsCountPerPage)
        }).catch(e => {
            this.setState({
                loading: false,
                serverError: e,
                projects: []
            })
        })
    }

    setStateAfterLoadProjects = (response) => {
        const totalPages = response.totalPages;
        const itemsCountPerPage = response.size;
        const totalItemsCount = response.totalElements;
        const projects = Array.isArray(response.content) ? response.content : []

        this.setState({
            totalPages: totalPages,
            totalItemsCount: totalItemsCount,
            itemsCountPerPage: itemsCountPerPage,
            projects: projects,
            loading: false
        })
    }

    onAddDialogOpen = () => {
        this.setState({addProjectDialogOpen : true})
    }

    onAddDialogClose = (project, needRefresh) => {
        if (needRefresh === true){
            const {pageNumber} = this.state
            this.readProjects(pageNumber);
        }
        this.setState({addProjectDialogOpen : false})
    }

    render() {
        const { loading, serverError, totalItemsCount, projects, addProjectDialogOpen } = this.state
        if (loading) {
            return (<Container className="m-auto text-center">
                <Spinner />
            </Container>)
        }

        if(totalItemsCount === 0 || totalItemsCount == null){
            return(
            <Alert color="primary" style={{ textAlign : "center"}}>
                You havent any project
          </Alert>)
        }

        return (
            <Container>
                <ServerError error={serverError} />
                <ProjectAddDialog isOpen={addProjectDialogOpen} callback={this.onAddDialogClose}/>
                <Row className="mt-4 d-flex justify-content-end" >
                    <Button color="success" onClick={this.onAddDialogOpen}>Add project</Button>
                </Row>
                <Row className="mt-4">
                    <ProjectList projects={projects}/>
                </Row>
                <Row className="d-flex justify-content-center mt-4">
                    <PaginationComponent/>
                </Row>
            </Container>
        )
    }

}