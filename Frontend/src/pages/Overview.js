import React, {useEffect} from "react";

import {
    Grid,
    Header,
    Segment,
    Dimmer,
    Loader,
    Button,
} from "semantic-ui-react";

import {connect} from "react-redux";
import {
    fetchChangesets,
    fetchActualChangeset,
    fetchSortChangesets,
    fetchChangesetStatusCheck, fetchChangesetStatus
} from "../data/actions";

import List from "../components/ChangesetList"
import Map from "../components/Map";
import Dropdown from "../components/SortDropdown";
import SrzHeader from "../components/SrzHeader";
import {useTranslation} from "react-i18next";
import Error from "../components/Error";
import UpdateIcon from '@material-ui/icons/Update';

function Overview({
                      changesets,
                      actual,
                      token,
                      filter,
                      totalChangesets,
                      date,
                      isRealesed,
                      filtersError,
                      releasedFiltersError,
                      profileError,
                      tokenError,
                      changesetError,
                      changesetStateError,
                      dispatch,
                  }) {
    const {t} = useTranslation();

    useEffect(() => {
        if (!changesets && filter) {
            dispatch(fetchChangesets(token, filter));
        }
    }, [dispatch, token, changesets, filter]);

    useEffect(() => {
        if (!date && filter && changesets) {
            dispatch(fetchChangesetStatus(token, filter));
        }
    }, [dispatch, token, date, filter, changesets]);

    if ((totalChangesets === null || !date) && !(filtersError || releasedFiltersError || profileError
        || tokenError || changesetError || changesetStateError)) {
        if (!filter) {
            window.location = process.env.REACT_APP_HOME_URL;
        }
        return (
            <Dimmer active inverted>
                <Loader inverted>{t('loading')}</Loader>
            </Dimmer>
        );
    }

    if (!actual && totalChangesets !== 0 && !(filtersError || releasedFiltersError || profileError
        || tokenError || changesetError || changesetStateError)) {
        dispatch(fetchActualChangeset(changesets[0]));
        return (
            <Dimmer active inverted>
                <Loader inverted>{t('loading')}</Loader>
            </Dimmer>
        );
    }

    const handleChange = (event, data) => {
        dispatch(fetchSortChangesets(data));
    };

    const getState = () => {
        dispatch(fetchChangesetStatusCheck(token, filter, changesets));
    };

    if (filtersError || releasedFiltersError || profileError || tokenError || changesetError || changesetStateError) {
        return (
            <Error/>
        )
    }

    return (
        <Segment className="listEntry">
            <Header>
                <SrzHeader text={filter.properties.name} home={true}/>
            </Header>
            <Grid stretched spacing={0} style={{height: '90vh'}}>
                <Grid.Column width={6}>
                    <Segment>
                        <Header as="h2" className="speciale" content={t('overview.changesets')}/>
                        <p className="inline-block">{t('overview.actualStateDescription')}</p>
                        <Button className="inline-block status" onClick={getState}>
                            <div className="flex center">
                                <UpdateIcon fontSize="small"/>
                                <p>
                                    {t('overview.actualState', {
                                        hours: date.getHours(),
                                        minutes: (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
                                    })}
                                </p>
                            </div>
                        </Button>
                        <div className="right">
                            <Dropdown onChange={handleChange}/>
                        </div>
                        {totalChangesets > 0 ? <List className="list"/> : <p>{t('overview.noChnagesets')}</p>}
                    </Segment>
                </Grid.Column>
                <Grid.Column width={10}>
                    <Segment style={{height: '100%'}}>
                        {totalChangesets > 0 ? <Map/> : <p>{t('overview.noChnagesets')}</p>}
                    </Segment>
                </Grid.Column>
            </Grid>
        </Segment>
    );
}

const mapStateToProps = (state) => {
    return {
        changesets: state.changesets.entries,
        actual: state.changeset.actual,
        filter: state.filter.actualfilter,
        isRealesed: state.filter.actualtype,
        totalChangesets: state.changesets.totalChangesets,
        token: state.logins.token,
        date: state.changesetState.date,
        filtersError: state.filters.error,
        releasedFiltersError: state.releasedFilters.error,
        profileError: state.profile.error,
        tokenError: state.logins.error,
        changesetError: state.changesets.error,
        changesetStateError: state.changesetState.errors,
    };
};

export default connect(mapStateToProps)(Overview);
