import React from 'react';
import { Button, Modal, Col, Row, Container, Badge } from 'react-bootstrap';
import notAvailable from './not-available.png';

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
                    moviesGenres: json.genres
                  })
              })
        }
    }

    render() {
      //Define prop (remove this.prop)
      const { lgClose, lgShow, movieId } = this.props
      const {moviesCompanies, moviesDetails, moviesGenres} = this.state
      this.fetchData(movieId, lgShow);

      return (
        
          <Modal
            size="lg"
            show={lgShow}
            onHide={lgClose}
            aria-labelledby="Modal-modal-sizes-title-lg"
          >
            <Modal.Body>

            <Container className="content-modal">
              <Row >
                <Col md="3" style={{ paddingLeft: "0", paddingRight: "0" }}><img className="poster-image" src={`https://image.tmdb.org/t/p/w500${moviesDetails.poster_path}`}
                    alt={moviesDetails.title} />
                </Col>

                <Col md="9">
                <div className="vote-wrapper">
                  <div className="pull-right text-right">
                  <div className="vote-average">
                        <i className="star"></i>
                        <Badge variant="light custom-badge">{moviesDetails.vote_average}</Badge>
                    </div>
                  </div>
                  </div>
                  <h1 className="pull-left">{moviesDetails.title}</h1>
                  <p className="pull-left small">{new Date(moviesDetails.release_date).toLocaleString('en-IE', { year: 'numeric'})}</p>

                  <h2>Overview</h2>
                  <p>{moviesDetails.overview}</p>

                  <h2>Genres</h2>
                  <p className="small">{moviesGenres.map((mg, index) => (
                    <React.Fragment key={index}>
                      <span>{mg.name}</span> 
                    </React.Fragment>
                  )).reduce((acc, coma) => acc === null ? [coma] : [acc, ', ', coma], null)}</p>
                  
                  <h2>Production Companies</h2>                  
                    <Row className="companies-names" >

                      {moviesCompanies.map(mc => (<Col md="3" key={mc.id}>
                      {mc.logo_path !== null ? <img src={`https://image.tmdb.org/t/p/w500${mc.logo_path}`} 
                        alt={mc.title} /> : <img src={notAvailable}  
                        alt="Not Available"/>}
                        <p className="small">{mc.name} </p>
                        </Col>))}

                    </Row>
                </Col>
              </Row>
          </Container>
            </Modal.Body>
            <Modal.Footer onClick={lgClose}>
              <Button variant="secondary green-button">Back</Button>
            </Modal.Footer>
          </Modal>
      );
    }
  }
  
export default ShowModal