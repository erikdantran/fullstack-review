import React from 'react';

const Repo = (props) => (
  <div id="singleRepo">
    <h4><a href={props.repo.url}>{props.repo.name}</a></h4>
    <p>Owner: {props.repo.owner}</p>
    <p>Forks: {props.repo.forks}</p>
  </div>
)

export default Repo;