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
    fetchLogin,
    fetchMyFilters,
    fetchToken,
    fetchTokenFromStore,
    fetchActualFilter,
    fetchReleasedFilters, fetchMyProfile, fetchChangesets,
} from "../data/actions";
import MouseOverPopover from "../components/MouseOverPopover";
import {FilterList} from "../components/FilterList";
import {useTranslation} from 'react-i18next';
import {Link} from "react-router-dom";
import SrzHeader from "../components/SrzHeader";
import Error from "../components/Error";
import Login from "../components/Login";

function Home({
                  myfilters,
                  releasedFilters,
                  token,
                  oauth_token,
                  totalFilters,
                  totalReleasedFilters,
                  filtersError,
                  dispatch,
                  releasedFiltersError,
                  profileError,
                  tokenError,
                  changesetError,
              }) {

    const {t} = useTranslation();

    useEffect(() => {
        if (totalFilters === null && token) {
            dispatch(fetchMyProfile(token));
            dispatch(fetchMyFilters(token));
        }
    }, [totalFilters, token, dispatch]);

    useEffect(() => {
        if (totalReleasedFilters === null && token) {
            dispatch(fetchReleasedFilters(token));
        }
    }, [totalReleasedFilters, token, dispatch]);

    const urlParams = new URLSearchParams(window.location.search);

    useEffect(() => {
        if (urlParams.has('oauth_verifier')) {
            dispatch(fetchToken(urlParams.get('oauth_verifier'),
                sessionStorage.getItem("oauth_token"),
                sessionStorage.getItem("oauth_token_secret")));
        }
    }, [urlParams, dispatch, token]);

    useEffect(() => {
        if (sessionStorage.getItem("token_monitoring")) {
            dispatch(fetchTokenFromStore(sessionStorage.getItem("token_monitoring")));
        }
    }, [dispatch, token]);

    const login = () => {
        dispatch(fetchLogin());
        if (!oauth_token) {
            return (
                <Dimmer active inverted>
                    <Loader inverted>{t('loading')}</Loader>
                </Dimmer>
            );
        }
    };

    const getChangesets = (filter, isRealesed) => {
        dispatch(fetchActualFilter(filter, isRealesed));
        dispatch(fetchChangesets(token, filter));
    };


    if (!token && !sessionStorage.getItem("token_monitoring")) {
        if (urlParams.has('oauth_verifier')) {
            dispatch(fetchToken(urlParams.get('oauth_verifier'),
                sessionStorage.getItem("oauth_token"),
                sessionStorage.getItem("oauth_token_secret")));
        } else {
            return (
                <Login login={login}/>
            )
        }
    }

    if ((!token || totalFilters === null || totalReleasedFilters === null)
        && filtersError === null && releasedFiltersError === null && profileError === null
        && tokenError === null && changesetError === null) {
        return (
            <Dimmer active inverted>
                <Loader inverted>{t('loading')}</Loader>
            </Dimmer>
        );
    }
    if (filtersError || releasedFiltersError || profileError || tokenError || changesetError) {
        return (
            <Error/>
        )
    }

    return (
        <Segment className="main">
            <SrzHeader text={t('home.title')}/>
            <Grid stretched>
                <Grid.Row stretched>
                    <Segment style={{
                        width: "100%",
                    }}>
                        <Header as="h2" content={t('home.myFilters.title')}/>
                        <MouseOverPopover
                            information={t('home.myFilters.help')}
                        />
                        {totalFilters ? <FilterList
                                onClick={getChangesets}
                                isRealesed={false}
                                filters={myfilters}
                            />
                            : <p>{t('home.myFilters.emptyList')}</p>
                        }
                        <div className="margin">
                            <Button as={Link} to={"/filter/new"}>
                                <p className="newFilter">{t('home.newFilter')}</p>
                            </Button>
                        </div>
                    </Segment>
                </Grid.Row>
                <Grid.Row>
                    <Segment style={{
                        width: "100%",
                    }}>
                        <Header as="h2" content={t('home.releasedFilters.title')}/>
                        <MouseOverPopover
                            information={t('home.releasedFilters.help')}
                        />
                        {totalReleasedFilters ? <FilterList
                                onClick={getChangesets}
                                isRealesed={true}
                                filters={releasedFilters}
                            />
                            : <p>{t('home.releasedFilters.emptyList')}</p>}
                    </Segment>
                </Grid.Row>
            </Grid>
        </Segment>
    );
}

const mapStateToProps = (state) => {
    return {
        myfilters: state.filters.filters,
        token: state.logins.token,
        oauth_token: state.oauth_token,
        totalFilters: state.filters.totalFilters,
        totalReleasedFilters: state.releasedFilters.totalReleasedFilters,
        releasedFilters: state.releasedFilters.releasedFilters,
        filtersError: state.filters.error,
        releasedFiltersError: state.releasedFilters.error,
        profileError: state.profile.error,
        tokenError: state.logins.error,
        changesetError: state.changesets.error,
    };
};

export default connect(mapStateToProps)(Home);
