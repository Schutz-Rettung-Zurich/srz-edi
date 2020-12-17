import SrzHeader from "./SrzHeader";
import {Button, Grid, Header, Segment} from "semantic-ui-react";
import React from "react";
import {useTranslation} from "react-i18next";

function Login(
    props,
) {
    const {t} = useTranslation();
    return (
        <Segment>
            <SrzHeader login={true}/>
            <Grid className="LoginScreen" centered>
                <Grid.Column>
                    <div>
                        <Header as="h3" content={t('login.description')} align="center"/>
                        <Button onClick={() => props.login()}>{t('login.login')}</Button>
                    </div>
                </Grid.Column>
            </Grid>
        </Segment>

    );
}

export default Login;
