import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchShows, fetchProviders, providerShow} from './actions';
import ProviderResults from './provider-results';


class Search extends Component {
  renderResults() {
    function isWikiNull(str){
      let wikiURL=`https://en.wikipedia.org/?curid=${str}`;
      return (str != null) ? <a href={wikiURL}>Wikipedia</a> : `No Wikipedia Link Available`
    }

    function isImdbNull(str){
      let imdbURL=`http://www.imdb.com/title/${str}`
      return (str.length > 0) ? <a href={imdbURL}>IMDB</a> : `No IMDB Link Available`
    }

		return this.props.shows.map((item, index) => {
  		let year;
      if (item.first_aired !== undefined && item.first_aired !== false && item.first_aired !==null) {
        year = `(${item.first_aired.slice(0, 4)})`;
      }
      return (
        <div key={index} className="indv-result">
          <img className="indv-result-image" src={item.artwork_304x171} alt='Show artwork' />
          <div className="result-text">
          <p className="bold">{item.title} {year}</p>
          <p>{isWikiNull(item.wikipedia_id)}</p>
          <p>{isImdbNull(item.imdb_id)}</p>
          <p><a href='#' onClick={e => {
            this.props.dispatch(fetchProviders(item.id))
            this.props.dispatch(providerShow(item))
          }}>Is it on Netflix (and others?)</a></p>
          </div>
        </div>
      )
    }) 
  }
  render () {
    if (this.props.loading && !this.props.displayModal) {
      return (<div className="container"><h4>Loading...</h4></div>);
    }
    if (this.props.error && !this.props.displayModal) {
      return (<div className="container"><h4>Error: {this.props.error}</h4></div>);
    }
    let providerResults = (this.props.displayModal) ? (<ProviderResults />) : null;
    return (
      <div className="container">
        {providerResults}
        <div className="subhead">
        <h3>Get your FlixZon</h3>
        <form onSubmit={e => {
          e.preventDefault();
          this.props.dispatch(fetchShows(e.target.search.value))}}>
          <input type="text" autoComplete="off" className="search-input" name="search" placeholder="Enter the name of a show" />
          <button className="search-button">
            <span>Search!</span>
          </button>
        </form>
        </div>
        <div className="search-results">
        {this.renderResults()}
        </div>
      </div>
    )  
  }
}

//		if (/^[\w\-\s]+$/.test(search) && (/\d/.test(search) || /[A-Z]/i.test(search)))

	// show.forEach(function(item){





const mapStateToProps = (state)  => ({
  shows: state.shows,
  loading: state.loading, 
  error: state.error,
  providers: state.providers,
  displayModal: state.displayModal
})

export default connect(mapStateToProps)(Search);