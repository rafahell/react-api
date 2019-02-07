import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import ModalContentMovies from './ModalContentMovies';
import Loader from './Loader';

class ShowModal extends React.Component {

    state = {
      moviesDetails: [],
      moviesCompanies: [],
      moviesGenres: [],
      isLoaded: false
    }

    fetchData = (id,status) => {
      const url = "https://api.themoviedb.org/3/movie/" + id + "?api_key=4a203abe54a397a3160c4eb42e275f70";    
      fetch(url)
        .then(res => res.json())
          .then(json => {
            status === true ?
              this.setState({
                isLoaded: true,
                moviesDetails: json,
                moviesCompanies: json.production_companies,
                moviesGenres: json.genres,
              }) 
            : this.setState({isLoaded: false}) 
          })
    }

    componentDidUpdate() {
      const {lgShow, movieId } = this.props
      this.fetchData(movieId, lgShow);
    }

    render() {
      const {lgClose, lgShow } = this.props
      const {moviesCompanies, moviesDetails, moviesGenres, isLoaded} = this.state
      const ShowlMovieDetails = <Modal size="lg" show={lgShow} onHide={lgClose} aria-labelledby="Modal-modal-sizes-title-lg">
          <Modal.Body>
            <ModalContentMovies moviesCompanies = {moviesCompanies} moviesDetails = {moviesDetails} moviesGenres = {moviesGenres} lgShow={lgShow} lgClose={lgClose}/>
          </Modal.Body>
          <Modal.Footer onClick={lgClose}>
              <Button variant="secondary green-button">Back</Button>
          </Modal.Footer>
      </Modal>;

      const loadingModal = <Modal size="sm" show={lgShow} onHide={lgClose} aria-labelledby="sm">
        <Modal.Body >
          <Loader />
        </Modal.Body>
      </Modal>;

      return (
        !isLoaded ? loadingModal : ShowlMovieDetails
      );
    
    }
  }
  
export default ShowModal