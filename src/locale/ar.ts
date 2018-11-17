import KEYS from './keys';

export default {
  messages: {
    local: 'arabic',
    [KEYS.LOCAL_SITELOCALE]: 'اختر لغة الموقع',
    [KEYS.LOCAL_CHANGELOCALE]: 'اختر اللغة التي تود عرض الموقع بها',
    [KEYS.LOCAL_NATIVENAME]: 'العربية',
    [KEYS.LOCAL_SELECTLABEL]: 'اللغة',
    [KEYS.SETTING_TITLE]: 'خيارات',
    [KEYS.SETTING_CHAPTERS]: 'السورة',
    [KEYS.SETTING_VERSES]: 'الذهاب إلى الآية',
    [KEYS.SETTING_RECITERS_TITLE]: 'القراء',
    [KEYS.SETTING_TRANSLATIONS_TITLE]: 'الترجمات',
    [KEYS.SETTING_TRANSLATIONS_REMOVEALL]: 'حذف الكل',
    [KEYS.SETTING_TRANSLATIONS_ENGLISH]: 'الإنجليزية',
    [KEYS.SETTING_TRANSLATIONS_OTHER]: 'لغات اخرى',
    [KEYS.SETTING_FONTSIZE]: 'حجم الخطز',
    [KEYS.SETTING_FONTSIZE_ARABIC]: 'العربية',
    [KEYS.SETTING_READING]: 'قراءة',
    [KEYS.SETTING_TOOLTIP]: 'اتلميح',
    [KEYS.SETTING_TOOLTIP_TITLE]: 'العرض تلميح الأدوات',
    [KEYS.SETTING_TOOLTIP_TRANSLATION]: 'ترجمة',
    [KEYS.SETTING_TOOLTIP_TRANSLITERATION]: 'حرفي',
    [KEYS.SETTING_NIGHTMODE]: 'الوضع الليلي',
    [KEYS.SETTING_NIGHTMODE_DAY_TIP]: 'التبديل إلى الوضع اليوم',
    [KEYS.SETTING_NIGHTMODE_NIGHT_TIP]: 'التبديل إلى الوضع الليلي',

    [KEYS.VERSE_MEDIA_LECTURE_FROM]: 'مشاهدة محاضرة {from}',
    [KEYS.VERSE_BOOKMARKED]: 'إشارة مرجعية',
    [KEYS.VERSE_BOOKMARK]: 'المرجعية',
    [KEYS.VERSE_NOT_FOUND]: 'لم يتم العثور على الآية',
    [KEYS.VERSE_FOOT_NOTE_TITLE]: 'AR Footnote',

    [KEYS.SEARCH_PLACEHOLDER]: 'بحث',
    [KEYS.SEARCH_RESULTHEADING]:
      '{from}-{to} OF <span> {total} </span> SEARCH RESULTS FOR: <span>{query}</span>', // eslint-disable-line max-len
    [KEYS.SEARCH_ERROR]: 'آسف، كان هناك خطأ مع بحثك.',
    [KEYS.SEARCH_NOTHING]: 'لا استعلام البحث',
    [KEYS.SEARCH_NO_RESULT]: 'لا توجد نتائج.ا',

    [KEYS.CHAPTER_NEXT]: 'تالية سورة',
    [KEYS.CHAPTER_PREVIOUS]: 'السابقة سورة',
    [KEYS.CHAPTER_VERSES]: 'AR VERSES',
    [KEYS.CHAPTER_PAGES]: 'AR PAGES',

    [KEYS.CHAPTER_INFO]: 'سورہ معلومات',
    [KEYS.CHAPTER_INDEX_HEADING]: 'السور',
    [KEYS.CHAPTER_INDEX_CONTINUE]: 'استءنف',
    [KEYS.CHAPTER_INDEX_QUICKLINKS]: 'روابط سريعة',
    [KEYS.CHAPTER_GOTOBEGINNING]: 'ابتداء من سورة',
    [KEYS.CHAPTER_READ]: 'قراءة سورة كاملة',

    [KEYS.AUDIOPLAYER_CURRENTVERSE]: 'آية',
    [KEYS.AUDIOPLAYER_NEXT_VERSE]: 'آية القادمة',
    [KEYS.AUDIOPLAYER_PREVIOUS_VERSE]: 'آية السابقة',
    [KEYS.AUDIOPLAYER_REPEAT_TITLE]: 'تكرار التبديل',
    [KEYS.AUDIOPLAYER_REPEAT_SINGLE]: 'وحيد',
    [KEYS.AUDIOPLAYER_REPEAT_RANGE]: 'نطاق',
    [KEYS.AUDIOPLAYER_REPEAT_RANGESTART]: 'من',
    [KEYS.AUDIOPLAYER_REPEAT_RANGEEND]: 'إلى',
    [KEYS.AUDIOPLAYER_REPEAT_TIMES]: 'مرات',
    [KEYS.AUDIOPLAYER_REPEAT_LOOP]: 'أنشوطة',
    [KEYS.AUDIOPLAYER_SCROLLBUTTONTIP]:
      'مخطوطات تلقائيا إلى يلعب حاليا الآية على التحولات ...',

    [KEYS.APP_LOADING]: 'جار التحميل ...',
    [KEYS.ACTIONS_COPY]: 'نسخ',
    [KEYS.ACTIONS_COPIED]: 'نسخه',
    [KEYS.ACTIONS_PLAY]: 'لعب',
    [KEYS.ACTIONS_PAUSE]: 'وقفة',
    [KEYS.ACTIONS_TAFSIRS]: 'تفسير',

    [KEYS.NAV_TITLE]: 'القرآن',
    [KEYS.NAV_SETTINGS]: 'خيارات',
    [KEYS.NAV_CONTRIBUTE]: 'يساهم',
    [KEYS.NAV_ABOUTUS]: 'معلومات عنا',
    [KEYS.NAV_DEVELOPERS]: 'المطورين',
    [KEYS.NAV_USEFULSITES]: 'مواقع مفيدة',
    [KEYS.NAV_OTHERLINKS]: 'روابط اخرى',
    [KEYS.NAV_CONTACTUS]: 'اتصل بنا',
    [KEYS.NAV_HELP]: 'مساعدة وتعليقات',
    [KEYS.NAV_ABOUT_QURAN_PROJECT]:
      'Quran.com المعروف أيضا باسم القرآن الكريم، قناة القرآن الكريم، القرآن الكريم، القرآن الكريم) هو مشروع خيري)', // eslint-disable-line max-len
    [KEYS.NAV_RIGHTSRESERVED]: 'كل الحقوق محفوظة',
    [KEYS.NAV_MOBILE]: 'التليفون المحمول',
    [KEYS.NAV_NAVIGATE]: 'انتقل',
    [KEYS.NAV_LEGACY_SITE]: 'الموقع القديم',
    [KEYS.NAV_BLOG]: 'مدونة',

    [KEYS.TAFSIRS_SELECT]: 'Select a tafsir',

    [KEYS.JUZ_INDEX_HEADING]: 'الجوز',

    [KEYS.LOGIN_MESSAGE]:
      'تسجيل الدخول إلى Quran.com لتخزين كل ما تبذلونه من العناوين والملاحظات والأنشطة.',
    [KEYS.ERROR_INVALID_CHAPTER]:
      "السورة خارج النطاق. الرجاء الانتقال إلى <a href='/'> الصفحة الرئيسية </a> وتحديد سورة",
    [KEYS.ERROR_INVALID_VERSE]:
      "آية خارج النطاق. الرجاء الانتقال إلى <a href='/'> الصفحة الرئيسية </a> وتحديد سورة / آية",
    [KEYS.ERROR_NOT_FOUND]: 'Sorry, this page does not exist',

    [KEYS.NO_SCRIPT_DESCRIPTION]:
      'AR Looks like either your browser does not support Javascript or its disabled. Quran.com workes best with JavaScript enabled. For more instruction on how to enable javascript',

    [KEYS.CLICK_HERE]: 'AR Click here',
  },
};
