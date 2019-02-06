import React from 'react';
import { Col, Row, Container, Badge } from 'react-bootstrap';
import notAvailable from './not-available.png';


const ModalContentMovies = (props) => {

    const {moviesCompanies, moviesDetails, moviesGenres} = props
    
    return (

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
    );
        
}

export default ModalContentMovies