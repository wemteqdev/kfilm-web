import React, { Component } from 'react';
import MediaObject from './media-object';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import serverURL from '../../variables';

class  SpecificVideo extends Component {

    state = {
        videos:[],
        slug:'',
        title:'',
        icon:''
    }

    constructor(props) {
        super(props)
        this.state.slug = this.props.info.slug;
        this.state.title = this.props.info.title;
        this.state.icon = this.props.info.icon;
    }

    componentWillMount(){
        axios.get(`${serverURL}/api/videos?view=${this.state.slug}&limit=1`)
        .then( response => {
            this.setState({videos:response.data.data});
        })
    }

    show() {
        return this.state.videos.map( (item, i) => {
            return (
                <MediaObject key={i} video={item}/>
            )
        })
    }

    render() {
        return (
            <div className="widgetBox">
                <div className="widgetTitle">
                <h5 className='borderBottom'>
                    <FontAwesomeIcon icon={this.state.icon}/> 
                    {this.state.title}
                </h5>
                </div>
                <div className="widgetContent">
                    { this.show() }
                </div>
            </div>
        )
    }
}

export default SpecificVideo;
