import React, { Component } from 'react';
import ServerError from '../error/server-error'
import ProjectList from './project-list'
import { Row, Container, Alert } from 'reactstrap';
import { getAllProjects } from '../../services/project-service'
import { Spinner } from 'reactstrap';
import SortBy from '../sort-by/sort-by';
import PaginationComponent from '../pagination/pagination-component';


export default class ProjectsPage extends Component {

    sortByParams = [
        {key : "name" , value : "By name"},
        {key : "taskCount" , value : "By tasks count"},
        {key : "deadline" , value : "By deadline"},
    ]

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            projects: [],

            serverError: '',

            sortBy: null,
            orderBy: null,
            activePage: 1,
            totalPages: null,
            itemsCountPerPage: 9,
            totalItemsCount: 0
        }
    }

    async componentDidMount() {
        const {pageNumber, sortBy, orderBy} = this.state
        this.readProjects(pageNumber, sortBy, orderBy);
    }

    readProjects(pageNumber, sortBy, orderBy) {
        this.setState({
            loading: true
        })

        const { itemsCountPerPage, totalPages } = this.state
        let page = (pageNumber > 0 && pageNumber !== null) ? pageNumber - 1 : 0
        page = page + 1 > totalPages ? totalPages : page

        getAllProjects().then(response => {
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

    render() {
        const { loading, sortBy, orderBy, serverError, totalItemsCount } = this.state
        if (loading) {
            return (<Container className="m-auto text-center">
                <Spinner />
            </Container>)
        }

        if(totalItemsCount == 0 || totalItemsCount == null){
            return(
            <Alert color="primary" style={{ textAlign : "center"}}>
                You havent any project
          </Alert>)
        }

        return (
            <Container>
                <ServerError error={serverError} />
                <Row className="d-flex justify-content-end">
                    <SortBy params={this.sortByParams} selected={sortBy} orderBy={orderBy} onSelect={this.onSelectSortBy} />
                </Row>
                <Row>

                </Row>
                <Row className="d-flex justify-content-center">
                    <PaginationComponent/>
                </Row>
            </Container>
        )
    }

}