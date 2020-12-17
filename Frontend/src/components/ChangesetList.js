import React from "react";
import {connect} from "react-redux";
import {fetchActualChangeset} from "../data/actions";
import ListEntry from "./ListEntry";


function ChangesetList(
    props,
) {
    const actualChangeset = props.actual || props.initial;

    const sortChangesets = (a, b) => {
        switch (props.sort) {
            case 1:
                return a.properties.date < b.properties.date;
            case 2:
                if (a.properties.delete < b.properties.delete) return 1;
                if (a.properties.delete > b.properties.delete) return -1;
                if (a.properties.modified > b.properties.modified) return 1;
                if (a.properties.modified < b.properties.modified) return -1;
                if (a.properties.create > b.properties.create) return 1;
                if (a.properties.create < b.properties.create) return -1;
                return 0;
            case 3:
                if (props.newChangesets.includes(a.id.toString())) return -1;
                if (props.newChangesets.includes(b.id.toString())) return 1;
                if (props.editChangesets.includes(a.id.toString())) return -1;
                if (props.editChangesets.includes(b.id.toString())) return 1;
                return -1;
            default:
                return;
        }
    };

    const onClick = (changeset) => {
        props.dispatch(fetchActualChangeset(changeset));
    };

    return (
        <div className="list">
            {
                props.changesets.sort((a, b) => sortChangesets(a, b)).map((changeset) => (
                    <button key={changeset.id} className="listEntry"
                            color={changeset === actualChangeset ? "green2" : "none"}
                            onClick={() => onClick(changeset)}>
                        <ListEntry
                            changeset={changeset}
                        />
                    </button>
                ))}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        changesets: state.changesets.entries,
        actual: state.changeset.actual,
        initial: state.initial,
        sort: state.sort.sort,
        newChangesets: state.changesetState.newChangesets,
        editChangesets: state.changesetState.editChangesets,
        doneChangesets: state.changesetState.doneChangesets,
    }
};

export default connect(mapStateToProps)(ChangesetList);
