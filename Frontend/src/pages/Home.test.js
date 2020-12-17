import React from "react";
import Home from './Home';
import {applyMiddleware, createStore} from "redux";
import rootReducer from "../data/reducers";
import {
    fetchMyFilters,
    getToken,
} from "../testHelper/testAction"
import thunkMiddleware from "redux-thunk";
import {render} from "@testing-library/react";
import {Provider} from "react-redux";


describe('<Home>', () => {
    const store = createStore(
        rootReducer,
        applyMiddleware(thunkMiddleware)
    );

    it('renders the Login', () => {
        const {getByText} = render(<Provider store={store}><Home/></Provider>);
        expect(getByText(/Login über OpenStreetMap/i)).toBeInTheDocument();
    });

    it('render with Token', () => {
        store.dispatch(getToken());
        const {getByText} = render(<Provider store={store}><Home/></Provider>);
        expect(getByText(/Loading/i)).toBeInTheDocument();
    });

    it('render with my Filter', () => {
        store.dispatch(fetchMyFilters());
        const {getByText} = render(<Provider store={store}><Home/></Provider>);
        expect(getByText(/Loading/i)).toBeInTheDocument();
    });

});
