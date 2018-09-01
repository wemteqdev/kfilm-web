import React from 'react';
import './sidebar.scss'
import SpecificVideo from './specificVideo';
import Tags from './tags';

const Sidebar = () => {

    const videoTypes = [
        {
            slug:'hot',
            title:'Hot',
            icon:'burn'
        },
        {
            slug:'popular',
            title:'Popular',
            icon:'thumbs-up'
        },
        {
            slug:'trending',
            title:'Trending',
            icon:'signature'
        },
    ]

    const showAllVideoTypes = () => {
        return videoTypes.map((item, i) => {
            return (
                <div key={i} className="col-12 px-0">
                    <SpecificVideo info={item}/>
                </div>
            )
        })
    }
    return ( 
        <aside className="sidebar">
            <div className="row">
                { showAllVideoTypes() }
                <div className="col-12 px-0">
                    <Tags/>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
