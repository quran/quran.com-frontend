import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TranslationNode from './TranslationNode';
import { TranslationShape } from '../shapes';
import { FetchFootNote } from '../redux/actions/footNotes';

const TranslationText = styled.small`
  font-family: ${({ theme }) => theme.fonts.timesNew};
`;

const propTypes = {
  translation: TranslationShape.isRequired,
  fetchFootNote: PropTypes.func.isRequired,
  verseKey: PropTypes.string.isRequired,
};

type Props = {
  translation: TranslationShape;
  fetchFootNote: FetchFootNote;
  verseKey: string;
};

class Translation extends Component<Props> {
  public static propTypes = propTypes;

  handleNodeClick = (event: $TsFixMe) => {
    const { fetchFootNote, verseKey } = this.props;

    if (
      event.target.nodeName === 'SUP' &&
      event.target.attributes.foot_note &&
      fetchFootNote
    ) {
      event.preventDefault();

      fetchFootNote({
        footNoteId: event.target.attributes.foot_note.value,
        verseKey,
      });
    }
  };

  render() {
    const { translation } = this.props;
    const lang = translation.languageName;
    const isArabic = lang === 'arabic';

    return (
      <TranslationNode
        onClick={this.handleNodeClick}
        className={`${isArabic && 'arabic'} translation`}
      >
        <h4 className="montserrat">{translation.resourceName}</h4>
        <h2
          className={`${
            isArabic ? 'text-right' : 'text-left'
          } text-translation`}
        >
          <TranslationText
            className={`${lang || 'times-new'}`}
            dangerouslySetInnerHTML={{ __html: translation.text }}
          />
        </h2>
      </TranslationNode>
    );
  }
}

export default Translation;
