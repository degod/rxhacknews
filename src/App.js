import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    let fidelis = this;
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log("data: " + data.length);
        // do stuff with `data`, call second `fetch`
        for (var i = 0; i < data.length; i++) {
          // console.log(i);
          fetch(
            "https://hacker-news.firebaseio.com/v0/item/" +
              data[i] +
              ".json?print=pretty"
          )
            .then(function(response) {
              return response.json();
            })
            .then(function(data) {
              // do stuff with `data`
              fidelis.setState({
                // items: data.concat(data),
                items: fidelis.state.items.concat(data),
                isLoaded: true
              });
            });
        }
      })
      .catch(function(error) {
        console.log("Requestfailed", error);
      });
  }
  render() {
    var { items, isLoaded } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <ul>
            {items.map(item => (
              <li key={item.id}>
                Title: {item.title} |
                <a href="{item.url}"> Url: click to read full story</a>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default App;
