import React from 'react';
import Email from './email';
import Password from './password';

const Profile = (props) => {

    return (
        <div className="loginPage container page-padding">
            <div className="row">
                <div className="section-header text-center">
                    <h1 className="title">Profile</h1>
                </div>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-4">
                    <Email />
                    <Password />
                </div>
            </div>
        </div>
    )
}

export default Profile;