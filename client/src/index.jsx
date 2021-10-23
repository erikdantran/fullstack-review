import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

    this.getRepos = this.getRepos.bind(this);
  }

  componentDidMount() {
    this.getRepos();
  }

  getRepos() {
    $.get('/repos')
      .done(results => {
        console.log(results);
        this.setState({
          repos: results
        })
      })
      .fail(err => {
        console.error(err)
      })
  }

  search(term) {
    console.log(`${term} was searched`);
    $.post("/repos", { 'term': term })
      .done(results => {
        this.getRepos();
      })
      .fail(err => {
        console.error(err)
      })
  }

  render() {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)} />
      <RepoList repos={this.state.repos} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));