import React from "react";
function Joke(props) {
  return (
    <div>
      <h2 style={{ display: props.joke ? "block" : "none" }}>
        joke: {props.joke}
      </h2>
      <p>punchline: {props.punchline}</p>
      <hr />
    </div>
  );
}

export default Joke;
