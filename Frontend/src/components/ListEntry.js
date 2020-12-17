import React from "react";
import {Dropdown} from "semantic-ui-react";
import {connect} from "react-redux";
import {fetchUpdateChangesetStatus} from "../data/actions";
import {useTranslation} from "react-i18next";
import LinkIcon from '@material-ui/icons/Link';

function ListEntry(
    {
        changeset,
        changesets,
        filter,
        token,
        doneChangesets,
        editChangesets,
        dispatch,
    }
) {
    const {t} = useTranslation();
    const options = [
        {key: 1, text: t('listEntry.optionsState.new'), value: 'newChangesets'},
        {key: 2, text: t('listEntry.optionsState.edit'), value: 'inProgress'},
        {key: 4, text: t('listEntry.optionsState.done'), value: 'finished'}];

    const weight = () => {
        if (changeset.properties.delete > 0) {
            return t('listEntry.weight.high');
        }
        if (changeset.properties.modify > 0) {
            return t('listEntry.weight.middle');
        }
        return t('listEntry.weight.low');
    };

    const getState = (changesetToClassify) => {
        if (doneChangesets.includes(changesetToClassify.id.toString())) {
            return t('listEntry.optionsState.done');
        }
        if (editChangesets.includes(changesetToClassify.id.toString())) {
            return t('listEntry.optionsState.edit');
        }
        return t('listEntry.optionsState.new');
    };

    const handleChange = (event, data) => {
        const message = data.value + "=" + changeset.id;
        dispatch(fetchUpdateChangesetStatus(token, filter, message, changesets));
    };

    return (
        <div>
            <div className="flex sizeChange">
                <a
                    className="App-link"
                    href={"https://www.openstreetmap.org/changeset/" + changeset.id}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h3>{changeset.id}<LinkIcon fontSize="small"/></h3>
                </a>
                <p>{weight()}</p>
            </div>
            <p>{t('listEntry.description', {comment: changeset.properties.comment})}</p>
            <p>{t('listEntry.user', {user: changeset.properties.user})}</p>
            <p>{t('listEntry.date', {date: changeset.properties.date.split("T")[0]})}</p>
            <div className="greenBorder">
                <p>
                    {t('listEntry.state', {state: getState(changeset)})}
                </p>
                <Dropdown
                    width="5em"
                    options={options}
                    placeholder={t('listEntry.changeState')}
                    onChange={(event, data) => handleChange(event, data)}
                />
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        changesets: state.changesets.entries,
        newChangesets: state.changesetState.newChangesets,
        editChangesets: state.changesetState.editChangesets,
        doneChangesets: state.changesetState.doneChangesets,
        filter: state.filter.actualfilter,
        token: state.logins.token,
    };
};

export default connect(mapStateToProps)(ListEntry);
