import React from "react";

const Signup = (props) => {
  return (
    <div className="Signup-main-content">
      <h1>This is the Signup page</h1>
      <ul>
        {props.items.map((item) => 
          <li>
            {item.title}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Signup;
