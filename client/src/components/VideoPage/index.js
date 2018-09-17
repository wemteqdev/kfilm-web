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

    toggleLike = () => {
        let like = !this.state.like;
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
    addHistory = () => {
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
            this.setState({video:response.data.data})

            window.scrollTo(0, 0)

            if (props.login.user !== null && props.login.user !== undefined){
                this.setState({ like:response.data.data.is_favorited});
                if (history) {
                    setTimeout(
                        this.addHistory,
                        this.state.video.duration * 1000 / 2
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
                <Video toggleLike={this.toggleLike} {...this.state} {...this.props} slug={this.props.match.params.slug} type={ this.props.login.user !== undefined ? "pro" : "free" }/>
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