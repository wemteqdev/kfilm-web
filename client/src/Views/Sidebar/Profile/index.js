import React from 'react';
import Password from './password';

const Profile = (props) => {

    const showResult = (result) => {
    }
    return (
        <div className="loginPage container page-padding">
            <div className="row">
                <div className="section-header text-center">
                    <h1 className="title">Profile Password</h1>
                </div>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-4">
                    <Password onSubmit={showResult}/>
                </div>
            </div>
        </div>
    )
}

export default Profile;