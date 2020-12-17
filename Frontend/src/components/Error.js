import {useTranslation} from "react-i18next";
import {Header, Segment} from "semantic-ui-react";
import React from "react";
import SrzHeader from "./SrzHeader";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";

function Error(
    message = null,
) {
    const {t} = useTranslation();

    const setZero = () => {
        window.location = process.env.REACT_APP_HOME_URL;
    };
    if (Object.keys(message).length === 0) {
        return (
            <Segment className="error">
                <Header>
                    <SrzHeader text={t('error.title')} home={true}/>
                </Header>
                <Segment>
                    <p>{t('error.message')}</p>
                    <p>{t('error.isBackendError')}</p>
                    <Button onClick={setZero}>{t('error.button')}</Button>
                </Segment>
            </Segment>

        );
    }
    return (
        <Segment className="error">
            <Segment>
                <p>{t('newFilter.actions.saveFilterFail')}</p>
            </Segment>
        </Segment>
    );
}

export default Error;
