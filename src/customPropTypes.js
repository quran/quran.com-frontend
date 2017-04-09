import { PropTypes } from 'react';

export const bookmarkActions = PropTypes.shape({
    isLoaded: PropTypes.func.isRequired,
    load: PropTypes.func.isRequired,
    addBookmark: PropTypes.func.isRequired,
    removeBookmark: PropTypes.func.isRequired
});

export const mediaActions = PropTypes.shape({
    setMedia: PropTypes.func.isRequired,
    removeMedia: PropTypes.func.isRequired
});

export const audioActions = PropTypes.shape({
    pause: PropTypes.func.isRequired,
    setAyah: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
    setCurrentWord: PropTypes.func.isRequired,
});

export const language = PropTypes.shape({
    beta: PropTypes.bool,
    direction: PropTypes.string.isRequired,
    english: PropTypes.string.isRequired,
    esAnalyzerDefault: PropTypes.string,
    languageCode: PropTypes.string.isRequired,
    priority: PropTypes.number.isRequired,
    unicode: PropTypes.string,
});

export const matchType = PropTypes.shape({
    score: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    languageCode: PropTypes.string.isRequired,
    subType: PropTypes.string.isRequired,
    cardinalityType: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    resourceId: PropTypes.number.isRequired,
    description: PropTypes.string,
    language: language.isRequired,
    sourceId: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    authorId: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    isAvailable: PropTypes.bool
});

export const match = PropTypes.arrayOf(matchType);
