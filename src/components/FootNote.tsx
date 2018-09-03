import React from 'react';
import styled from 'styled-components';
import { FootNoteShape } from '../shapes';
import T, { KEYS } from './T';
import TranslationNode from './TranslationNode';

const FootNoteText = styled.small`
  font-family: ${({ theme }) => theme.fonts.timesNew};
`;

const propTypes = {
  footNote: FootNoteShape.isRequired,
};

type Props = {
  footNote: FootNoteShape;
};

const FootNote: React.SFC<Props> = ({ footNote }: Props) => (
  <TranslationNode>
    <h4 className="montserrat">
      <T id={KEYS.VERSE_FOOT_NOTE_TITLE} />
    </h4>
    <h2 className="text-translation">
      <FootNoteText dangerouslySetInnerHTML={{ __html: footNote.text }} />
    </h2>
  </TranslationNode>
);

FootNote.propTypes = propTypes;

export default FootNote;
