import React from "react";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "../data/reducers";
import thunkMiddleware from "redux-thunk";
import {render} from "@testing-library/react";
import {FilterList} from "./FilterList";
import {actualfilter, getChangesetStatus} from "../testHelper/testAction";
import {BrowserRouter as Router} from "react-router-dom";


const filters = [{
    "id": "ac65cb3c-e13a-4f64-9f34-d5ccd4a89efb",
    "type": "Feature",
    "geometry": null,
    "properties": {
        "name": "Fetch Test",
        "filters": {
            "usersToTrack": "nadine98",
            "filterArea": "Schaffhausen,Zug,Zürich,Schwyz",
            "filterMember": "ufvgbhnjmk,l.ö-ä£,123",
            "buffer": "69",
            "objectTags": "wdesd=fgasf"
        },
        "date": "2020-12-06T13:53:19.709342Z",
        "changesets_url": "/api/v1/aoi/ac65cb3c-e13a-4f64-9f34-d5ccd4a89efb/changesets/"
    }
}, {
    "id": "da026f21-cace-448a-bf52-589e7b5f38de",
    "type": "Feature",
    "geometry": null,
    "properties": {
        "name": "Test Filter",
        "filters": {
            "filterMember": "nadine98",
            "buffer": 0,
            "usersToTrack": "chnuessli"
        },
        "date": "2020-12-05T20:28:23.612600Z",
        "changesets_url": "/api/v1/aoi/da026f21-cace-448a-bf52-589e7b5f38de/changesets/"
    }
}];

describe('<FilterList>', () => {
    it('renders myFilters', () => {
        const store1 = createStore(
            rootReducer,
            applyMiddleware(thunkMiddleware)
        );
        const getChangesets = (filter, isRealesed) => {
            store1.dispatch(actualfilter(false));
            store1.dispatch(getChangesets());
        };
        const {getByText, container} = render(
            <Router>
                <Provider store={store1}>
                    <FilterList
                        onClick={getChangesets}
                        isRealesed={false}
                        filters={filters}/>
                </Provider>
            </Router>
        );


        expect(getByText(/Fetch Test/i)).toBeInTheDocument();
        expect(getByText(/Test Filter/i)).toBeInTheDocument();
        expect(container.firstChild.firstChild.childNodes.length).toBe(3);
    });
    it('renders releasedFilters', () => {
        const store1 = createStore(
            rootReducer,
            applyMiddleware(thunkMiddleware)
        );
        const getChangesets = (filter, isRealesed) => {
            store1.dispatch(actualfilter(false));
            store1.dispatch(getChangesetStatus());
        };
        const {getByText, container} = render(
            <Router>
                <Provider store={store1}>
                    <FilterList
                        onClick={getChangesets}
                        isRealesed={true}
                        filters={filters}/>
                </Provider>
            </Router>);

        expect(getByText(/Fetch Test/i)).toBeInTheDocument();
        expect(getByText(/Test Filter/i)).toBeInTheDocument();
        expect(container.firstChild.firstChild.childNodes.length).toBe(2);
    });
});
