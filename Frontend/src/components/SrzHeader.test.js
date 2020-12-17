import React from "react";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "../data/reducers";
import thunkMiddleware from "redux-thunk";
import {render} from "@testing-library/react";
import SrzHeader from "./SrzHeader";
import {fetchMyProfile} from "../testHelper/testAction";

describe('<SrzHeader>', () => {
    const store1 = createStore(
        rootReducer,
        applyMiddleware(thunkMiddleware)
    );

    it('renders SrzHeader', () => {
        store1.dispatch(fetchMyProfile());
        const {getByText, container} = render(<Provider store={store1}><SrzHeader text="test"></SrzHeader></Provider>);

        expect(container.firstChild.firstChild.childNodes.length).toBe(3);
    });

    it('renders SrzHeader login', () => {
        store1.dispatch(fetchMyProfile());
        const {getByText, container} = render(<Provider store={store1}><SrzHeader text="login" login={true}></SrzHeader></Provider>);

        expect(container.firstChild.firstChild.childNodes.length).toBe(1);
    });

    test('click logout', () => {
        const store1 = createStore(
            rootReducer,
            applyMiddleware(thunkMiddleware)
        );
        const {getByText} = render(<Provider store={store1}><SrzHeader text="login"></SrzHeader></Provider>);
        const result = getByText(/Logout/i).onClick;
        expect(window.location.href).toBe("http://localhost/");
    });

});
