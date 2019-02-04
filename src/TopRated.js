import React, { Component } from 'react';
import ShowModal from './ShowModal';
import { Button,Card,Container,Row,Col,Badge } from 'react-bootstrap';

class TopRated extends Component {
    state = {
        lgShow: false,
        movieId: "",
    };

    handleClick(m) {
        this.setState({ lgShow: true, movieId: m.id })
    }
    
  render() {
    let lgClose = () => this.setState({ lgShow: false });
    const {isLoaded, movies} = this.props;


    if(!isLoaded) {
      return <div className="loading"></div>
    } else {
      return (
        <div className="top-rated">       

            <hr className="spacer"/>
            <Container>
                <Row className="justify-content-md-center">
                    <Col md="12" className="text-center">
                        <h1>Top 20 Most Popular Movies</h1>
                    </Col>
                </Row>
            </Container>
            <hr className="spacer"/>
            <Container>
                {movies.map(m => (
                    <Row className="movies-row animated animatedFadeInUp fadeInUp" key={m.id}>
                        <Col xs="12" lg={{ span: 8, offset: 2 }} className="text-center">
                            <Card style={{ width: '100%', backgroundImage: `url(https://image.tmdb.org/t/p/w500${m.backdrop_path})`, backgroundRepeat:'no-repeat', backgroundSize: 'cover' }}>
                                <Card.Body>
                                <img className="poster-image float-left" src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}

									alt={m.title} />
                                    <Card.Title className="float-left">{m.title}</Card.Title><br/>
                                    <Card.Text className="card-text float-left small">
                                        {new Date(m.release_date).toLocaleString('en-IE', { year: 'numeric'})} <br/>
                                    </Card.Text>

                                    <div className="float-right mt-20">
                                        <i className="star"></i>
                                        <Badge variant="light custom-badge">{m.vote_average}</Badge>

                                        <Button variant="primary green-button" onClick={() => this.handleClick(m) }>info</Button>
                                    </div>
                                    
                                    
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                ))}
            </Container>
        
          <ShowModal lgShow={ this.state.lgShow } 
          lgClose={lgClose} movieId={this.state.movieId}
           />  
        </div>
        
      );
    }

    
  }//render


}//TopRated

export default TopRated;
