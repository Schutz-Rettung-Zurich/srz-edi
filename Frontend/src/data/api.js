const backend = process.env.REACT_APP_API;

export function getChangesetsFromAPI(
    token,
    filter
) {
    return getAuthenticatedJson(
        `/aoi/${filter.id}/changesets/`,
        token
    ).then(parseJSON);
}

export function getMyFilters(
    token,
) {
    return getAuthenticatedJson(
        `/aoi`,
        token
    ).then(parseJSON);
}

export function getChngesetsById(token, changesetList) {
    return getAuthenticatedJson(
        `/changesets/?ids=${changesetList.toString()}`,
        token
    ).then(parseJSON);
}

export function getProfile(
    token,
) {
    return getAuthenticatedJson(
        `/users/`,
        token
    ).then(parseJSON);
}

export function getState(
    token,
    filter
) {
    return getAuthenticatedJson(
        `/aoi/${filter.id}/status/`,
        token
    ).then(parseJSON);
}

export function getReleasedFilters(
    token,
) {
    return getAuthenticatedJson(
        `/aoi/released`,
        token
    ).then(parseJSON);
}

export function patchState(
    token,
    filter,
    message
) {
    return fetch(`${backend}/aoi/${filter.id}/status/`, {
        method: "PATCH",
        headers: {
            Authorization: `Token ${token}`,
            "content-type": "application/json",
        },
        body: JSON.stringify(message)
    }).then(checkStatus).then(parseJSON);
}

export function postNewFilterDirect(
    token,
    filter,
) {
    return fetch(`${backend}/aoi/`, {
        method: "POST",
        headers: {
            Authorization: `Token ${token}`,
            "content-type": "application/json",
        },
        body: JSON.stringify(filter)
    }).then(checkStatus).then(parseJSON);
}

export function putNewFilterDirect(
    token,
    filter,
    id,
) {

    return fetch(`${backend}/aoi/${id}/`, {
        method: "PUT",
        headers: {
            Authorization: `Token ${token}`,
            "content-type": "application/json",
        },
        body: JSON.stringify(filter)
    }).then(checkStatus).then(parseJSON);
}

export function deleteFilterDirect(
    token,
    filterid,
) {
    return fetch(`${backend}/aoi/${filterid}/`, {
        method: "DELETE",
        headers: {
            Authorization: `Token ${token}`,
            "content-type": "application/json",
        },
    }).then(checkStatus);
}

export function postLogin() {
    return fetch(`${backend}/social-auth/`, {
        method: "POST",
    }).then(checkStatus).then(parseJSON);
}

function getAuthenticatedJson(endpoint, token) {
    return fetch(`${backend}${endpoint}`, {
        method: "GET",
        headers: {
            Authorization: `Token ${token}`,
            Accept: "application/json",
        }
    }).then(checkStatus);
}

export function postTokenFromAPI(tokens) {
    return fetch(`${backend}/social-auth/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        contenttype: "application/json",
        body: JSON.stringify(tokens)
    }).then(checkStatus).then(parseJSON);
}

export async function postTagTimeout(tag) {
    const keyValue = (tag.split('='));
    const timeout = 8000;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const result = await fetch(
        `https://tagfinder.herokuapp.com/api/tag?key=${keyValue[0]}&value=${keyValue[1]}`, {
            method: "GET",
            signal: controller.signal,
        }).then(checkStatus).then(parseJSON);
    clearTimeout(id);
    return result;
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error: Object = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

function parseJSON(response) {
    return response.json();
}
