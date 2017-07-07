import {FETCH_REQUEST, FETCH_SUCCESS, FETCH_ERROR, PROVIDER_SUCCESS, DISPLAY_MODAL, PROVIDER_SHOW} from './actions';
const initialState = {
    shows: [],
    loading: false,
    error: null,
    providers: null,
    displayModal: false,
    providerShow: null
};

export default (state=initialState, action) => {
    if(action.type === FETCH_REQUEST) {
        return {
            ...state,
            loading: true,
            error: null
        }
    }
    if(action.type === FETCH_SUCCESS) {
        return {
            ...state,
            loading: false,
            error: null,
            shows: action.shows
        }
    }
    if(action.type === DISPLAY_MODAL) {
        return {
            ...state,
            displayModal: action.displayModal
        }
    }
    if(action.type === FETCH_ERROR) {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    }
    if (action.type === PROVIDER_SUCCESS) {
        return {
            ...state,
            loading: false,
            error: null,        
            providers: action.providers
        }
    }
    if (action.type === PROVIDER_SHOW) {
        return {
            ...state,
            providerShow: action.providerShow
        }
    }
    return state;
}

