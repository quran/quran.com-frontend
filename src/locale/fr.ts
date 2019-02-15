import KEYS from './keys';

export default {
  messages: {
    local: 'french',
    [KEYS.LOCAL_SITELOCALE]: 'Langue du Site',
    [KEYS.LOCAL_CHANGELOCALE]: 'Choisir la langue du site',
    [KEYS.LOCAL_NATIVENAME]: 'Français',
    [KEYS.LOCAL_SELECTLABEL]: 'Langue',
    [KEYS.SETTING_TITLE]: 'Paramètres',
    [KEYS.SETTING_CHAPTERS]: 'Sourates',
    [KEYS.SETTING_VERSES]: 'Aller au verset',
    [KEYS.SETTING_RECITERS_TITLE]: 'Récitateurs',
    [KEYS.SETTING_TRANSLATIONS_TITLE]: 'Traductions',
    [KEYS.SETTING_TRANSLATIONS_REMOVEALL]: 'Tout désélectionner',
    [KEYS.SETTING_TRANSLATIONS_ENGLISH]: 'Anglais',
    [KEYS.SETTING_TRANSLATIONS_OTHER]: 'Autres Langues',
    [KEYS.SETTING_FONTSIZE]: 'Taille de la police',
    [KEYS.SETTING_FONTSIZE_ARABIC]: 'Arabe',
    [KEYS.SETTING_READING]: 'Lecture',
    [KEYS.SETTING_TOOLTIP]: 'Contenu de l’infobulle',
    [KEYS.SETTING_TOOLTIP_TITLE]: 'Affichage de l’infobulle',
    [KEYS.SETTING_TOOLTIP_TRANSLATION]: 'Traduction',
    [KEYS.SETTING_TOOLTIP_TRANSLITERATION]: 'Translittération',
    [KEYS.SETTING_NIGHTMODE]: 'Mode Nuit',
    [KEYS.SETTING_NIGHTMODE_DAY_TIP]: 'Passer en mode jour',
    [KEYS.SETTING_NIGHTMODE_NIGHT_TIP]: ' Passer en mode nuit',

    [KEYS.VERSE_MEDIA_LECTURE_FROM]:
      'Regarder les commentaires de la vidéo depuis {from}',
    [KEYS.VERSE_BOOKMARKED]: 'Favoris ajouté',
    [KEYS.VERSE_BOOKMARK]: 'Favoris',
    [KEYS.VERSE_NOT_FOUND]: 'Verset introuvable',

    [KEYS.SEARCH_PLACEHOLDER]: 'Chercher "Noah"',
    [KEYS.SEARCH_RESULTHEADING]:
      '{from}-{to} DE <span> {total} </span> RESULTATS DE LA RECHERCHE POUR : <span>{query}</span>', // eslint-disable-line max-len
    [KEYS.SEARCH_ERROR]:
      'Désolé, une erreur s’est produite lors de votre recherche.',
    [KEYS.SEARCH_NOTHING]: 'Aucune requête de recherche.',
    [KEYS.SEARCH_NO_RESULT]: 'Aucun résultat trouvé.',

    [KEYS.CHAPTER_NEXT]: 'SUIVANT',
    [KEYS.CHAPTER_PREVIOUS]: 'PRECEDENT',
    [KEYS.CHAPTER_INFO]: 'Info Sourate',
    [KEYS.CHAPTER_INDEX_HEADING]: 'SOURATES (CHAPITRES)',
    [KEYS.CHAPTER_INDEX_CONTINUE]: 'Continuer',
    [KEYS.CHAPTER_INDEX_QUICKLINKS]: 'Liens rapides',
    [KEYS.CHAPTER_GOTOBEGINNING]: 'Début de la Sourate',
    [KEYS.CHAPTER_READ]: 'Lire la sourate complète',

    [KEYS.AUDIOPLAYER_CURRENTVERSE]: 'Verset',
    [KEYS.AUDIOPLAYER_NEXT_VERSE]: 'Prochain Verset',
    [KEYS.AUDIOPLAYER_PREVIOUS_VERSE]: 'Verset Précèdent',
    [KEYS.AUDIOPLAYER_REPEAT_TITLE]: 'ACTIVER REPETITION',
    [KEYS.AUDIOPLAYER_REPEAT_SINGLE]: 'Une fois',
    [KEYS.AUDIOPLAYER_REPEAT_RANGE]: 'Plage',
    [KEYS.AUDIOPLAYER_REPEAT_RANGESTART]: 'De',
    [KEYS.AUDIOPLAYER_REPEAT_RANGEEND]: 'A',
    [KEYS.AUDIOPLAYER_REPEAT_TIMES]: 'Fois',
    [KEYS.AUDIOPLAYER_REPEAT_LOOP]: 'boucle',
    [KEYS.AUDIOPLAYER_SCROLLBUTTONTIP]:
      'Défiler automatiquement jusqu’au verset en cours de lecture', // eslint-disable-line max-len

    [KEYS.APP_LOADING]: 'Chargement...',
    [KEYS.ACTIONS_COPY]: 'Copier',
    [KEYS.ACTIONS_COPIED]: 'Copié !',
    [KEYS.ACTIONS_PLAY]: 'Lecture',
    [KEYS.ACTIONS_PAUSE]: 'Pause',

    [KEYS.NAV_TITLE]: 'Coran',
    [KEYS.NAV_SETTINGS]: 'Paramètres',
    [KEYS.NAV_CONTRIBUTE]: 'Contribuer',
    [KEYS.NAV_ABOUTUS]: 'Qui sommes-nous',
    [KEYS.NAV_DEVELOPERS]: 'Développeurs',
    [KEYS.NAV_USEFULSITES]: 'Sites utiles',
    [KEYS.NAV_OTHERLINKS]: 'Autre liens',
    [KEYS.NAV_CONTACTUS]: 'Contacter nous',
    [KEYS.NAV_HELP]: 'Aide et feedback',
    [KEYS.NAV_ABOUT_QURAN_PROJECT]:
      'Quran.com (connu aussi sous le nom The Noble Quran, Al Quran, Holy Quran, Koran) est un projet à but non-lucratif.', // eslint-disable-line max-len
    [KEYS.NAV_RIGHTSRESERVED]: 'Tous droits réservés',
    [KEYS.NAV_MOBILE]: 'Applications Mobile',
    [KEYS.NAV_NAVIGATE]: 'Naviguer',
    [KEYS.NAV_LEGACY_SITE]: 'Version précédente de Quran.com',
    [KEYS.NAV_BLOG]: 'Blog',

    [KEYS.JUZ_INDEX_HEADING]: 'Juz',

    [KEYS.LOGIN_MESSAGE]:
      'Identifiez-vous sur Quran.com pour enregistrer tous vos favoris, notes et activités. ',
    [KEYS.ERROR_INVALID_CHAPTER]:
      "La sourate est hors de portée. Accédez à <a href='/'> page d'accueil </a> et sélectionnez une Sourate",
    [KEYS.ERROR_INVALID_VERSE]:
      "Ayah est hors de portée. Accédez à la <a href='/'> page d'accueil </a> et sélectionnez un Surah / Ayah",
  },
};
