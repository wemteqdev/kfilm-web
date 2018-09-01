import React from 'react';
import Sidebar from './Sidebar/index';
import VideoContent from './VideoContent/index';

const MainContent = () => {
    return ( 
        <section id="mainContent" className='container'>
            <div className="row">
                <div className="col-4 bgWhite">
                    <Sidebar/>
                </div>
                <div className="col-8 bgWhite">
                    <VideoContent/>
                </div>  
            </div>
        </section>
    );
}

export default MainContent;
