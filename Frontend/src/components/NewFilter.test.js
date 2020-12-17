import {fireEvent, render} from "@testing-library/react";
import React from "react";
import Error from "./Error";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "../data/reducers";
import thunkMiddleware from "redux-thunk";
import {Newfilter} from "./NewFilter";
import {BrowserRouter as Router} from "react-router-dom";

const store1 = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
);

const filter = {
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
};

describe('<NewFilter>', () => {

    test('render NewFilter empty', () => {
        const {getByText} = render(<Provider store={store1}>
            <Router>
                <Newfilter filter={null} action={store1.dispatch} isRealesed={false}/>
            </Router>
        </Provider>);
        expect(getByText(/Filter-Möglichkeiten/i)).toBeInTheDocument();
        expect(getByText(/Filter-Bezeichnung/i)).toBeInTheDocument();
        expect(getByText(/Filter-Freigabe/i)).toBeInTheDocument();
    });

    test('render NewFilter edit Filter', () => {
        const {getByText} = render(<Provider store={store1}>
            <Router>
                <Newfilter filter={filter} action={store1.dispatch} isRealesed={false}/>
            </Router>
        </Provider>);
        expect(getByText(/Filter-Möglichkeiten/i)).toBeInTheDocument();
        expect(getByText(/Filter-Bezeichnung/i)).toBeInTheDocument();
        expect(getByText(/Filter-Freigabe/i)).toBeInTheDocument();
        expect(getByText(/nadine98/i)).toBeInTheDocument();
        expect(getByText(/Zürich/i)).toBeInTheDocument();
        expect(getByText(/wdesd=fgasf/i)).toBeInTheDocument();
        expect(getByText(/ufvgbhnjmk/i)).toBeInTheDocument();
        expect(getByText(/l.ö-ä£/i)).toBeInTheDocument();
    });

    test('click save', () => {
        const {getByText} = render(<Provider store={store1}>
            <Router>
                <Newfilter filter={filter} action={store1.dispatch} isRealesed={false}/>
            </Router>
        </Provider>);
        const result = getByText(/Speichern/i).onClick;
        expect(window.location.href).toBe("http://localhost/");
    });

    test('click back newFilter', () => {
        const {getByText} = render(<Provider store={store1}>
            <Router>
                <Newfilter filter={null} action={store1.dispatch} isRealesed={false}/>
            </Router>
        </Provider>);
        const result = getByText(/Zurück/i).onClick;
        expect(window.location.href).toBe("http://localhost/");
    });


    test('click delete', () => {
        const {getByText} = render(<Provider store={store1}>
            <Router>
                <Newfilter filter={filter} action={store1.dispatch} isRealesed={false}/>
            </Router>
        </Provider>);
        const result = getByText(/Löschen/i).onClick;
        expect(window.location.href).toBe("http://localhost/");
    });

    test('input name validation error', () => {
        const {getByText, getByLabelText} = render(<Provider store={store1}>
            <Router>
                <Newfilter action={store1.dispatch} isRealesed={false}/>
            </Router>
        </Provider>);
        fireEvent.change(getByLabelText(/Name/i), {
            target: {value: ''}
        });
        expect(getByText("Geben Sie einen Namen ein.")).toBeInTheDocument();
    });

    test('input name validation', () => {
        const {queryByText, getByLabelText} = render(<Provider store={store1}>
            <Router>
                <Newfilter action={store1.dispatch} isRealesed={false}/>
            </Router>
        </Provider>);
        fireEvent.change(getByLabelText(/Name/i), {
            target: {value: 'Filter1'}
        });
        expect(queryByText("Geben Sie einen Namen ein.")).toBe(null);
    });

    test('input area validation', () => {
        const {getByText, getByLabelText} = render(<Provider store={store1}>
            <Router>
                <Newfilter action={store1.dispatch} isRealesed={false}/>
            </Router>
        </Provider>);
        fireEvent.click(getByText(/Zug/i));
        expect(getByText("Geben Sie Tags in Form von 'key=value' und einen Kanton ein.")).toBeInTheDocument();
    });

});
