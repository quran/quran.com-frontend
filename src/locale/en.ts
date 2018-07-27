import KEYS from './keys';

type Shape = {
  messages: { [key: string]: string };
};

const EN: Shape = {
  messages: {
    local: 'english',
    [KEYS.LOCAL_SITELOCALE]: 'Site Language',
    [KEYS.LOCAL_CHANGELOCALE]:
      'Choose the language you want the site to display in',
    [KEYS.LOCAL_NATIVENAME]: 'English',
    [KEYS.LOCAL_SELECTLABEL]: 'Language',
    [KEYS.SETTING_TITLE]: 'Settings',
    [KEYS.SETTING_CHAPTERS]: 'Surahs',
    [KEYS.SETTING_VERSES]: 'Go to verse',
    [KEYS.SETTING_RECITERS_TITLE]: 'Reciters',
    [KEYS.SETTING_TRANSLATIONS_TITLE]: 'Translations',
    [KEYS.SETTING_TRANSLATIONS_REMOVEALL]: 'Remove all',
    [KEYS.SETTING_TRANSLATIONS_ENGLISH]: 'English',
    [KEYS.SETTING_TRANSLATIONS_OTHER]: 'Other Languages',
    [KEYS.SETTING_FONTSIZE]: 'Font size',
    [KEYS.SETTING_FONTSIZE_ARABIC]: 'Arabic',
    [KEYS.SETTING_READING]: 'Reading',
    [KEYS.SETTING_TOOLTIP]: 'Tooltip content',
    [KEYS.SETTING_TOOLTIP_TITLE]: 'Tooltip display',
    [KEYS.SETTING_TOOLTIP_TRANSLATION]: 'Translation',
    [KEYS.SETTING_TOOLTIP_TRANSLITERATION]: 'Transliteration',
    [KEYS.SETTING_NIGHTMODE]: 'Night Mode',
    [KEYS.SETTING_NIGHTMODE_DAY_TIP]: 'Switch to day mode',
    [KEYS.SETTING_NIGHTMODE_NIGHT_TIP]: 'Switch to night mode',

    [KEYS.VERSE_MEDIA_LECTURE_FROM]: 'Watch video commentary from {from}',
    [KEYS.VERSE_BOOKMARKED]: 'Bookmarked',
    [KEYS.VERSE_BOOKMARK]: 'Bookmark',
    [KEYS.VERSE_NOT_FOUND]: 'Ayah not found',

    [KEYS.SEARCH_PLACEHOLDER]: 'Search "Noah"',
    [KEYS.SEARCH_RESULTHEADING]:
      '{from}-{to} OF <span> {total} </span> SEARCH RESULTS FOR: <span>{query}</span>', // eslint-disable-line max-len
    [KEYS.SEARCH_ERROR]: 'Sorry, there was an error with your search.',
    [KEYS.SEARCH_NOTHING]: 'No search query.',
    [KEYS.SEARCH_NO_RESULT]: 'No results found.',

    [KEYS.CHAPTER_NEXT]: 'NEXT',
    [KEYS.CHAPTER_PREVIOUS]: 'PREVIOUS',
    [KEYS.CHAPTER_INFO]: 'Surah Info',
    [KEYS.CHAPTER_INDEX_HEADING]: 'SURAHS (CHAPTERS)',
    [KEYS.CHAPTER_INDEX_CONTINUE]: 'Continue',
    [KEYS.CHAPTER_INDEX_QUICKLINKS]: 'Quick links',
    [KEYS.CHAPTER_GOTOBEGINNING]: 'Beginning of Surah',
    [KEYS.CHAPTER_READ]: 'Read full Surah',

    [KEYS.AUDIOPLAYER_CURRENTVERSE]: 'Ayah',
    [KEYS.AUDIOPLAYER_NEXT_VERSE]: 'Next Ayah',
    [KEYS.AUDIOPLAYER_PREVIOUS_VERSE]: 'Previous Ayah',
    [KEYS.AUDIOPLAYER_REPEAT_TITLE]: 'TOGGLE REPEAT',
    [KEYS.AUDIOPLAYER_REPEAT_SINGLE]: 'Single',
    [KEYS.AUDIOPLAYER_REPEAT_RANGE]: 'Range',
    [KEYS.AUDIOPLAYER_REPEAT_RANGESTART]: 'From',
    [KEYS.AUDIOPLAYER_REPEAT_RANGEEND]: 'To',
    [KEYS.AUDIOPLAYER_REPEAT_TIMES]: 'Times',
    [KEYS.AUDIOPLAYER_REPEAT_LOOP]: 'loop',
    [KEYS.AUDIOPLAYER_SCROLLBUTTONTIP]:
      'Automatically scrolls to the currently playing ayah', // eslint-disable-line max-len

    [KEYS.APP_LOADING]: 'Loading...',
    [KEYS.ACTIONS_COPY]: 'Copy',
    [KEYS.ACTIONS_COPIED]: 'Copied!',
    [KEYS.ACTIONS_PLAY]: 'Play',
    [KEYS.ACTIONS_PAUSE]: 'Pause',
    [KEYS.ACTIONS_TAFSIRS]: 'Tafsirs',

    [KEYS.NAV_TITLE]: 'Quran',
    [KEYS.NAV_SETTINGS]: 'Settings',
    [KEYS.NAV_CONTRIBUTE]: 'Contribute',
    [KEYS.NAV_ABOUTUS]: 'About us',
    [KEYS.NAV_DEVELOPERS]: 'Developers',
    [KEYS.NAV_USEFULSITES]: 'Useful sites',
    [KEYS.NAV_OTHERLINKS]: 'Other links',
    [KEYS.NAV_CONTACTUS]: 'Contact us',
    [KEYS.NAV_HELP]: 'Help & feedback',
    [KEYS.NAV_ABOUT_QURAN_PROJECT]:
      'Quran.com (also known as The Noble Quran, Al Quran, Holy Quran, Koran) is a pro bono project.', // eslint-disable-line max-len
    [KEYS.NAV_RIGHTSRESERVED]: 'All Rights Reserved',
    [KEYS.NAV_MOBILE]: 'Mobile Apps',
    [KEYS.NAV_NAVIGATE]: 'Navigate',
    [KEYS.NAV_LEGACY_SITE]: 'Legacy Quran.com',
    [KEYS.NAV_BLOG]: 'Blog',

    [KEYS.TAFSIRS_SELECT]: 'Select a tafsir',

    [KEYS.JUZ_INDEX_HEADING]: 'Juz',

    [KEYS.LOGIN_MESSAGE]:
      'Sign in to Quran.com to store all your bookmarks, notes, and activities.',
    [KEYS.ERROR_INVALID_CHAPTER]:
      "Surah is out of range. Please go to <a href='/'> home page</a> and select a Surah",
    [KEYS.ERROR_INVALID_VERSE]:
      "Ayah is out of range. Please go to <a href='/'> home page </a> and select a Surah/Ayah",
    [KEYS.ERROR_NOT_FOUND]: 'Sorry, this page does not exist',
  },
};

export default EN;
