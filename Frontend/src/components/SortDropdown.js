import React from "react";
import {Dropdown} from 'semantic-ui-react'
import {useTranslation} from "react-i18next";

function SortDropdown(
    onChange,
) {
    const {t} = useTranslation();
    const options = [
        {key: 1, text: t('sort.new'), value: 1},
        {key: 2, text: t('sort.weight'), value: 2},
        {key: 3, text: t('sort.state'), value: 3},
    ];

    return (
        <Dropdown
            placeholder='sortieren'
            options={options}
            onChange={(event, data) => onChange.onChange(event, data)}
        />
    );
}

export default SortDropdown;
