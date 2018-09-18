import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TranslationNode from './TranslationNode';
import { TranslationShape } from '../shapes';
import { FetchFootNote } from '../redux/actions/footNotes';

const TranslationText = styled.small<{ isNightMode?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.timesNew};
  color: ${({ theme, isNightMode }) => isNightMode ? theme.colors.white : theme.colors.gray};
`;

const propTypes = {
  translation: TranslationShape.isRequired,
  fetchFootNote: PropTypes.func.isRequired,
  verseKey: PropTypes.string.isRequired,
  isNightMode: PropTypes.bool
};

type Props = {
  translation: TranslationShape;
  fetchFootNote: FetchFootNote;
  verseKey: string;
  isNightMode: boolean;
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
    const { translation, isNightMode } = this.props;
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
            isNightMode={isNightMode}
            dangerouslySetInnerHTML={{ __html: translation.text }}
          />
        </h2>
      </TranslationNode>
    );
  }
}

export default Translation;
