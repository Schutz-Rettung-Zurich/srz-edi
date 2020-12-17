import React from 'react';
import {connect} from "react-redux";
import {fetchDeleteFilter} from "../data/actions";
import {useTranslation} from "react-i18next";
import {Button} from "semantic-ui-react";

function DeleteFilters(
    props,
) {
    const {t} = useTranslation();
    return (
        <Button className={props.color ? "FFCCCB" : null}
                onClick={() => props.dispatch(fetchDeleteFilter(props.filter, props.token, t))}>
            {props.content}
        </Button>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.logins.token,
    };
};

export default connect(mapStateToProps)(DeleteFilters)
