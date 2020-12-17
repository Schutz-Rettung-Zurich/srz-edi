import {combineReducers} from "redux";

const initialLoginState = {
    token: null,
    oauth_token_secret: null,
    oauth_token: null,
    error: null
};

function logins(state = initialLoginState, action) {
    switch (action.type) {
        case "FETCH_TOKEN_STARTED":
            return {...state, error: null};
        case "FETCH_OAUTH_STARTED":
            return {
                ...state,
                oauth_token_secret: action.tokens.oauth_token_secret,
                oauth_token: action.tokens.oauth_token
            };
        case "FETCH_TOKEN_SUCCEEDED":
            return {...state, token: action.token};
        case "FETCH_CHANGESETS_FAILED":
            return {...state, error: action.error};
        default:
            return state;
    }
}

const initialChangesetsState = {
    entries: null,
    initial: null,
    error: null,
    totalChangesets: null,
};

function changesets(state = initialChangesetsState, action) {
    switch (action.type) {
        case "FETCH_CHANGESETS_STARTED":
            return {...state, error: null, totalChangesets: null, initial: null};
        case "FETCH_CHANGESETS_SUCCEEDED":
            return {
                ...state, entries: action.changesets,
                totalChangesets: action.changesets.length || 0, initial: action.changesets[0]
            };
        case "FETCH_CHANGESETADD_SUCCEDED":
            return {
                ...state, entries: [...state.entries, action.changesets],
                totalChangesets: action.changesets.length || 0,
            };
        case "FETCH_CHANGESETS_FAILED":
            return {...state, error: action.error, totalChangesets: null};
        default:
            return state;
    }
}

const initialMyFiltersState = {
    filters: null,
    error: null,
    totalFilters: null,
};

function filters(state = initialMyFiltersState, action) {
    switch (action.type) {
        case "FETCH_MYFILTERS_STARTED":
            return {...state, error: null, totalFilters: null};
        case "FETCH_MYFILTERS_SUCCEEDED":
            return {...state, filters: action.filters, totalFilters: action.filters.length || 0};
        case "FETCH_MYFILTERS_FAILED":
            return {...state, error: action.error, total: null};
        default:
            return state;
    }
}

const initialReleasedFiltersState = {
    releasedFilters: null,
    error: null,
    totalReleasedFilters: null,
};

function releasedFilters(state = initialReleasedFiltersState, action) {
    switch (action.type) {
        case "FETCH_RELEASEDFILTERS_STARTED":
            return {...state, error: null, totalReleasedFilters: null};
        case "FETCH_RELEASEDFILTERS_SUCCEEDED":
            return {...state, releasedFilters: action.filters, totalReleasedFilters: action.filters.length || 0};
        case "FETCH_RELEASEDFILTERS_FAILED":
            return {...state, error: action.error, total: null};
        default:
            return state;
    }
}

const changesetStateInitial = {
    newChangesets: null,
    editChangesets: null,
    doneChangesets: null,
    date: null,
    error: null,
};

function changesetState(state = changesetStateInitial, action) {
    switch (action.type) {
        case "FETCH_CHANGESETSTATE_STARTED":
            return {...state, error: null};
        case "FETCH_CHANGESETSTATE_SUCCEEDED":
            return {
                ...state, newChangesets: action.state.newChangesets || [],
                editChangesets: action.state.editChangesets || [],
                doneChangesets: action.state.doneChangesets || [],
                date: new Date()
            };
        case "FETCH_CHANGESETSTATE_FAILED":
            return {...state, error: action.error};
        default:
            return state;
    }
}

const actualState = {
    actual: null,
};

function changeset(state = actualState, action) {
    switch (action.type) {
        case "FETCH_CHANGESET_STARTED":
            return {...state,};
        case "FETCH_CHANGESET_SUCCEEDED":
            return {...state, actual: action.changeset};
        default:
            return state;
    }
}

const actualfilter = {
    actualfilter: null,
    actualtype: null,
};

function filter(state = actualfilter, action) {
    switch (action.type) {
        case "FETCH_SETFILTER_STARTED":
            return {...state, actualfilter: null, actualtype: null,};
        case "FETCH_SETFILTER_SUCCEEDED":
            return {...state, actualfilter: action.value.filter, actualtype: action.value.isRealesed};
        default:
            return state;
    }
}

const user = {
    id: null,
    username: null,
    error: null
};

function profile(state = user, action) {
    switch (action.type) {
        case "FETCH_PROFILE_STARTED":
            return state;
        case "FETCH_PROFILE_SUCCEEDED":
            return {...state, id: action.profile.id, username: action.profile.username};
        case "FETCH_PROFILE_FAILED":
            return {...state, error: action.error};
        default:
            return state;
    }
}

const actualSort = {
    sort: 1,
};

function sort(state = actualSort, action) {
    switch (action.type) {
        case "FETCH_SETSORT_SUCCEEDED":
            return {...state, sort: action.data.value};
        default:
            return state;
    }
}

const rootReducers = combineReducers({
    logins,
    changesets,
    changeset,
    filters,
    filter,
    sort,
    releasedFilters,
    profile,
    changesetState,
});

export default rootReducers;


