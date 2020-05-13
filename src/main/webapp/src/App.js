import React from 'react';
import {isLogged} from './services/user-service'
import TaskList from './components/task-list'
import LoginForm from './components/login-form'
import { Container} from 'reactstrap';

function App() {
    let content = isLogged() ? <TaskList/> : <LoginForm/>
    return (
      <Container>
          {content}
      </Container>

    );
}

export default App;
