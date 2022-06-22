import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation, Footer, Home, Upload, Gallery } from "./Components";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      posts: [],
      photos: [],
      postId: ''
    };
  }

  componentDidMount() {
    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/posts'),
      fetch('https://jsonplaceholder.typicode.com/albums/1/photos')])
      .then(([res1, res2]) => Promise.all([ res1.json(), res2.json()]))
      .then(
        ([result1, result2]) => {
          this.setState({
            isLoaded: true,
            posts: result1,
            photos: result2
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
        )
    }

  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>chargement...</div>
    } else {
      return (
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload posts={this.state.posts} />} />
            <Route path="/gallery" element={<Gallery photos={this.state.photos} />} />
          </Routes>
          <Footer />
        </Router>
      );
    }
  }
}
export default App;
