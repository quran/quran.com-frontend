/* eslint-disable react/prefer-stateless-function */
import React, { Component, PropTypes } from 'react';
import * as customPropTypes from 'customPropTypes';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { loadFootNote } from 'redux/actions/media';

const Container = styled.div`
  ${props => (props.arabic ? 'text-align: right;' : '')} h4 {
    color: ${props => props.theme.brandPrimary};
    margin-bottom: 5px;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 400;
    @media (max-width: ${props => props.theme.screenMd}) {
      font-size: 12px;
    }
  }
  h2 {
    margin-top: 5px;
    margin-bottom: 25px;
  }
  sup {
    color: ${props => props.theme.brandPrimary};
    cursor: pointer;
  }
`;

class Translation extends Component {
  componentDidMount() {
    const { index } = this.props;
    let trans;

    if (__CLIENT__) {
      trans = document.getElementById(`trans${index}`).children[1]; // eslint-disable-line no-undef
      trans.addEventListener('click', this.fetchFootNote, true);
    }
  }

  componentWillUnmount() {
    // TODO: this is breaking for search! Need to figure out why
    // const { index } = this.props;
    // let trans;
    // if (__CLIENT__) {
    // trans = document.getElementById(`trans${index}`).children[1]; // eslint-disable-line
    // trans.removeEventListener('click', this.fetchFootNote, true);
    // }
  }

  fetchFootNote = (event) => {
    const { loadFootNote } = this.props; // eslint-disable-line no-shadow

    if (event.target.nodeName === 'SUP' && event.target.attributes.foot_note) {
      event.preventDefault();
      loadFootNote(event.target.attributes.foot_note.value);
    }
  };

  render() {
    const { translation, index } = this.props;
    const lang = translation.languageName;
    const isArabic = lang === 'arabic';

    return (
      <Container
        id={`trans${index}`}
        className={`${isArabic && 'arabic'} translation`}
      >
        <h4 className="montserrat">
          {translation.resourceName}
        </h4>
        <h2
          className={`${isArabic
            ? 'text-right'
            : 'text-left'} text-translation times-new`}
        >
          <small
            dangerouslySetInnerHTML={{ __html: translation.text }}
            className={`${lang || 'times-new'}`}
          />
        </h2>
      </Container>
    );
  }
}

Translation.propTypes = {
  translation: customPropTypes.translationType.isRequired,
  index: PropTypes.number,
  loadFootNote: PropTypes.func.isRequired
};

export default connect(
  state => ({}), // eslint-disable-line no-unused-vars
  { loadFootNote }
)(Translation);
