import React from 'react';
import {Button, Dropdown, Form, Header, Input, Segment} from "semantic-ui-react";
import ChipInput from "material-ui-chip-input";
import * as api from "../data/api";
import {Link} from "react-router-dom";
import './NewFilter.css';
import MouseOverPopover from "./MouseOverPopover";
import DeleteFilters from "./DeleteFilters";
import {Trans, withTranslation} from 'react-i18next';
import FormHelperText from "@material-ui/core/FormHelperText";
import Error from "./Error";
import {postTagTimeout} from "../data/api";

class NewFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.filter ? this.props.filter.properties.name : "",
            filterArea: this.props.filter ?
                (this.props.filter.properties.filters.filterArea ?
                    this.props.filter.properties.filters.filterArea.split(",") : []) : [],
            objectTags: this.props.filter ?
                (this.props.filter.properties.filters.objectTags ?
                    this.props.filter.properties.filters.objectTags.split(",") : []) : [],
            buffer: this.props.filter ? (this.props.filter.properties.filters.buffer || 0) : 0,
            usersToTrack: this.props.filter ?
                (this.props.filter.properties.filters.usersToTrack ?
                    this.props.filter.properties.filters.usersToTrack.split(",") : []) : [],
            filterMember: this.props.filter ?
                (this.props.filter.properties.filters.filterMember ?
                    this.props.filter.properties.filters.filterMember.split(",") : []) : [],
            saveError: null,
            tagError: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleNewSubmit = this.handleNewSubmit.bind(this);
        this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
        this.options = [
            {key: 'ag', text: this.props.t('newFilter.options.aargau'), value: 'Aargau'},
            {key: 'ar', text: this.props.t('newFilter.options.appenzellausserhoden'), value: 'Appenzell Ausserhoden'},
            {key: 'ai', text: this.props.t('newFilter.options.appenzellinnerhoden'), value: 'Appenzell Innerhoden'},
            {key: 'bl', text: this.props.t('newFilter.options.baselland'), value: 'Basel Land'},
            {key: 'bs', text: this.props.t('newFilter.options.baselstadt'), value: 'Basel Stadt'},
            {key: 'be', text: this.props.t('newFilter.options.bern'), value: 'Bern'},
            {key: 'fr', text: this.props.t('newFilter.options.fribourg'), value: 'Fribourg'},
            {key: 'ge', text: this.props.t('newFilter.options.genf'), value: 'Genf'},
            {key: 'gl', text: this.props.t('newFilter.options.glarus'), value: 'Glarus'},
            {key: 'gr', text: this.props.t('newFilter.options.graubunden'), value: 'Graubünden'},
            {key: 'ju', text: this.props.t('newFilter.options.jura'), value: 'Jura'},
            {key: 'lu', text: this.props.t('newFilter.options.luzern'), value: 'Luzern'},
            {key: 'ne', text: this.props.t('newFilter.options.neuenburg'), value: 'Neuenburg'},
            {key: 'nw', text: this.props.t('newFilter.options.nidwalden'), value: 'Nidwalden'},
            {key: 'ow', text: this.props.t('newFilter.options.obwalden'), value: 'Obwalden'},
            {key: 'sh', text: this.props.t('newFilter.options.schaffhausen'), value: 'Schaffhausen'},
            {key: 'sz', text: this.props.t('newFilter.options.schwyz'), value: 'Schwyz'},
            {key: 'so', text: this.props.t('newFilter.options.solothurn'), value: 'Solothurn'},
            {key: 'sg', text: this.props.t('newFilter.options.stgallen'), value: 'St Gallen'},
            {key: 'ti', text: this.props.t('newFilter.options.tessin'), value: 'Tessin'},
            {key: 'tg', text: this.props.t('newFilter.options.thurgau'), value: 'Thurgau'},
            {key: 'ur', text: this.props.t('newFilter.options.uri'), value: 'Uri'},
            {key: 'vd', text: this.props.t('newFilter.options.waadt'), value: 'Waadt'},
            {key: 'vs', text: this.props.t('newFilter.options.wallis'), value: 'Wallis'},
            {key: 'sg', text: this.props.t('newFilter.options.zug'), value: 'Zug'},           
            {key: 'zh', text: this.props.t('newFilter.options.zurich'), value: 'Zürich'}];
    }

    handleChange(event, input) {
        if (input === 1) {
            this.setState({name: event.target.value});
        } else {
            this.setState({buffer: event.target.value})
        }
    }

    handleChange1(event, data) {
        this.setState({filterArea: data.value});
    }

    handleChange2(data, input) {
        let array = [];
        switch (input) {
            case (3):
                array = [...this.state.objectTags];
                array.push(data);
                this.setState({tagError: null});
                if (data === "note=Für Schutz & Rettung u.a einsatzrelevant.") {
                    this.setState({objectTags: array});
                    return
                }
                postTagTimeout(data).then((result) => {
                    if (Object.keys(result).length === 0) {
                        this.setState({tagError: this.props.t('newFilter.actions.negativeTagCheck', {tag: data})});
                    } else {
                        this.setState({objectTags: array});
                    }
                }).catch(() => {
                    this.setState({tagError: this.props.t('newFilter.actions.tagCheckProblem')});
                    this.setState({objectTags: array});
                });
                return;
            case (5):
                array = [...this.state.usersToTrack];
                array.push(data);
                this.setState({usersToTrack: array});
                return;
            case(6):
                array = [...this.state.filterMember];
                array.push(data);
                this.setState({filterMember: array});
                return;
            default:
                return;
        }
    }

    handleDelete(chip, index, input) {
        let array = [];
        switch (input) {
            case (3):
                this.setState({tagError: null});
                array = [...this.state.objectTags];
                array.splice(index, 1);
                this.setState({objectTags: array});
                return;
            case (5):
                array = [...this.state.usersToTrack];
                array.splice(index, 1);
                this.setState({usersToTrack: array});
                return;
            case(6):
                array = [...this.state.filterMember];
                array.splice(index, 1);
                this.setState({filterMember: array});
                return;
            default:
                return;
        }
    }

    getFilter() {
        let filterArea = this.state.filterArea ? this.state.filterArea.join() : null;
        let objectTags = this.state.objectTags ? this.state.objectTags.join() : null;
        let buffer = this.state.buffer ? this.state.buffer : 0;
        let usersToTrack = this.state.usersToTrack ? this.state.usersToTrack.join() : null;
        let filterMember = this.state.filterMember ? this.state.filterMember.join() : null;
        let name = this.state.name;
        return {
            name: name,
            filters: {
                filterArea: filterArea,
                usersToTrack: usersToTrack,
                filterMember: filterMember,
                objectTags: objectTags,
                buffer: buffer
            }
        };
    }

    handleNewSubmit() {
        api.postNewFilterDirect(sessionStorage.getItem("token_monitoring"), this.getFilter())
            .then(() => window.location = process.env.REACT_APP_HOME_URL)
            .catch(() => {
                this.setState({saveError: true})
            });
    }

    handleUpdateSubmit() {
        api.putNewFilterDirect(sessionStorage.getItem("token_monitoring"), this.getFilter(), this.props.filter.id)
            .then(() => window.location = process.env.REACT_APP_HOME_URL)
            .catch(() => {
                this.setState({saveError: true})
            });
    }

    isObjectTagAndFilterAreaValid() {
        if (this.state.filterArea.length !== 0 || this.state.objectTags.length !== 0) {
            if (this.state.filterArea.length === 0) {
                return false
            }
            if (this.state.objectTags.length === 0) {
                return false
            }
            if (this.state.objectTags.length !== 0) {
                for (let i = 0; i < this.state.objectTags.length; i++) {
                    if (this.state.objectTags[i].indexOf("=") === this.state.objectTags[i].length - 1) {
                        return false
                    }
                }
            }
        }
        return true
    }

    isNameValid() {
        return !(this.state.name === null || this.state.name.trim() === "");
    }

    render() {
        const {t} = this.props;
        return (
            <div className="filterEdit">
                {this.state.saveError ? <Error noHeader={true}/> : null}
                <form>
                    {this.state.saveError ? <FormHelperText
                        error={t('newFilter.actions.saveFilterFail', {name: this.state.name})}/> : null}
                    <Segment>
                        <Header as="h2" content={t('newFilter.name.sectionHeader')}/>
                        <MouseOverPopover
                            information={<Trans i18nKey="newFilter.name.inputInformation">
                                <p>Geben Sie zwingend eine Bezeichnung für den Filter ein. Die Bezeichnung muss
                                    einzigartig sein.</p>
                            </Trans>}
                        />
                        <Form.Field>
                            <label>
                                {t('newFilter.name.input')}
                                <Input
                                    error={!this.isNameValid()}
                                    required
                                    placeholder={t('newFilter.name.input')}
                                    value={this.state.name}
                                    onChange={(event) => this.handleChange(event, 1)}
                                    disabled={this.props.isRealesed}
                                />
                                {this.isNameValid() ? null : <FormHelperText
                                    error={!this.isNameValid()}>{t('newFilter.name.inputHelperText')}</FormHelperText>}
                            </label>
                        </Form.Field>
                    </Segment>
                    <Segment>
                        <Header as="h2" content={t('newFilter.filter.sectionHeader')}/>
                        <MouseOverPopover
                            information={<Trans i18nKey="newFilter.filter.inputInformation">
                                <p>Hier können Sie entweder nach Tags oder einem Benutzer filtern.</p>
                                <p>Für einen Filter nach Tag müssen Sie die Felder Kanton und Tags ausfüllen und können
                                    zusätzlich
                                    einen Buffer angeben. Die Tags werden in der Form key=value angegeben und es können
                                    mehrere
                                    Tags angegeben werden. Bei mehreren Tags handelt es sich um eine Oder-Verknüpfung
                                    (Beispiel:
                                    amnety=hospital amenity=fire_station -> Changesets die ein Spital oder eine
                                    Feuerstation
                                    überlagern, werden angezeigt.) Da die Tags Mithilfe von Overpass in eine
                                    Referenzfläche
                                    umgewandelt
                                    werden, muss man die Region eingrenzen. Der Buffer ermöglicht es auch Changesets zu
                                    erhalten,
                                    deren Ausdehnung in der Nähe der zu überwachenden Objekte fällt. (Beispiel: Spital
                                    wird
                                    beobachtet, aber Änderungen an der Zufahrt sollten auch bemerkt werden.)</p>
                                <p>Für einen Filter nach Benutzer muss nur der OSM-Benutzernamen eingegenben werden. Es
                                    werden
                                    anschliessend kantonsunabhängig alle Changesets dieser Person angezeigt.</p>
                                <p>Werden beide Kriterien verwendet, werden nur Changesets zurückgegeben, die auch
                                    beides
                                    erfüllen.</p>
                            </Trans>}
                        />
                        <Segment>
                            <Form.Field>
                                <label>{t('newFilter.filter.tags.input')}
                                    <ChipInput
                                        fullWidth
                                        error={!this.isObjectTagAndFilterAreaValid()}
                                        placeholder={t('newFilter.filter.tags.placeholder')}
                                        value={this.state.objectTags}
                                        onAdd={(data) => this.handleChange2(data, 3)}
                                        onDelete={((chip, index) => this.handleDelete(chip, index, 3))}
                                        disabled={this.props.isRealesed}
                                    />
                                    {this.state.tagError ?
                                        <FormHelperText error={this.state.tagError}>
                                            {this.state.tagError}
                                        </FormHelperText> : null}
                                    {this.isObjectTagAndFilterAreaValid() ? null :
                                        <FormHelperText error={!this.isObjectTagAndFilterAreaValid()}>
                                            {t('newFilter.filter.tags.inputHelperText')}
                                        </FormHelperText>}
                                </label>
                            </Form.Field>
                            <Form.Field>
                                <label>{t('newFilter.filter.area.input')}</label>
                                <Dropdown
                                    placeholder={t('newFilter.filter.area.input')}
                                    error={!this.isObjectTagAndFilterAreaValid()}
                                    value={this.state.filterArea}
                                    fluid multiple selection options={this.options}
                                    onChange={
                                        (event, data) => this.handleChange1(event, data)
                                    }
                                    disabled={this.props.isRealesed}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>{t('newFilter.filter.buffer.input')}
                                    <Input
                                        disaabled={this.state.objectTags}
                                        placeholder={t('newFilter.filter.buffer.placeholder')}
                                        type="number"
                                        value={this.state.buffer}
                                        onChange={
                                            (event) => this.handleChange(event, 2)
                                        }
                                        disabled={this.props.isRealesed}
                                    />
                                </label>
                            </Form.Field>
                        </Segment>
                        <Segment>
                            <Form.Field>
                                <label>{t('newFilter.filter.user.input')}</label>
                                <ChipInput
                                    fullWidth
                                    placeholder={t('newFilter.placeholder')}
                                    value={this.state.usersToTrack}
                                    onAdd={(data) => this.handleChange2(data, 5)}
                                    onDelete={((chip, index) =>
                                        this.handleDelete(chip, index, 5))}
                                    disabled={this.props.isRealesed}
                                />
                            </Form.Field>
                        </Segment>
                    </Segment>
                    <Segment>
                        <Header as="h2" content={t('newFilter.realese.sectionHeader')}/>
                        <MouseOverPopover
                            information={
                                <Trans i18nKey="newFilter.realese.inputInformation">
                                    <p>Den Filter können Sie an ihre Mitarbeiter freigeben, damit man die Meldungen
                                        gemeinsam
                                        abarbeiten kann.</p>
                                    <p>Die Mitarbeiter können den Filter einsehen, aber nicht bearbeiten.</p>
                                </Trans>}
                        />
                        <Form.Field>
                            <label>{t('newFilter.realese.input')}</label>
                            <ChipInput
                                fullWidth
                                placeholder={t('newFilter.placeholder')}
                                value={this.state.filterMember}
                                onAdd={(data) => this.handleChange2(data, 6)}
                                onDelete={((chip, index) => this.handleDelete(chip, index, 6))}
                                disabled={this.props.isRealesed}
                            />
                        </Form.Field>
                    </Segment>
                </form>
                {this.state.saveError ? <Error noHeader={true}/> : null}
                {this.props.isRealesed ? null : <Button
                    floated='right'
                    primary
                    onClick={this.props.filter ? this.handleUpdateSubmit : this.handleNewSubmit}
                    disabled={!this.isObjectTagAndFilterAreaValid() || !this.isNameValid()}>
                    {t('newFilter.actions.saveButton')}
                </Button>}
                <Button as={Link} to="/Home">
                    {t('newFilter.actions.backButton')}
                </Button>
                {this.props.isRealesed || !this.props.filter ? null : <DeleteFilters
                    color={true}
                    filter={this.props.filter}
                    content={t('newFilter.actions.deleteButton')}/>}
            </div>
        );
    }
}

export const Newfilter = withTranslation()(NewFilter);
