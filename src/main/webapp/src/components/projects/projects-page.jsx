import React, { Component } from 'react';
import ServerError from '../error/server-error'
import ProjectList from './project-list'
import { Row, Container, Alert, Button } from 'reactstrap';
import { getAllProjects } from '../../services/project-service'
import { Spinner } from 'reactstrap';
import PaginationComponent from '../pagination/pagination-component';
import ProjectAddDialog from '../forms/project-add-form';
import SortBy from '../sort-by/sort-by';



export default class ProjectsPage extends Component {

    sortByParams = [
        { key: "name", value: "By name" },
    ]

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            projects: [],

            serverError: '',
            addProjectDialogOpen: false,

            activePage: 1,
            totalPages: null,
            itemsCountPerPage: 6,
            totalItemsCount: 0,
            sortBy: null,
            orderBy: null,
        }
    }

    async componentDidMount() {
        const { pageNumber } = this.state
        this.readProjects(pageNumber);
    }

    readProjects(pageNumber, sortBy, orderBy) {
        this.setState({
            loading: true
        })

        const { itemsCountPerPage, totalPages } = this.state
        let page = (pageNumber > 0 && pageNumber !== null) ? pageNumber - 1 : 0
        page = page + 1 > totalPages ? totalPages : page

        getAllProjects(page, itemsCountPerPage, sortBy, orderBy).then(response => {
            this.setStateAfterLoadProjects(response)
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
        this.setState({ addProjectDialogOpen: true })
    }

    onAddDialogClose = (project, needRefresh) => {
        if (needRefresh === true) {
            const { pageNumber } = this.state
            this.readProjects(pageNumber);
        }
        this.setState({ addProjectDialogOpen: false })
    }

    onSelectSortBy = (key, orderBy) => {
        const { activePage } = this.state
        this.setState({
            sortBy: key,
            orderBy: orderBy
        })
        this.readProjects(activePage, key, orderBy);
    }

    onSelectPage = (page) => {
        const { activePage, sortBy, orderBy } = this.state
        if (activePage !== page) {
            this.setState({
                activePage: page
            })
            this.readProjects(page, sortBy, orderBy);
        }
    }


    render() {
        const { loading, serverError, totalItemsCount, projects, addProjectDialogOpen, itemsCountPerPage, activePage, sortBy, orderBy } = this.state

        let spinner = ''
        if (loading) {
            spinner =   <Container className="m-auto text-center">
                            <Spinner />
                        </Container>
        }

        if ((totalItemsCount === 0 || totalItemsCount == null) && loading === false) {
            return (
                <Container>
                    <ServerError error={serverError} />
                    <ProjectAddDialog isOpen={addProjectDialogOpen} callback={this.onAddDialogClose} />
                    <Row className="mt-4 d-flex justify-content-end" >
                        <Button color="success" onClick={this.onAddDialogOpen}>Add project</Button>
                    </Row>
                    <Row className="mt-4 d-flex justify-content-end" >

                    </Row>
                    <Alert color="primary" style={{ textAlign: "center" }}>
                        You havent any project
                    </Alert>
                </Container>
            )

        }

        return (
            <Container>
                <ServerError error={serverError} />
                <ProjectAddDialog isOpen={addProjectDialogOpen} callback={this.onAddDialogClose} />
                <Row className="mt-4 d-flex justify-content-end" >
                    <SortBy params={this.sortByParams} selected={sortBy} orderBy={orderBy} onSelect={this.onSelectSortBy} ></SortBy>
                    <Button color="success" onClick={this.onAddDialogOpen}>Add project</Button>
                </Row>
                {spinner}
                <Row className="mt-4">
                    <ProjectList projects={projects} />
                </Row>
                <Row className="d-flex justify-content-center mt-4">
                    <PaginationComponent currentPage={activePage} countPerPage={itemsCountPerPage} totalCount={totalItemsCount} onSelected={this.onSelectPage} />
                </Row>
            </Container>
        )
    }

}