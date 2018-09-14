import React from 'react';
import Email from './email';
import Password from './password';

const Profile = (props) => {

    return (
        <div className="loginPage">
            <div className="container bg-light py-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-4 col-md-6 col-sm-8 col-11">
                        <div className="text-center">
                            <h1 className="title">Profile</h1>
                        </div>
                        <Email />
                        <Password />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;