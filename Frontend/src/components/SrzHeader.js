import React from "react";
import {Header} from "semantic-ui-react";
import logo from "../schutz-rettung-zurich2.png";
import "./SrzHeader.css"
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";

function SrzHeader({
                       text,
                       login = false,
                       userName,
                   }) {
    const {t} = useTranslation();

    const setZero = () => {
        window.location = process.env.REACT_APP_HOME_URL;
    };

    const logout = () => {
        sessionStorage.removeItem("token_monitoring");
        sessionStorage.removeItem("user_name");
        setZero();
    };

    return (
        <Header>
            <div className="flex green">
                <button className="image" onClick={setZero}><img src={logo} alt="SRZ-Logo"/></button>
                {login ? null : <h1>{text}</h1>}
                {login ? null :
                    <button className="logout" onClick={logout}>{t('srzHeader.logout', {userName: userName})}</button>}
            </div>
        </Header>
    );
}

const mapStateToProps = (state) => {
    return {
        userName: state.profile.username,
    };
};

export default connect(mapStateToProps)(SrzHeader);
