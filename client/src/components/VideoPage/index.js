import React, { Component } from 'react';
import axios from 'axios';
import Video from '../widgets/Video';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import serverURL from '../../variables';
import { isValid } from '../../functions';

class VideoPage extends Component {
    
    state = {
        video : null,
        like: null, 
    }

    toggleLike = () => {
        let like = !this.state.like;
        if (like) {
            axios.post(`${serverURL}/api/user/videos/${this.state.video.slug}/like`)
            .then( response => {
                this.setState({like: like})
            })
        }
        else {
            axios.delete(`${serverURL}/api/user/videos/${this.state.video.slug}/unlike`)
            .then( response => {
                this.setState({like: like})
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
        if (isValid(props.login.user)){
            url = url + "user/"
        }
        url = url + `videos/${props.match.params.slug}`
        axios.get(url)
        .then( response => {
            this.setState({
                video: response.data.data,
                like: response.data.data.is_favorited,
            })

            window.scrollTo(0, 0)

            if (isValid(props.login.user)){
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
        if (this.props !== nextProps) {
            this.loadVideo(nextProps, true)
            window.scrollTo(0, 0)
        }
    }

    componentWillMount() {
        this.loadVideo(this.props, true)
        window.scrollTo(0, 0)
    }

    render (){
        return (
            <div>
                <Video toggleLike={this.toggleLike} {...this.state} type={ isValid(this.props.login.user) ? "pro" : "free" }/>
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