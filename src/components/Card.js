import React from "react";

export default (props) => {
  const {
    avatar_url,

    name,
    bio,
    followers,
    following,
    public_repos,
    html_url,
  } = props.head;
  return (
    <div className="card">
      <img src={avatar_url} alt="" className="card__image" />

      <p>{bio}</p>
      <p>Name: {name}</p>
      <p>Followers: {followers}</p>
      <p>Following: {following}</p>
      <p>Public Repositories: {public_repos}</p>
      <button className="card__button">
        <a
          href={html_url}
          className="card__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Profile
        </a>
      </button>
    </div>
  );
};
