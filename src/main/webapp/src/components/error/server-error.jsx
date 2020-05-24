
import React from 'react';

const ServerError = ({error}) => {

    let errorMessage;
    

    if (error.response) {
        if (error.response.data){
            errorMessage = error.response.data.error;
        } else if (error.response.status == 400){
            errorMessage = "Server not avaiable"
        } else {
            errorMessage = error.response.statusText;
        }
        
    } 

    if (!errorMessage){
        return (<div></div>)       
    }
    
    return (
        <div id="server-error" className="alert alert-danger" role="alert">{errorMessage}</div>
    )
}

export default ServerError