import React from "react";
import Button from '@mui/material/Button';

const Upload = (props) => {
  return (
    <div className="Signup-main-content">
    <h1>Articles</h1>
      <ul className='articles-section'>
        {props.posts.slice(0,3).map((post) => 
          <li key={post.id}>
            <h4>{post.title}</h4>
            <p>{post.body}</p>
            <Button variant="outlined">View More</Button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Upload;
