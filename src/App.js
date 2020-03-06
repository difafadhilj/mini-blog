import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./components/Search";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import ArticleDetails from "./components/ArticleDetails";
import MyArticles from "./components/MyArticles";
import CreateArticle from "./components/CreateArticle";
import User from "./components/User";
import Comment from "./components/Comment";
import Main from "./components/Main";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Main>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/article/:id" component={ArticleDetails} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/myarticles/:id" component={MyArticles} />
            <Route path="/article-create" component={CreateArticle} />
            <Route path="/user" component={User} />
            <Route path="/comment" component={Comment} />
            {/* NOTFOUND */}
            <Route component={NotFound} />
          </Switch>
        </Main>
      </Router>
    );
  }
}

export default App;
