// jscs:disable disallowQuotedKeysInObjects
export default {
  messages: {
    local: 'shqip',
    [KEYS.LOCAL_SITELOCALE]: 'Gjuha e Faqes',
    [KEYS.LOCAL_CHANGELOCALE]:
      'Zgjidhni gjuhën në të cilën doni ta shihni këtë faqe',
    [KEYS.LOCAL_NATIVENAME]: 'Shqip',
    [KEYS.LOCAL_SELECTLABEL]: 'Gjuha',
    [KEYS.SETTING_TITLE]: 'Opsionet',
    [KEYS.SETTING_CHAPTERS]: 'Suret',
    [KEYS.SETTING_VERSES]: 'Shkoni te ajeti',
    [KEYS.SETTING_RECITERS_TITLE]: 'Recituesit',
    [KEYS.SETTING_TRANSLATIONS_TITLE]: 'Perkthimet',
    [KEYS.SETTING_TRANSLATIONS_REMOVEALL]: 'Fshini të gjitha',
    [KEYS.SETTING_TRANSLATIONS_ENGLISH]: 'Anglisht',
    [KEYS.SETTING_TRANSLATIONS_OTHER]: 'Gjuhë të tjera',
    [KEYS.SETTING_FONTSIZE]: 'Madhësia e shkronjave',
    [KEYS.SETTING_FONTSIZE_ARABIC]: 'Arabisht',
    [KEYS.SETTING_READING]: 'Duke lexuar',
    [KEYS.SETTING_TOOLTIP]: 'Përmbajtja sqaruese',
    [KEYS.SETTING_TOOLTIP_TITLE]: 'Paraqitja e sqarimit',
    [KEYS.SETTING_TOOLTIP_TRANSLATION]: 'Përkthimi',
    [KEYS.SETTING_TOOLTIP_TRANSLITERATION]: 'Transliterimi',
    [KEYS.SETTING_NIGHTMODE]: 'Stili i natës',
    [KEYS.SETTING_NIGHTMODE_DAY_TIP]: 'Kaloni në stilin e ditës',
    [KEYS.SETTING_NIGHTMODE_NIGHT_TIP]: 'Kaloni në stilin e natës',

    [KEYS.VERSE_MEDIA_LECTURE_FROM]: 'Shikoni video komentimin nga {from}',
    [KEYS.VERSE_BOOKMARKED]: 'E ruajtur',
    [KEYS.VERSE_BOOKMARK]: 'Ruaj',
    [KEYS.VERSE_NOT_FOUND]: 'Ajeti nuk u gjet',

    [KEYS.SEARCH_PLACEHOLDER]: 'Kërko "Nuh"',
    [KEYS.SEARCH_RESULTHEADING]:
      '{from}-{to} OF <span> {total} </span> REZULTATET E KËRKIMIT PËR <span>{query}</span>', // eslint-disable-line max-len
    [KEYS.SEARCH_ERROR]: 'Na vjen keq, ndodhi një problem me kërkimin tuaj.',
    [KEYS.SEARCH_NOTHING]:
      'Nuk keni shkruar ndonjë gjë për të filluar kërkimin.',
    [KEYS.SEARCH_NO_RESULT]: 'Nuk u gjet ndonjë rezultat.',

    [KEYS.CHAPTER_NEXT]: 'VAZHDONI',
    [KEYS.CHAPTER_PREVIOUS]: 'KTHEHUNI',
    [KEYS.CHAPTER_INFO]: 'Informacione për Suren',
    [KEYS.CHAPTER_INDEX_HEADING]: 'SURET (KAPITUJT)',
    [KEYS.CHAPTER_INDEX_CONTINUE]: 'Vazhdoni',
    [KEYS.CHAPTER_INDEX_QUICKLINKS]: 'Lidhje të Shpejta',
    [KEYS.CHAPTER_GOTOBEGINNING]: 'Fillimi i Sures',
    [KEYS.CHAPTER_READ]: 'Lexoni Suren e plotë',

    [KEYS.AUDIOPLAYER_CURRENTVERSE]: 'Ajeti',
    [KEYS.AUDIOPLAYER_NEXT_VERSE]: 'Ajeti i Ardhshëm',
    [KEYS.AUDIOPLAYER_PREVIOUS_VERSE]: 'Ajeti i Kaluar',
    [KEYS.AUDIOPLAYER_REPEAT_TITLE]: 'PËRSËRIT',
    [KEYS.AUDIOPLAYER_REPEAT_SINGLE]: 'Single',
    [KEYS.AUDIOPLAYER_REPEAT_RANGE]: 'Intervali',
    [KEYS.AUDIOPLAYER_REPEAT_RANGESTART]: 'Nga',
    [KEYS.AUDIOPLAYER_REPEAT_RANGEEND]: 'Deri',
    [KEYS.AUDIOPLAYER_REPEAT_TIMES]: 'Herë',
    [KEYS.AUDIOPLAYER_REPEAT_LOOP]: 'përsërit',
    [KEYS.AUDIOPLAYER_SCROLLBUTTONTIP]:
      'Zhvendoset automatikisht te ajeti që është duke u lexuar momentalisht', // eslint-disable-line max-len

    [KEYS.APP_LOADING]: 'Duke u hapur...',
    [KEYS.ACTIONS_COPY]: 'Kopjoni',
    [KEYS.ACTIONS_COPIED]: 'U kopjua!',
    [KEYS.ACTIONS_PLAY]: 'Lëshojeni',
    [KEYS.ACTIONS_PAUSE]: 'Ndaleni',
    'actions.tafsir': 'Tefsir',

    tafsirs: 'Tefsir',
    'tafsir.select': 'Zgjidhni një tefsir',

    [KEYS.NAV_TITLE]: 'Kurani',
    [KEYS.NAV_SETTINGS]: 'Opsionet',
    [KEYS.NAV_CONTRIBUTE]: 'Kontribuoni',
    [KEYS.NAV_ABOUTUS]: 'Rreth nesh',
    [KEYS.NAV_DEVELOPERS]: 'Zhvilluesit',
    [KEYS.NAV_USEFULSITES]: 'Faqe të dobishme',
    [KEYS.NAV_OTHERLINKS]: 'Lidhje të tjera',
    [KEYS.NAV_CONTACTUS]: 'Na kontaktoni',
    [KEYS.NAV_HELP]: 'Ndihma & këshillimet',
    [KEYS.NAV_ABOUT_QURAN_PROJECT]:
      "Quran.com (i njohur ndryshe si Kurani Fisnik, Kurani, Kur'ani) është një projekt vullnetar.", // eslint-disable-line max-len
    [KEYS.NAV_RIGHTSRESERVED]: 'Të Gjitha të Drejtat e Rezervuara.',
    [KEYS.NAV_MOBILE]: 'Aplikacionet Mobile',
    [KEYS.NAV_NAVIGATE]: 'Navigoni',
    [KEYS.NAV_LEGACY_SITE]: 'Legacy Quran.com',
    [KEYS.NAV_BLOG]: 'Blog',

    [KEYS.JUZ_INDEX_HEADING]: 'Xhuzi',

    [KEYS.LOGIN_MESSAGE]:
      'Kyçuni në Quran.com për të ruajtur tv gjitha memorizimet, shënimet dhe aktivitetet tuaja',
    [KEYS.ERROR_INVALID_CHAPTER]:
      "Surja është jashtë intervalit. Ju lutemi, shkoni te <a href='/'> faqja fillestare </a> dhe zgjidhni një Sure.",
    [KEYS.ERROR_INVALID_VERSE]:
      "Ajeti është jashtë intervalit. Ju lutemi, shkloni te <a href='/'> faqja fillestare </a> dhe zgjidhni një Sure/Ajet.",
  },
};
