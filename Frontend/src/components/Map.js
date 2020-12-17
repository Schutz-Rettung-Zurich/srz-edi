import React from 'react'
import {render} from 'changeset-map';
import 'changeset-map/public/css/style.css';
import './MapStyle.css'
import {connect} from "react-redux";

class Map extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    setMap() {
        let container = document.getElementById('container');
        let changesetMapControl = render(container, this.props.actual.id, {width: '100%', height: '100%'});

        changesetMapControl.on('load', function () {
            changesetMapControl.emit('clearFeature');
            changesetMapControl.on('hashchange', function (geometryType, featureId) {
                return this.props.actual.id;
            });
        })
    }

    componentDidUpdate(prevProp: Object) {
        if (this.props.actual !== prevProp.actual) {
            this.setMap();
        }
    }

    componentDidMount() {
        this.setMap();
    }


    render() {
        return (
            <div id='container'></div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        actual: state.changeset.actual,
    };
};

export default connect(mapStateToProps)(Map);
