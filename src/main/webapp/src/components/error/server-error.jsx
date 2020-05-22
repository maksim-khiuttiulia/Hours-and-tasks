
import React from 'react';

const ServerError = ({error}) => {

    let errorMessage;
    

    if (error.response) {
        errorMessage = error.response.data.error;
    } 

    if (!errorMessage){
        return (<div></div>)       
    }
    
    return (
        
        <div className="alert alert-danger" role="alert">{errorMessage}</div>
    )
}

export default ServerError