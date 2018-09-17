import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleSearchAction } from '../../actions';
import { Modal, ModalHeader, ModalBody, Input, Card, CardImg, CardBody, CardSubtitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import serverURL from '../../variables';
import {isMobile} from 'react-device-detect';

import { isValid } from '../../functions';

class SearchPage extends Component {

    constructor(props) {
        super(props);
    
        this.focusRef = React.createRef();
    }

    state = {
        keyword: '',
        videos:[]
    }
      
    handleChange = (event) => {
        this.setState({keyword: event.target.value});
    }

    keyPress = (e) => {
        if (e.keyCode === 13){
           this.search()
        }
    }

    componentWillReceiveProps = () => {
        this.setState({videos: []});
        this.setState({keyword: ''});
    }

    search = () => {
        if (this.state.keyword.length >= 0)
        {
            axios.get(`${serverURL}/api/videos?q=${this.state.keyword}`)
            .then( response => {
                this.setState({videos:response.data.data});
            })
        }
    }

    showVideos = () => {
        return this.state.videos.map( (item, i) => {
            return (
                <div key={i} className="col-md-3 col-sm-6 col-12">
                    <Card className="video-card">
                        <CardImg top width="100%" src={ item.featured_image_url } alt="Card image cap" />
                        <Link to={'/videos/' + item.slug} className='hover-posts' onClick={this.props.toggleSearch}>
                            <span><FontAwesomeIcon icon='play'/>Watch Video</span>
                        </Link>
                        <CardBody>
                            <CardSubtitle>{ item.name }</CardSubtitle>
                        </CardBody>
                    </Card>
                </div>
            )
        } )
    }

    render() {
        let marginLeft = 0;
        if (isMobile || isValid(this.props.login.user)) {
            marginLeft = 3.2
        }
        if (this.props.sidebar.toggleSidebar){
            marginLeft = 18
        }
        return (
            <div id="search">
                <Modal  isOpen={this.props.search.toggleSearch} 
                        toggle={this.props.toggleSearch} 
                        className="search-dialog"
                        autoFocus={false}
                        style={{marginLeft: `${marginLeft}rem`}}
                >
                    <ModalHeader>
                        <a color="primary" className="float-right" onClick={this.props.toggleSearch}> <FontAwesomeIcon icon='times'/> </a>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <Input type="text" value={this.state.keyword} placeholder="Search videos ..." 
                                        onChange={this.handleChange} onKeyDown={this.keyPress}
                                        autoFocus={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div className="container">
                            <div className="row">
                                { this.showVideos() }
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
        search: state.search,
        login: state.login,
        sidebar: state.sidebar,
  }
}

const mapDispatchToProps = dispatch => ({
  toggleSearch: () => dispatch(toggleSearchAction()),
})

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(SearchPage) );