import {applyMiddleware, createStore} from "redux";
import rootReducer from "../data/reducers";
import thunkMiddleware from "redux-thunk";
import {
    getToken,
} from "../testHelper/testAction";
import {render} from "@testing-library/react";
import React from "react";
import {Provider} from "react-redux";
import Login from "./Login";

describe('<Login>', () => {

    test('render Login', () => {
        const store1 = createStore(
            rootReducer,
            applyMiddleware(thunkMiddleware)
        );

        const {getByText} = render(<Provider store={store1}><Login login={getToken()}/></Provider>);
        expect(getByText(/Login über OpenStreetMap/i)).toBeInTheDocument();
    });

    test('render Login Childes', () => {
        const store1 = createStore(
            rootReducer,
            applyMiddleware(thunkMiddleware)
        );

        const {container} = render(<Provider store={store1}><Login login={getToken()}/></Provider>);
        expect(container.firstChild.childNodes.length).toBe(2);
    });
});
