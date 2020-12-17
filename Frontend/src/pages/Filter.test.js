import React from "react";
import Home from './Home';
import {applyMiddleware, createStore} from "redux";
import rootReducer from "../data/reducers";
import {} from "../testHelper/testAction"
import thunkMiddleware from "redux-thunk";
import {render} from "@testing-library/react";
import {Provider} from "react-redux";
import Filter from "./Filter";
import {BrowserRouter as Router} from "react-router-dom";
import {actualfilter} from "../testHelper/testAction";


describe('<Filter>', () => {
    const store = createStore(
        rootReducer,
        applyMiddleware(thunkMiddleware)
    );

    const store2 = createStore(
        rootReducer,
        applyMiddleware(thunkMiddleware)
    );

    it('renders new filter', () => {
        const {getByText} = render(<Provider store={store}><Router><Filter/></Router></Provider>);
        expect(getByText(/Neuer Filter/i)).toBeInTheDocument();
    });

    it('renders released filter', () => {
        store2.dispatch(actualfilter(true));
        window.location = "http://localhost:3000/filter";
        const {getByText} = render(<Provider store={store2}><Router><Filter/></Router></Provider>);
        expect(getByText(/Filter Test Filter ansehen/i)).toBeInTheDocument();
    });

    it('renders my filter', () => {
        store.dispatch(actualfilter(false));
        const {getByText} = render(<Router><Provider store={store}><Filter/></Provider></Router>);
        expect(getByText(/Filter Test Filter bearbeiten/i)).toBeInTheDocument();
    });
});
