import React, { Component } from 'react';
import TopRated from './TopRated';
import './scss/App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      isLoaded: false 
    }
  }

  getTopRatedMovies() {
    fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=4a203abe54a397a3160c4eb42e275f70')
    .then(res => res.json())
    .then(json => {
      this.setState({
        isLoaded: true,
        movies: json.results,
      })
    });
  }
  
  componentDidMount () {
    this.getTopRatedMovies();
  }

  render() {

    const {isLoaded, movies} = this.state;

      return (
        //Component TopRated
        <React.Fragment>
          <TopRated movies = {movies} 
          isLoaded = {isLoaded}  />     
        </React.Fragment>

      );


    
  }//render


}//App

export default App;
