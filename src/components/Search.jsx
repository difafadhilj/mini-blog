import React from "react";
// import "../Search.css";
import axios from "axios";
import Loader from "../loader.gif";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: {},
      loading: false,
      message: ""
    };
    this.cancel = "";
  }

  fetchSearchResults = (updatedPageNo = "", query) => {
    const pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : "";
    // By default the limit of results is 20
    const searchUrl = `http://localhost:8080/articles/${query}${pageNumber}`;
    if (this.cancel) {
      // Cancel the previous request before making a new request
      this.cancel.cancel();
    }
    // Create a new CancelToken
    this.cancel = axios.CancelToken.source();
    axios
      .get(
        searchUrl,
        {
          cancelToken: this.cancel.token
        },
        {
          header: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTgzMTIwNjU3LCJleHAiOjE1ODMyMDcwNTd9.-JfgIlDk5ku9yt-jEWrMu6DoZMYvTHPB6mknOfOIFZE"
          }
        }
      )
      .then(res => {
        const resultNotFoundMsg = !res.data.hits.length
          ? "There are no more search results. Please try a new search."
          : "";
        this.setState({
          results: res.data.hits,
          message: resultNotFoundMsg,
          loading: false
        });
      })
      .catch(error => {
        if (axios.isCancel(error) || error) {
          this.setState({
            loading: false,
            message: "Failed to fetch results.Please check network"
          });
        }
      });
  };

  handleOnInputChange = event => {
    const query = event.target.value;
    if (!query) {
      this.setState({ query, results: {}, message: "" });
    } else {
      this.setState({ query, loading: true, message: "" }, () => {
        this.fetchSearchResults(1, query);
      });
    }
  };

  renderSearchResults = () => {
    const { results } = this.state;
    if (Object.keys(results).length && results.length) {
      return (
        <div className="results-container">
          {results.map(result => {
            return (
              <a
                key={result.id}
                href={result.previewURL}
                className="result-items"
              >
                <h6 className="image-username">{result.title}</h6>
                <div className="image-wrapper">
                  <img
                    className="image"
                    src={result.previewURL}
                    alt={result.user}
                  />
                </div>
              </a>
            );
          })}
        </div>
      );
    }
  };

  render() {
    const { query } = this.state;
    const { message, loading } = this.state;
    return (
      <div className="container">
        {/*Search Input*/}
        <label className="search-label" htmlFor="search-input">
          {/*Error Message*/}
          {message && <p className="message">{message}</p>}
          {/*Loader*/}
          <img
            src={Loader}
            className={`search-loading ${loading ? "show" : "hide"}`}
            alt="loader"
          />
          <input
            className="form-control"
            type="search"
            value={query}
            id="search-input"
            placeholder="Search..."
            onChange={this.handleOnInputChange}
          />
          <i className="fa fa-search search-icon" />
        </label>
        {/*Result*/}
        {this.renderSearchResults()}
      </div>
    );
  }
}
export default Search;
