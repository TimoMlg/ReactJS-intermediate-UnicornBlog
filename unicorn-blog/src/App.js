import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation, Footer, Home, Signup, SomeOtherPage } from "./Components";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.states = {
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(
        (response) => response.json().then((json => console.log(json))).then((response) => {
          this.setState({
            isLoaded: true,
            items: response
          });
        },
        // Remarque : il est important de traiter les erreurs ici
        // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
        // des exceptions provenant de réels bugs du composant.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      ))
  }

  render() {
    const { error, isLoaded, items } = this.states;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    
    } else {
      return (
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<Signup items={this.states.items} />} />
            <Route path="/some-other-page" element={<SomeOtherPage />} />
          </Routes>
          <Footer />
        </Router>
      );
    }
  }
}

export default App;
