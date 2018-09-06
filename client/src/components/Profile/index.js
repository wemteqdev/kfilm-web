import React from 'react';
import Password from './password';

const Profile = (props) => {

    const showResult = (result) => {
        console.log(result)
    }
    return (
        <section className="loginPage bgWhite">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-4">
                        <Password onSubmit={showResult}/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Profile;