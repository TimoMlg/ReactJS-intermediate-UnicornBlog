import React from "react";
import Button from "@mui/material/Button";

const Home = (props) => {
  if (!props.isClicked) {
    return (
      <div className="Signup-main-content">
        <input
          value={props.searchedPost}
          onChange={props.handleChangeSearch}
          type="text"
          name="searchInput"
          className="searchInput"
          placeholder="  ...Search"
        />
        <h1>Articles</h1>
        <ul className="articles-section">
          {props.posts
            .filter((post) =>
              post.title
                .toLowerCase()
                .startsWith(props.searchedPost.toLowerCase())
            )
            .slice(0, 7)
            .map((filteredPost) => (
              <li key={filteredPost.id}>
                <h4>{filteredPost.title}</h4>
                {filteredPost.body.substring(0, filteredPost.body.length - 15)}
                ...
                <Button
                  variant="text"
                  onClick={() => props.handleViewMore(filteredPost.id)}
                >
                  View More
                </Button>
              </li>
            ))}
        </ul>
      </div>
    );
  } else {
    const filteredItems = props.posts.filter(
      (post) => post.id === props.postId
    );
    return (
      <div>
        <div className="detail-article-section">
          <ul>
            {filteredItems.map((item) => (
              <li key={item.id}>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
          <Button variant="contained" onClick={props.handleReturn}>
            Return
          </Button>
        </div>
        <div className="comments-section"></div>
      </div>
    );
  }
};

export default Home;
