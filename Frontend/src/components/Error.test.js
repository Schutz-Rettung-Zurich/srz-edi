import {render} from "@testing-library/react";
import React from "react";
import Error from "./Error";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "../data/reducers";
import thunkMiddleware from "redux-thunk";

describe('<Error>', () => {

    test('render Error', () => {
        const store1 = createStore(
            rootReducer,
            applyMiddleware(thunkMiddleware)
        );
        const {getByText} = render(<Provider store={store1}><Error/></Provider>);
        expect(getByText(/Fehlermeldung/i)).toBeInTheDocument();
        expect(getByText(/Zurück zu Home/i)).toBeInTheDocument();
    });

    test('click back', () => {
        const store1 = createStore(
            rootReducer,
            applyMiddleware(thunkMiddleware)
        );
        const {getByText} = render(<Provider store={store1}><Error/></Provider>);
        const result = getByText(/Zurück zu Home/i).onClick;
        expect(window.location.href).toBe("http://localhost/");
    });

    test('save Error', () => {
        const store1 = createStore(
            rootReducer,
            applyMiddleware(thunkMiddleware)
        );
        const {getByText} = render(
            <Provider store={store1}>
                <Error message={"Der Filter konnte nicht gespeichert werden."}/>
            </Provider>
        );
        expect(getByText(/Der Filter konnte nicht gespeichert werden./i)).toBeInTheDocument();
    });
});
