import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Notes from "./components/Notes";
import CreateNote from "./components/CreateNote";
import EditNote from "./components/EditNote";
import { ContextStore } from "./api/ContextStore";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
      <div style={{ maxWidth: "30rem", margin: "4rem auto" }}>
        <ContextStore>
        <Router>
          <Switch>
            <Route exact path="/" component={ Notes} />
            <Route exact path="/notes" component={ Notes } />
            <Route path="/note/create" component={ CreateNote } />
            <Route path="/note/edit/:id" component={ EditNote } />
          </Switch>
        </Router>
        </ContextStore>
      </div>
  )
};

export default App;
