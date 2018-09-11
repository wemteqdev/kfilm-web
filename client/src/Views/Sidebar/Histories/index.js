import React, { Component } from 'react'
import { Media } from 'reactstrap';
import axios from 'axios';
import serverURL from '../../../variables';

export default class Histories extends Component {

    state = {
        histories:[]
    }
    componentWillMount = () => {
        axios.get(`${serverURL}/api/user/histories`)
        .then( response => {
            if (response.data.data.length > 0){
                this.setState({histories :response.data.data})
            }
        })
    }
    
    showHistories = () => {
        return this.state.histories.map((item, i) => {
            return (
                <Media key={i} className="history-media">
                    <Media left top href={`/videos/${item.video.slug}`} >
                        <Media className="history-image" object  src={item.video.featured_image_url} alt="Generic placeholder image" />
                    </Media>
                    <Media body>
                    <Media heading>
                        {item.video.name}
                    </Media>
                        {item.created_at}
                    </Media>
                </Media>
            )
        })
    }

  render() {
    return (
        <div id="history-page">
            <div className="container">
                <div className="row">
                    <div className="section-header text-center">
                        <h1 className="title">Histories</h1>
                    </div>
                </div>
                { this.showHistories() }
            </div>
        </div>
    )
  }
}
