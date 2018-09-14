import React, { Component } from 'react';
import axios from 'axios';
import Video from '../widgets/Video';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import serverURL from '../../variables';
declare var $;

class VideoPage extends Component {
    
    state = {
        video : {},
        like: false
    }

    constructor(props) {
        super(props)
        this.addHistory = this.addHistory.bind(this)
        this.toggleLike = this.toggleLike.bind(this)
    }

    toggleLike() {
        let like = !this.state.like
        this.setState({like: like})
        if (like) {
            axios.post(`${serverURL}/api/user/videos/${this.state.video.slug}/like`)
            .then( response => {
            })    
        }
        else {
            axios.delete(`${serverURL}/api/user/videos/${this.state.video.slug}/unlike`)
            .then( response => {
            })
        }
    }
    addHistory() {
        axios.post(`${serverURL}/api/user/videos/${this.state.video.slug}/add_history`)
        .then( response => {
        })
    }

    loadVideo(props, history) {
        let url = `${serverURL}/api/`
        if (props.login.user !== null && props.login.user !== undefined){
            url = url + "user/"
        }
        url = url + `videos/${props.match.params.slug}`
        axios.get(url)
        .then( response => {
            if (response.data.data.embed === null){
                this.setState({video:response.data.data})
            }
            else {
                this.setState({video:response.data.data})
            }
            if (props.login.user !== null && props.login.user !== undefined){
                this.setState({ like:response.data.data.is_favorited});
                $("body").removeClass('all-loading')
                if (history) {
                    setTimeout(
                        this.addHistory,
                        this.state.video.duration / 2
                    );
                }
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        this.loadVideo(nextProps, true)

    }

    componentWillMount = () => {
        this.loadVideo(this.props, false)
    }
    
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    render (){
        return (
            <div>
                <Video {...this.state} {...this.props} slug={this.props.match.params.slug} type={ this.props.login.user !== undefined ? "pro" : "free" }/>
            </div>
            
        );
    }
};

const mapStateToProps = (state) => {
    return {
      login: state.login
    }
}

  
export default withRouter( connect(mapStateToProps, null)(VideoPage));