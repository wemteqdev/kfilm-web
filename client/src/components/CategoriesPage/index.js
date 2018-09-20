import React, { Component } from 'react';
import axios from 'axios';
import VideoList from '../widgets/VideoList';
import serverURL from '../../variables';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

declare var xs;
declare var sm;
declare var md;
declare var lg;
declare var xl;

class CategoriesPage extends Component {
    
    state = {
        videos: [],
        category: {},
        genre: '',
        pageCount: 1,
        pageNum: 0,
    }

    initVideos = () => {
        this.setState({
            videos: [],
            pageCount: 1,
            pageNum: 0,
        })
    }

    componentWillMount(){
        this.loadVideos(this.props)
    }

    loadVideos(props) {
        this.initVideos();

        axios.get(`${serverURL}/api/categories/${props.match.params.slug}`)
        .then( response => {
            this.setState({category:response.data.data});
        })
        let search = props.location.search || '?';
        let url = `${serverURL}/api/categories/${props.match.params.slug}/videos${search}`;
        axios.get(url)
        .then( response => {
            
            this.setState({
                videos: response.data.data,
                pageNum: response.data.meta.current_page-1,
                pageCount: response.data.meta.last_page,
            });
            window.scrollTo(0, 0)
        })
    }

    componentWillReceiveProps(nextProps) {
        this.loadVideos(nextProps)
    }

    handlePageClick = (data) => {
        this.setState({
            pageNum: data.selected
        })
        let search = '?page=' + (data.selected+1);
        this.props.history.push(this.props.match.params.slug + search);
    };

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

    onTagClick = (event, genre) => {
        this.setState({
            genre: genre
        })
    }

    displayTags = () => {
        if (this.state.category.genres !== undefined) {
            return this.state.category.genres.map( (genre, index) => {
                return (
                    <a key={index} className={`px-3 mx-2 ${genre === this.state.genre && 'text-danger' }`}
                        onClick={(event)=>this.onTagClick(event, genre)}
                    >{genre}</a>
                )
            })
        }
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
                <div className="genres d-flex justify-content-center mb-4">
                    {/* {this.displayTags()} */}
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col section-header">
                            <h1 className="title">{this.state.category.name}</h1>
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