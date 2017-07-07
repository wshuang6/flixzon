import React from 'react';
import {connect} from 'react-redux';
import {displayModal} from './actions';

export function ProviderResults (props) {
  let providerResults;
  if (props.loading && props.displayModal) {
    providerResults = (<h4>Loading...</h4>);
  }
  else if (props.error && props.displayModal) {
    providerResults =  (<h4>Error: {props.error}</h4>);
  }
  else if (props.displayModal) {
    let year;
    if (props.providerShow.first_aired !== undefined && props.providerShow.first_aired !== false && props.providerShow.first_aired !==null) {
      year = `(${props.providerShow.first_aired.slice(0, 4)})`;
    };
    providerResults = (
      <div className="provider-result">
        <img src={props.providerShow.artwork_608x342} alt='Show artwork' />
        <div className="result-text">
          <p className="bold">{props.providerShow.title} {year}</p>
          <p>Netflix: {props.providers.netflix}</p>
          <p>Amazon Prime: {props.providers.amazon_prime}</p>
          <p>Hulu (free): {props.providers.hulu_free}</p>
          <p>Hulu Plus: {props.providers.hulu_plus}</p>
          <p>HBO: {props.providers.hbo}</p>
          <p>Showtime: {props.providers.showtime_subscription}</p>
          <p>Starz: {props.providers.starz_subscription}</p>
        </div>
      </div>
    )
  }
  return (
    <div className='overlay'>
      {providerResults}
      <button className="search-button modal-button" onClick={e => props.dispatch(displayModal(false))}>Close me</button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  loading: state.loading, 
  error: state.error,
  providers: state.providers,
  displayModal: state.displayModal,
  providerShow: state.providerShow
})
export default connect(mapStateToProps)(ProviderResults);
