import React from 'react';
import Repo from './Repo.jsx';

const RepoList = (props) => (
  <div>
    <h2> Repo List Component </h2>
    There are {props.repos.length} repos.
    {props.repos.map((repo, i) => {
      return <Repo key={i} repo={repo} />
    })}
  </div>
)

export default RepoList;