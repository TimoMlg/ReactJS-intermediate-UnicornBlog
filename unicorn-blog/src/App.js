import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Navigation, Home, Upload, Gallery } from "./Components";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      posts: [],
      photos: [],
      postId: "",
      isClicked: false,
      isPosted: false,
      title: "",
      body: "",
      searchedPost: ''
    };
  }

  //Fonction qui permet de call api et récupérer les listes d'objects
  componentDidMount() {
    Promise.all([
      fetch("https://jsonplaceholder.typicode.com/posts"),
      fetch("https://jsonplaceholder.typicode.com/albums/1/photos"),
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(
        //On remplit nos listes avec le setState
        ([result1, result2]) => {
          this.setState({
            isLoaded: true,
            posts: result1,
            photos: result2,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  //Fonction de gestion du view more sur les articles
  handleViewMore = (postId) => {
    this.setState({
      isClicked: true,
      postId: postId,
    });
  };
  //Fonction de gestion du bouton retour sur la page de detail de l'article
  handleReturn = (event) => {
    this.setState({
      isClicked: false,
    });
  };
  //fonction de gestion du titre sur le champ de texte titre
  handleTitle = (event) => {
    this.setState({
      title: event.target.value
    });
  };
  
  //fonction de gestion du contenu sur le champ de texte contenu
  handleBody = (event) => {
    this.setState({
      body: event.target.value
    });
  };

  //fonction de gestion du champ de recherche pour filtrer les articles
  handleChangeSearch = (event) => {
    this.setState({
      searchedPost: event.target.value
    })
  }

  //fonction d'ajout d'un post
  handleNewPost = () => {
    const obj = {
      id: 0,
      title: this.state.title,
      body: this.state.body,
    };
    this.setState({
      posts: [obj, ...this.state.posts],
      isPosted: true
    });

  };

  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>chargement...</div>;
    } else {
      //gestion des routes et de la navigation du site
      return (
        <Router>
          <Navigation />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  posts={this.state.posts}
                  handleViewMore={this.handleViewMore}
                  isClicked={this.state.isClicked}
                  postId={this.state.postId}
                  handleReturn={this.handleReturn}
                  handleChangeSearch={this.handleChangeSearch}
                  searchedPost={this.state.searchedPost}
                />
              }
            />
            <Route
              path="/upload"
              element={
                <Upload
                  handleNewPost={this.handleNewPost}
                  handleBody={this.handleBody}
                  handleTitle={this.handleTitle}
                  body={this.state.body}
                  title={this.state.title}
                  isPosted={this.state.isPosted}
                />
              }
            />
            <Route
              path="/gallery"
              element={<Gallery photos={this.state.photos} />}
            />
          </Routes>
        </Router>
      );
    }
  }
}
export default App;
