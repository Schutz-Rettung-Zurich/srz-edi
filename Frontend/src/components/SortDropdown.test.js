import {render} from "@testing-library/react";
import React from "react";
import SortDropdown from "./SortDropdown";

describe('<Dropdown>', () => {

    test('render Dropdown', () => {
        const {getByText} = render(<SortDropdown/>);
        expect(getByText(/Neu/i)).toBeInTheDocument();
        expect(getByText(/Gewichtung/i)).toBeInTheDocument();
        expect(getByText(/Status/i)).toBeInTheDocument();
    });
});