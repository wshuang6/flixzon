let {API_KEY} = require('./secret');

export const FETCH_REQUEST = 'FETCH_REQUEST';
const fetchRequest = () => ({
    type: FETCH_REQUEST
});

export const FETCH_SUCCESS = 'FETCH_SUCCESS';
const fetchSuccess = (shows) => ({
    type: FETCH_SUCCESS,
    shows
});

export const FETCH_ERROR = 'FETCH_ERROR';
const fetchError = (error) => ({
    type: FETCH_ERROR,
    error
})

export const fetchShows = query => dispatch => {
  dispatch(fetchRequest());
  return fetch(`https://api-public.guidebox.com/v2/search?type=show&query=${query}&api_key=${API_KEY}`, {
    mode: 'cors'
  })
  .then(res => res.json())
  .then((res) => {
    dispatch(fetchSuccess(res.results));
  })
  .catch((err)=> {
    console.error(err)
    dispatch(fetchError(err.message));
  })
}

export const PROVIDER_SUCCESS = 'PROVIDER_SUCCESS';
const providerSuccess = (providers) => ({
  type: PROVIDER_SUCCESS,
  providers
})

export const DISPLAY_MODAL = 'DISPLAY_MODAL';
export const displayModal = (displayModal) => ({
  type: DISPLAY_MODAL,
  displayModal
})

export const PROVIDER_SHOW = 'PROVIDER_SHOW';
export const providerShow = (providerShow) => ({
  type: PROVIDER_SHOW,
  providerShow
})

export const fetchProviders = (id) => dispatch => {
  dispatch(displayModal(true));
  dispatch(fetchRequest());
  Promise.all([
    fetchProvider(id, 'amazon_prime'), 
    fetchProvider(id, 'netflix'),
    fetchProvider(id, 'hulu_free'),
    fetchProvider(id, 'hulu_plus'),
    fetchProvider(id, 'hbo'),
    fetchProvider(id, 'showtime_subscription'),
    fetchProvider(id, 'starz_subscription'),
  ])
  .then(res => {
    let results = {};
    console.log(res)
    res.forEach((result) => {
      results = Object.assign(results, result)
    });
    console.log(results);
    dispatch(providerSuccess(results));
  })
  .catch(err => {
    console.error(err)
    dispatch(fetchError(err.message));
  })
}

function fetchProvider (id, provider) {
  const API_KEY ='7ceacb5ffc481ff8aed9719a341cb2bda30df935'
  return fetch(`https://api-public.guidebox.com/v2/shows/${id}/episodes?sources=${provider}&api_key=${API_KEY}`, {
    mode: 'cors'
  })
  .then(res => res.json())
  .then(res => {
    let results = {};
    if (res.results.length > 0) {
      results[provider] = 'Yes';
      return results;
    }
    else {
      results[provider] = 'No';
      return results;
    }
  })
}