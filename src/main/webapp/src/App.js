import React from 'react';
import {BrowserRouter, Redirect, Switch, Route,Link } from "react-router-dom";
import {isLogged} from './services/user-service'
import TaskList from './components/task-list'
import LoginForm from './components/login-form'
import { Container} from 'reactstrap';


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (isLogged() === true ? <Component {...props}/> : <Redirect to='/login' />)} />
)

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (isLogged() === true ?  <Redirect to="/"/> : <Component {...props} />)} />
)

function App() {
    let content = isLogged() ? <TaskList/> : <LoginForm/>
    return (
      <BrowserRouter>
        <PrivateRoute path="/" component={TaskList}/>
        <PublicRoute path="/login" component={LoginForm}/>
    </BrowserRouter>

    );
}

export default App;
