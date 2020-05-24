
import React from 'react';

const UserError = ({error}) => {

    if (!error){
        return (<div></div>)       
    }
    return (
        <div id="user-error" className="alert alert-danger" role="alert">{error}</div>
    )
}

export default UserError