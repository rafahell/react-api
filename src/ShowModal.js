import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import ModalContentMovies from './ModalContentMovies'

class ShowModal extends React.Component {

    state = {
      moviesDetails: [],
      moviesCompanies: [],
      moviesGenres: []
    }

    fetchData = (id,status) => {
      if(status === true){
            const url = "https://api.themoviedb.org/3/movie/" + id + "?api_key=4a203abe54a397a3160c4eb42e275f70";
            
          fetch(url)
            .then(res => res.json())
              .then(json => {
                 this.setState({
                  moviesDetails: json,
                  moviesCompanies: json.production_companies,
                  moviesGenres: json.genres,
                })
              })
        }
    }

    render() {
      const {lgClose, lgShow, movieId } = this.props
      const {moviesCompanies, moviesDetails, moviesGenres} = this.state
      this.fetchData(movieId, lgShow);
      let ModalMovieDetails = <Modal size="lg" show={lgShow} onHide={lgClose} aria-labelledby="Modal-modal-sizes-title-lg">
        <Modal.Body>
          <ModalContentMovies moviesCompanies = {moviesCompanies} moviesDetails = {moviesDetails} moviesGenres = {moviesGenres} lgShow={lgShow} lgClose={lgClose}/>
        </Modal.Body>
        <Modal.Footer onClick={lgClose}>
            <Button variant="secondary green-button">Back</Button>
        </Modal.Footer>
      </Modal>;

      return (
        ModalMovieDetails
      );
    }
  }
  
export default ShowModal