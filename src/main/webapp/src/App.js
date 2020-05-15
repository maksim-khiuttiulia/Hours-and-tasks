import React, { useState, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, withRouter } from "react-router-dom";
import { isLogged } from './services/user-service'
import TaskList from './components/task-list'
import LoginForm from './components/login-form'


const PrivateRoute = withRouter((props) => {
  const { component: Component, ...rest } = props;
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    isLogged().then(result => {
      setLogged(result)
    })
  })

  return (<Route {...rest} render={(props) => logged === true ? <Component {...props} /> : <Redirect to='/login' />} />)
})

const PublicRoute = withRouter((props) => {
  const { component: Component, ...rest } = props;
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    isLogged().then(result => {
      setLogged(result)
    })
  })

  return (<Route {...rest} render={(props) => logged === true ? <Redirect to="/" /> : <Component {...props} />} />)
})


function App() {
  return (
    <BrowserRouter>
      <PrivateRoute path="/" component={TaskList} />
      <PublicRoute path="/login" component={LoginForm} />
    </BrowserRouter>

  );
}

export default App;
