import React, { Component } from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default class PaginationComponent extends Component {

    constructor(props) {
        super(props)

        let countPerPage = this.props.countPerPage == null ? 5 : this.props.countPerPage
        let totalCount = this.props.totalCount == null ? 1 : this.props.totalCount
        let currentPage = this.props.currentPage == null ? 1 : this.props.currentPage
        let pageCount = Math.ceil(totalCount / countPerPage)

        this.state = {
            countPerPage: countPerPage,
            totalCount: totalCount,
            currentPage: currentPage,
            pageCount: pageCount
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
          console.log('pokemons state has changed.')
        }
      }
      

    renderPagesNumbers() {
        let pagesNumbers = []
        for (let i = 1; i <= this.state.pageCount; i++) {
            pagesNumbers.push(i);
        }
        console.log("ACTIAL PAGE", this.state.currentPage)

        let numbers = pagesNumbers.map(number => {
            return (
                <PaginationItem className={this.state.currentPage === number ? "active" : ""} key={number}>
                    <PaginationLink active="true" href="#" className="active" key={number} value={number} onClick={() => this.onClick(number)}>{number}</PaginationLink>
                </PaginationItem>
            )
        })

        return numbers
    }

    onFirstClick = (e) => {
        this.setState({
            currentPage: 1
        })
        this.callback(1)
    }

    onLastClick = (e) => {
        this.setState({
            currentPage: this.state.totalCount
        })
        this.callback(this.state.pageCount)
    }

    onClick = (value) => {
        this.setState({
            currentPage: value
        })
        this.callback(value)
    }

    callback = (page) => {
        if (typeof this.props.onSelected == "function") {
            this.props.onSelected(page)
        }
    }

    render() {
        return (
            <Pagination>
                <PaginationItem>
                    <PaginationLink first href="#" onClick={this.onFirstClick}/>
                </PaginationItem>

                {this.renderPagesNumbers()}

                <PaginationItem>
                    <PaginationLink last href="#" onClick={this.onLastClick}/>
                </PaginationItem>
            </Pagination>
        )


    }

}