import React from 'react';
import { BrowserRouter, Redirect, Route, withRouter } from "react-router-dom";
import { isLoggedIn } from './services/user-service'
import TaksPage from './components/tasks/tasks-page'
import LoginForm from './components/forms/login-form/login-form'
import ContainerPage from './components/container-page/container-page'
import ProjectPage from './components/projects/projects-page'



const PrivateRoute = withRouter(({ component: Component, ...rest }) => {
  return (<Route {...rest} render={(props) => isLoggedIn() === false ? <Redirect to={{pathname : '/login', state : {from: props.location.pathname} }} /> : <ContainerPage><Component {...props} /></ContainerPage>} />)
})

function App() {

  return (
    <BrowserRouter>
      <PrivateRoute exact path="/" component={ProjectPage}/>
      <PrivateRoute exact path="/tasks" component={() => <TaksPage projectId={1}/>}/>
      <PrivateRoute exact path="/projects" component={ProjectPage}/>
      <Route exact path="/login" component={LoginForm} />
    </BrowserRouter>

  );
}

export default App;
