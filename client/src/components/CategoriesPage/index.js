import React, { Component } from 'react';
import axios from 'axios';
import VideoList from '../widgets/VideoList';
import serverURL from '../../variables';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import URL from 'url-parse';
import querystring from 'querystring';

declare var xs;
declare var sm;
declare var md;
declare var lg;
declare var xl;


class CategoriesPage extends Component {
    
    state = {
        videos: [],
        category: {},
        extra: {
            genres: null,
            view: 'popular',
        },
        pageCount: 1,
        pageNum: 0,
    }

    initVideos = (props) => {
        var url = new URL(props.location.pathname + props.location.search);
        let search = querystring.parse(url.query.replace('?', ''));
        this.setState({
            videos: [],
            extra: {
                genres: search.genres,
                view: search.view || 'popular',
            },
            pageCount: 1,
            pageNum: 0,
        })
    }

    loadVideos(props) {
        this.initVideos(props);

        axios.get(`${serverURL}/api/categories/${props.match.params.slug}/videos${props.location.search}`)
        .then( response => {
            this.setState({
                videos: response.data.data,
                pageNum: response.data.meta.current_page-1,
                pageCount: response.data.meta.last_page,
            });
            window.scrollTo(0, 0)
        })
    }

    componentWillMount(){
        axios.get(`${serverURL}/api/categories/${this.props.match.params.slug}`)
        .then( response => {
            this.setState({category:response.data.data});
        })
        this.loadVideos(this.props)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            axios.get(`${serverURL}/api/categories/${nextProps.match.params.slug}`)
            .then( response => {
                this.setState({category:response.data.data});
            })
            this.loadVideos(nextProps)
        }
    }

    displayPaginate = () => {
        if (this.state.pageCount > 1) {
            return (
                <ReactPaginate 
                    pageCount={this.state.pageCount}
                    onPageChange={this.handlePageClick}
                    forcePage={this.state.pageNum}
                    disableInitialCallback={true}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    previousLabel={<FontAwesomeIcon icon="caret-left" />}
                    previousClassName={"mx-2 p-2"}
                    previousLinkClassName={"text-white"}
                    nextLabel={<FontAwesomeIcon icon="caret-right" />}
                    nextClassName={"mx-2 p-2"}
                    nextLinkClassName={"text-white"}
                    breakLabel={<a href="">...</a>}
                    breakClassName={"mx-5"}
                    activeClassName={"active"}
                    pageClassName={"mx-2"}
                    pageLinkClassName={"btn btn-secondary text-white p-2"}
                />
            )
        } else {
            return <div></div>
        }
    }

    updateSearchParams = (newParams) => {
        var url = new URL(this.props.location.pathname + this.props.location.search);
        let search = Object.assign({}, querystring.parse(url.query.replace('?', '')), newParams);
        url.set('query', querystring.stringify(search));
        this.props.history.push(url.href.replace(url.origin, ''))
    }

    handlePageClick = (data) => {
        this.setState({
            pageNum: data.selected
        })
        this.updateSearchParams({page: data.selected + 1});
    };

    onTagClick = (event, genres) => {
        if (genres === this.state.extra.genres) {
            genres = null;
        }
        this.updateSearchParams({genres: genres, page: 1});
    }

    displayTags = () => {
        if (this.state.category.genres !== undefined) {
            return this.state.category.genres.map( (genres, index) => {
                let ge = genres.replace(/-/g, " ")
                return (
                    <a key={index} className={`px-1 mx-3 float-left active-${genres === this.state.extra.genres}`}
                        onClick={(event)=>this.onTagClick(event, genres)}
                    >{ge}</a>
                )
            })
        }
    }

    onViewClick = (event, view) => {
        this.updateSearchParams({view: view, page: 1});
    }

    displayViews = () => {
        let views = [
            'hot',
            'popular',
            'trending',
            'recent',
        ]
        return views.map( (view, index) => {
            return (
                <a key={index} className={`mx-3 active-${view === this.state.extra.view}`}
                    onClick={(event)=>this.onViewClick(event, view)}
                >{view}</a>
            )
        })
}

    render() {
        let size = 6;
        if (lg || xl) {
            if (this.props.match.params.slug === "festival") {
                size = 6;
            } else {
                size = 3;
            }
        }

        return (
            <div className="page-padding">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col w-100 genres">
                            {this.displayTags()}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col section-header category-header">
                            <h1 className="title">{this.state.category.name}</h1>
                        </div>
                        <div className="col-md-12 col-lg-6">
                            <div className="w-100 views d-flex align-items-end justify-content-lg-end">
                                {this.displayViews()}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <VideoList videos={this.state.videos} size={size}/>
                    </div>
                    <div className="row my-3 d-flex justify-content-center">
                        {this.displayPaginate()}
                    </div>
                </div>
            </div>
        )
    }
};

export default CategoriesPage;