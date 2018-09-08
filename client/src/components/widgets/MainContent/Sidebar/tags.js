import React, { Component } from 'react';
import axios from 'axios';
import serverURL from '../../variables';

export default class Tags extends Component {
    

    state = {
        tags:[],
    }

    componentWillMount(){
        axios.get(`${serverURL}/api/tags`)
        .then( response => {
            this.setState({tags:response.data.data});
        })
    }
    render() {
        return (
        <div className="widgetBox">
            <div className="widgetTitle">
                <h5>Tags</h5>
            </div>
            <div className="tagcloud">
                { 
                    this.state.tags.map((item, i) => {
                        return (
                            <a key={i}>{item.name}</a>
                        )
                    })
                }
            </div>
        </div>
        );
    }
}

