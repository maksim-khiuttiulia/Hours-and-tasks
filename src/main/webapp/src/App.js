import React from 'react';
import { BrowserRouter, Redirect, Route, withRouter } from "react-router-dom";
import { isLoggedIn } from './services/user-service'
import TaskList from './components/tasks/task-list'
import LoginForm from './components/forms/login-form/login-form'
import ContainerPage from './components/container-page/container-page'



const PrivateRoute = withRouter(({ component: Component, ...rest }) => {
  return (<Route {...rest} render={(props) => isLoggedIn() === false ? <Redirect to={{pathname : '/login', state : {from: props.location.pathname} }} /> : <ContainerPage><Component {...props} /></ContainerPage>} />)
})

const PublicRoute = withRouter(({ component: Component, ...rest }) => {
  return (<Route {...rest} render={(props) => isLoggedIn() === false ? <Component {...props}/> : <Redirect to={{pathname : '/login', state : {from: props.location.pathname} }} />} />)
})


function App() {

  return (
    <BrowserRouter>
      <PrivateRoute exact path="/" component={() => <TaskList showDone={true} showNotDone={true} projectId={1}/>}/>
      <PrivateRoute exact path="/tasks" component={TaskList} />
      <Route exact path="/login" component={LoginForm} />
    </BrowserRouter>

  );
}

export default App;
