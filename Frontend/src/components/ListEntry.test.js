import {render} from "@testing-library/react";
import React from "react";
import ListEntry from "./ListEntry";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "../data/reducers";
import thunkMiddleware from "redux-thunk";
import {actualfilter, getChangesetStatus, getToken, loadChangesetsSucceeded} from "../testHelper/testAction";
import '../i18n';

const changeset = {
    "id": 93002920,
    "type": "Feature",
    "geometry": {
        "coordinates": [[
            [9.4365455, 47.5155412],
            [9.4372953, 47.5155412],
            [9.4372953, 47.5160211],
            [9.4365455, 47.5160211],
            [9.4365455, 47.5155412]]],
        "type": "Polygon"
    },
    "properties": {
        "check_user": null,
        "reasons": [],
        "tags": [],
        "features": [],
        "user": "Geonick",
        "uid": "6087",
        "editor": "iD 2.18.5",
        "comment": "Schlösser und Burgen der Schweiz",
        "comments_count": 0,
        "source": "Not reported",
        "imagery_used": "kt_tg_ortho_2017",
        "date": "2020-10-24T23:59:44Z",
        "create": 0,
        "modify": 1,
        "delete": 0,
        "area": 3.59829020002079e-07,
        "is_suspect": false,
        "harmful": null,
        "checked": false,
        "check_date": null,
        "metadata": {
            "changesets_count": 4525,
            "hashtags": "#CastleProject",
            "locale": "en",
            "host": "https://www.openstreetmap.org/edit"
        }
    }
};

const changeset2 = {
    "id": 93002921,
    "type": "Feature",
    "geometry": {
        "coordinates": [[
            [9.4365455, 47.5155412],
            [9.4372953, 47.5155412],
            [9.4372953, 47.5160211],
            [9.4365455, 47.5160211],
            [9.4365455, 47.5155412]]],
        "type": "Polygon"
    },
    "properties": {
        "check_user": null,
        "reasons": [],
        "tags": [],
        "features": [],
        "user": "Geonick",
        "uid": "6087",
        "editor": "iD 2.18.5",
        "comment": "Schlösser und Burgen der Schweiz",
        "comments_count": 0,
        "source": "Not reported",
        "imagery_used": "kt_tg_ortho_2017",
        "date": "2020-10-24T23:59:44Z",
        "create": 1,
        "modify": 0,
        "delete": 1,
        "area": 3.59829020002079e-07,
        "is_suspect": false,
        "harmful": null,
        "checked": false,
        "check_date": null,
        "metadata": {
            "changesets_count": 4525,
            "hashtags": "#CastleProject",
            "locale": "en",
            "host": "https://www.openstreetmap.org/edit"
        }
    }
};

const changeset3 = {
    "id": 93002923,
    "type": "Feature",
    "geometry": {
        "coordinates": [[
            [9.4365455, 47.5155412],
            [9.4372953, 47.5155412],
            [9.4372953, 47.5160211],
            [9.4365455, 47.5160211],
            [9.4365455, 47.5155412]]],
        "type": "Polygon"
    },
    "properties": {
        "check_user": null,
        "reasons": [],
        "tags": [],
        "features": [],
        "user": "Geonick",
        "uid": "6087",
        "editor": "iD 2.18.5",
        "comment": "Schlösser und Burgen der Schweiz",
        "comments_count": 0,
        "source": "Not reported",
        "imagery_used": "kt_tg_ortho_2017",
        "date": "2020-10-24T23:59:44Z",
        "create": 1,
        "modify": 0,
        "delete": 0,
        "area": 3.59829020002079e-07,
        "is_suspect": false,
        "harmful": null,
        "checked": false,
        "check_date": null,
        "metadata": {
            "changesets_count": 4525,
            "hashtags": "#CastleProject",
            "locale": "en",
            "host": "https://www.openstreetmap.org/edit"
        }
    }
};

describe('<ListEntry>', () => {

    test('render List', () => {
        const store1 = createStore(
            rootReducer,
            applyMiddleware(thunkMiddleware)
        );
        store1.dispatch(getToken());
        store1.dispatch(loadChangesetsSucceeded());
        store1.dispatch(getChangesetStatus());
        store1.dispatch(actualfilter());

        const {getByText} = render(<ListEntry store={store1} changeset={changeset}/>);
        expect(getByText(/93002920/i)).toBeInTheDocument();
    });

    test('categorie middle', () => {
        const store1 = createStore(
            rootReducer,
            applyMiddleware(thunkMiddleware)
        );
        store1.dispatch(getToken());
        store1.dispatch(loadChangesetsSucceeded());
        store1.dispatch(getChangesetStatus());
        store1.dispatch(actualfilter());
        const {getByText} = render(<ListEntry store={store1} changeset={changeset}/>);
        expect(getByText(/Mittel/i)).toBeInTheDocument();
    });

    test('categorie high', () => {
        const store1 = createStore(
            rootReducer,
            applyMiddleware(thunkMiddleware)
        );
        store1.dispatch(getToken());
        store1.dispatch(loadChangesetsSucceeded());
        store1.dispatch(getChangesetStatus());
        store1.dispatch(actualfilter());
        const {getByText} = render(<ListEntry store={store1} changeset={changeset2}/>);
        expect(getByText(/Hoch/i)).toBeInTheDocument();
    });

    test('categorie low', () => {
        const store1 = createStore(
            rootReducer,
            applyMiddleware(thunkMiddleware)
        );
        store1.dispatch(getToken());
        store1.dispatch(loadChangesetsSucceeded());
        store1.dispatch(getChangesetStatus());
        store1.dispatch(actualfilter());
        const {getByText} = render(<ListEntry store={store1} changeset={changeset3}/>);
        expect(getByText(/Gering/i)).toBeInTheDocument();
    });

    test('default state', () => {
        const store1 = createStore(
            rootReducer,
            applyMiddleware(thunkMiddleware)
        );
        store1.dispatch(getToken());
        store1.dispatch(loadChangesetsSucceeded());
        store1.dispatch(getChangesetStatus());
        store1.dispatch(actualfilter());
        const {getByText} = render(<ListEntry store={store1} changeset={changeset}/>);
        expect(getByText(/Aktueller Status: offen/i)).toBeInTheDocument();
    });

});
