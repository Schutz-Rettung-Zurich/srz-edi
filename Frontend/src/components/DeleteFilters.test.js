import {applyMiddleware, createStore} from "redux";
import rootReducer from "../data/reducers";
import thunkMiddleware from "redux-thunk";
import {
    actualfilter,
    getToken,
    loadChangesetsSucceeded,
} from "../testHelper/testAction";
import {render} from "@testing-library/react";
import React from "react";
import {Provider} from "react-redux";
import DeleteFilters from "./DeleteFilters";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

describe('<DeleteFilters>', () => {

    test('render delete as String', () => {
        const store1 = createStore(
            rootReducer,
            applyMiddleware(thunkMiddleware)
        );
        store1.dispatch(getToken());
        store1.dispatch(loadChangesetsSucceeded());
        store1.dispatch(actualfilter());

        const {getByText} = render(<Provider store={store1}><DeleteFilters content="Löschen"/></Provider>);
        expect(getByText(/Löschen/i)).toBeInTheDocument();
    });

    test('render delete as Icon', () => {
        const store1 = createStore(
            rootReducer,
            applyMiddleware(thunkMiddleware)
        );
        store1.dispatch(getToken());
        store1.dispatch(loadChangesetsSucceeded());
        store1.dispatch(actualfilter());

        const {container} = render(<Provider store={store1}>
            <DeleteFilters content={<DeleteOutlineOutlinedIcon fontSize="small"/>}/>
        </Provider>);
        expect(container.firstChild.childNodes.length === 1).toBeTruthy();
    });

    test('render delete in red', () => {
        const store1 = createStore(
            rootReducer,
            applyMiddleware(thunkMiddleware)
        );
        store1.dispatch(getToken());
        store1.dispatch(loadChangesetsSucceeded());
        store1.dispatch(actualfilter());

        const {container} = render(<Provider store={store1}><DeleteFilters color="true" content="Löschen"/></Provider>);
        expect(container.firstChild.className).toBe("ui button FFCCCB");
    });
});
