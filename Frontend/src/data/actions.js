import * as api from "./api";

export function fetchDeleteFilter(filter, token, t) {
    return (dispatch) => {
        if (window.confirm(t('delete.confirm', {name: filter.properties.name}))) {
            dispatch({type: "FETCH_SAVE_STARTED"});
            api.deleteFilterDirect(token, filter.id)
                .then(() => {
                    window.location = process.env.REACT_APP_HOME_URL
                })
                .catch(() => {
                    alert(t('delete.poblem', {name: filter.properties.name}))
                });
        }
    }
}

export function fetchChangesets(token, filter) {
    return (dispatch) => {
        dispatch({type: "FETCH_CHANGESETS_STARTED"});
        return api
            .getChangesetsFromAPI(token, filter)
            .then(({features: changesets}) => {
                dispatch({type: "FETCH_CHANGESETS_SUCCEEDED", changesets});
            })
            .catch((error) => dispatch({type: "FETCH_CHANGESETS_FAILED", error}));
    };
}

export function fetchMyProfile(token) {
    return (dispatch) => {
        dispatch({type: "FETCH_PROFILE_STARTED"});
        return api
            .getProfile(token)
            .then(({id, username}) => {
                const profile = {id: id, username: username};
                dispatch({type: "FETCH_PROFILE_SUCCEEDED", profile});
            })
            .catch((error) => dispatch({type: "FETCH_PROFILE_FAILED", error}));
    };
}

function fetchAddChangesetById(diffFilterAndStoreChangesets, token) {
    return (dispatch) => {
        dispatch({type: "FETCH_CHANGESETS_STARTED"});
        return api
            .getChngesetsById(token, diffFilterAndStoreChangesets)
            .then(({features: changesets}) => {
                dispatch({type: "FETCH_CHANGESETSADD_SUCCEEDED", changesets});
            })
            .catch((error) => {
                return
            });
    };
}

export function fetchChangesetStatus(token, filter) {
    return (dispatch) => {
        dispatch({type: "FETCH_CHANGESETSTATE_STARTED"});
        return api
            .getState(token, filter)
            .then(({newChangesets, inProgress, finished}) => {
                const state = {newChangesets: newChangesets, editChangesets: inProgress, doneChangesets: finished};
                dispatch({type: "FETCH_CHANGESETSTATE_SUCCEEDED", state});
            })
            .catch((error) => {
                dispatch({type: "FETCH_CHANGESETSTATE_FAILED", error})
            });
    };
}

export function fetchChangesetStatusCheck(token, filter, changesetFromStore) {
    return (dispatch) => {
        dispatch({type: "FETCH_CHANGESETSTATE_STARTED"});
        return api
            .getState(token, filter)
            .then(({newChangesets, inProgress, finished}) => {
                const state = {newChangesets: newChangesets, editChangesets: inProgress, doneChangesets: finished,};
                dispatch({type: "FETCH_CHANGESETSTATE_SUCCEEDED", state});
                const filterChangesets = newChangesets.concat(inProgress);
                const diffFilterAndStoreChangesets = filterChangesets.filter(function (el) {
                    return changesetFromStore.some((el2) => el2 === el);
                });
                if (diffFilterAndStoreChangesets.length > 0) {
                    dispatch(fetchAddChangesetById(diffFilterAndStoreChangesets, token));
                }
            })
            .catch((error) => {
                dispatch({type: "FETCH_CHANGESETSTATE_FAILED", error})
            });
    };
}

export function fetchUpdateChangesetStatus(token, filter, message, changesetFromStore) {
    return (dispatch) => {
        dispatch({type: "FETCH_CHANGESETSTATE_STARTED"});
        return api
            .patchState(token, filter, message)
            .then(({newChangesets, inProgress, finished}) => {
                const filterChangesets = newChangesets.concat(inProgress);
                const diffFilterAndStoreChangesets = filterChangesets.filter(function (el) {
                    return changesetFromStore.some((el2) => el2 === el);
                });
                if (diffFilterAndStoreChangesets.length > 0) {
                    dispatch(fetchAddChangesetById(diffFilterAndStoreChangesets, token));
                }
                const state = {newChangesets: newChangesets, editChangesets: inProgress, doneChangesets: finished,};
                dispatch({type: "FETCH_CHANGESETSTATE_SUCCEEDED", state});
            })
            .catch((error) => dispatch({type: "FETCH_CHANGESETSTATE_FAILED", error}));
    };
}

export function fetchActualChangeset(changeset) {
    return (dispatch) => {
        dispatch({type: "FETCH_CHANGESET_STARTED"});
        dispatch({type: "FETCH_CHANGESET_SUCCEEDED", changeset});
    }
}

export function fetchSortChangesets(data) {
    return (dispatch) => {
        dispatch({type: "FETCH_SETSORT_SUCCEEDED", data});
    }
}

export function fetchMyFilters(token) {
    return (dispatch) => {
        dispatch({type: "FETCH_MYFILTERS_STARTED"});
        return api
            .getMyFilters(token)
            .then(({results: features}) => {
                const filters = features.features;
                dispatch({type: "FETCH_MYFILTERS_SUCCEEDED", filters});
            })
            .catch((error) => dispatch({type: "FETCH_MYFILTERS_FAILED", error}));
    }
}

export function fetchReleasedFilters(token) {
    return (dispatch) => {
        dispatch({type: "FETCH_RELEASEDFILTERS_STARTED"});
        return api
            .getReleasedFilters(token)
            .then(({results: features}) => {
                const filters = features.features;
                dispatch({type: "FETCH_RELEASEDFILTERS_SUCCEEDED", filters});
            })
            .catch((error) => dispatch({type: "FETCH_RELEASEDFILTERS_FAILED", error}));
    }
}

export function fetchActualFilter(filter, isRealesed) {
    const value = {filter: filter, isRealesed: isRealesed};
    return (dispatch) => {
        dispatch({type: "FETCH_SETFILTER_STARTED"});
        dispatch({type: "FETCH_SETFILTER_SUCCEEDED", value});
    }
}

export function fetchToken(oauth_verifier, oauth_token, oauth_secret) {
    const tokens = {oauth_token: oauth_token, oauth_verifier: oauth_verifier, oauth_token_secret: oauth_secret};
    return (dispatch) => {
        dispatch({type: "FETCH_TOKEN_STARTED"});
        return api
            .postTokenFromAPI(tokens)
            .then(({token}) => {
                sessionStorage.setItem("token_monitoring", token);
                dispatch({type: "FETCH_TOKEN_SUCCEEDED", token});
            })
            .catch((error) => dispatch({type: "FETCH_TOKEN_FAILED", error}));
    }
}

export function fetchTokenFromStore(token) {
    return (dispatch) => {
        dispatch({type: "FETCH_TOKEN_STARTED"});
        if (token) {
            dispatch({type: "FETCH_TOKEN_SUCCEEDED", token});
        }
        dispatch({type: "FETCH_TOKEN_FAILED"});
    }
}

export function fetchLogin() {
    return (dispatch) => {
        dispatch({type: "FETCH_TOKEN_STARTED"});
        return api
            .postLogin()
            .then((tokens) => {
                sessionStorage.setItem("oauth_token_secret", tokens.oauth_token_secret);
                sessionStorage.setItem("oauth_token", tokens.oauth_token);
                dispatch({type: "FETCH_OAUTH_STARTED", tokens});

                window.location = "https://www.openstreetmap.org/oauth/authorize?oauth_token=" + tokens.oauth_token;
            })
            .catch((error) => dispatch({type: "FETCH_TOKEN_FAILED", error}));
    }
}
