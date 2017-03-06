import React, { PropTypes } from 'react';
import {load as loadFootNote} from 'redux/actions/footNote.js';

const styles = require('./style.scss');

export default class Translation extends React.Component {
  static propTypes = {
    translation: PropTypes.object.isRequired
  };

  handleFootNote = (e) => {
    const footNote = e.target.getAttribute("foot_note");

    console.info(footNote);
    loadFootNote(footNote);
  }

  componentDidMount() {
    if (__CLIENT__) {
      const footNotes = document.getElementsByTagName('sup');

      for(var i=0; i<footNotes.length; i++){
        footNotes[i].addEventListener('click', this.handleFootNote);
      }
    }
  }

  render() {
    const { translation } = this.props;
    const lang = translation.languageName;
    const isArabic = lang === 'arabic';

    return (
      <div
        className={`${styles.translation} ${isArabic && 'arabic'} translation`}
      >
        <h4 className="montserrat">{translation.resourceName}</h4>
        <h2 className={`${isArabic ? 'text-right' : 'text-left'} text-translation times-new`}>
          <small
            dangerouslySetInnerHTML={{ __html: translation.text }}
            className={`${lang || 'times-new'}`}
          />
        </h2>
      </div>
    );
  }
}
