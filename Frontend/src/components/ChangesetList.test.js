import {applyMiddleware, createStore} from "redux";
import rootReducer from "../data/reducers";
import thunkMiddleware from "redux-thunk";
import {
    actualfilter,
    fetchActualChangeset1,
    getChangesetStatus,
    getToken,
    loadChangesetsSucceeded, sort
} from "../testHelper/testAction";
import {render} from "@testing-library/react";
import React from "react";
import ChangesetList from "./ChangesetList";
import {Provider} from "react-redux";

describe('<ChangesetList>', () => {

    test('render List', () => {
        const store1 = createStore(
            rootReducer,
            applyMiddleware(thunkMiddleware)
        );
        store1.dispatch(getToken());
        store1.dispatch(loadChangesetsSucceeded());
        store1.dispatch(getChangesetStatus());
        store1.dispatch(actualfilter());
        store1.dispatch(fetchActualChangeset1());
        store1.dispatch(sort(1));

        const {getByText} = render(<Provider store={store1}><ChangesetList/></Provider>);
        expect(getByText(/93002920/i)).toBeInTheDocument();
    });

    test('render List ordered by date', () => {
        const store1 = createStore(
            rootReducer,
            applyMiddleware(thunkMiddleware)
        );
        store1.dispatch(getToken());
        store1.dispatch(loadChangesetsSucceeded());
        store1.dispatch(getChangesetStatus());
        store1.dispatch(actualfilter());
        store1.dispatch(fetchActualChangeset1());
        store1.dispatch(sort(1));

        const {getByText, container} = render(<Provider store={store1}><ChangesetList/></Provider>);

        const firstId = getByText(/93002920/i);
        const secondId = getByText(/93002356/i);
        const thirdId = getByText(/92999019/i);
        expect(container.firstChild.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0])
            .toBe(firstId);
        expect(container.firstChild.childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0])
            .toBe(secondId);
        expect(container.firstChild.childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[0])
            .toBe(thirdId);
    });

    test('render List ordered by weight', () => {
        const store1 = createStore(
            rootReducer,
            applyMiddleware(thunkMiddleware)
        );
        store1.dispatch(getToken());
        store1.dispatch(loadChangesetsSucceeded());
        store1.dispatch(getChangesetStatus());
        store1.dispatch(actualfilter());
        store1.dispatch(fetchActualChangeset1());
        store1.dispatch(sort(2));

        const {getByText, container} = render(<Provider store={store1}><ChangesetList/></Provider>);

        const firstId = getByText(/92999019/i);
        const secondId = getByText(/93002356/i);
        const thirdId = getByText(/93002920/i);
        expect(container.firstChild.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0])
            .toBe(firstId);
        expect(container.firstChild.childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0])
            .toBe(secondId);
        expect(container.firstChild.childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[0])
            .toBe(thirdId);
    });
});
