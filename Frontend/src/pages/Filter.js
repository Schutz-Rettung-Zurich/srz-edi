import React from "react";
import {Newfilter} from "../components/NewFilter";
import {connect} from "react-redux";
import {Segment} from "semantic-ui-react";
import SrzHeader from "../components/SrzHeader";
import {useTranslation} from "react-i18next";

function Filter(
    props,
) {
    const {t} = useTranslation();

    return (
        <Segment className="main">
            <SrzHeader
                text={(window.location.href.indexOf("new") === -1 && props.filter) ?
                    (props.isRealesed ? t('filter.titleView', {name: props.filter.properties.name}) :
                        t('filter.titleEdit', {name: props.filter.properties.name})) : t('filter.titleNew')}/>
            <Newfilter
                filter={(window.location.href.indexOf("new") === -1 && props.filter) ? props.filter : null}
                action={props.dispatch}
                isRealesed={(window.location.href.indexOf("new") === -1 && props.filter) ? props.isRealesed : false}/>
        </Segment>
    );
}

const mapStateToProps = (state) => {
    return {
        filter: state.filter.actualfilter,
        isRealesed: state.filter.actualtype,
    };
};

export default connect(mapStateToProps)(Filter);
