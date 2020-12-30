import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap'
import { Home, Login, Signup } from './pages'
import { Navigation, ProtectedRoute } from './components'

function App() {
  return (
    <div >
      <Navigation></Navigation>
      <Container>
        <Switch>
          <ProtectedRoute path="/" component={Home} exact />
        </Switch>
        <Route path="/login" component={Login} exact />
        <Route path="/signup" component={Signup} exact />
      </Container>
    </div>
  );
}

export default App;
