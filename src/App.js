import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./components/Search";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import Main from "./components/Main";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Main>
          <Switch>
            {/* ADMIN */}
            {/* <Route path="/admin/DeleteBook/:id" component={DeleteBook} />
            <Route path="/admin/EditBook/:id" component={EditBook} />
            <Route path="/admin/inputBook" component={InputBook} />
            <Route path="/admin/books" component={AdminBooks} />
            <Route path="/admin/user" component={User} />
            <Route path="/admin/order" component={Order} />
            <Route path="/admin/OrderDetails/:id" component={OrderDetails} />
            <Route path="/admin" component={Admin} /> */}
            {/* USER */}
            <Route exact path="/" component={Dashboard} />
            {/* <Route path="/books/:id" component={Books} />
            <Route path="/about" component={About} /> */}
            {/* <Route path="/getOrder" component={getOrder} /> */}
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            {/* NOTFOUND */}
            <Route component={NotFound} />
          </Switch>
        </Main>
      </Router>
    );
  }
}

export default App;
