import KEYS from './keys';

export default {
  messages: {
    local: 'arabic',
    [KEYS.LOCAL_SITELOCALE]: 'اختر لغة الموقع',
    [KEYS.LOCAL_CHANGELOCALE]: 'اختر لغة الموقع',
    [KEYS.LOCAL_NATIVENAME]: 'العربية',
    [KEYS.LOCAL_SELECTLABEL]: 'اللغة',
    [KEYS.SETTING_TITLE]: 'خيارات',
    [KEYS.SETTING_CHAPTERS]: 'السورة',
    [KEYS.SETTING_VERSES]: 'انتقال إلى آية',
    [KEYS.SETTING_RECITERS_TITLE]: 'القرّاء',
    [KEYS.SETTING_TRANSLATIONS_TITLE]: 'الترجمات',
    [KEYS.SETTING_TRANSLATIONS_REMOVEALL]: 'حذف الكل',
    [KEYS.SETTING_TRANSLATIONS_ENGLISH]: 'الإنجليزية',
    [KEYS.SETTING_TRANSLATIONS_OTHER]: 'لغات أخرى',
    [KEYS.SETTING_FONTSIZE]: 'حجم الخط',
    [KEYS.SETTING_FONTSIZE_ARABIC]: 'العربية',
    [KEYS.SETTING_READING]: 'قراءة',
    [KEYS.SETTING_TOOLTIP]: 'الاستفهام',
    [KEYS.SETTING_TOOLTIP_TITLE]: 'طريقة الاستفهام عن الكلمات',
    [KEYS.SETTING_TOOLTIP_TRANSLATION]: 'ترجمة معنوية',
    [KEYS.SETTING_TOOLTIP_TRANSLITERATION]: 'ترجمة حرفية',
    [KEYS.SETTING_NIGHTMODE]: 'الوضع الليلي',
    [KEYS.SETTING_NIGHTMODE_DAY_TIP]: 'حَوّل إلى الوضع الصباحي',
    [KEYS.SETTING_NIGHTMODE_NIGHT_TIP]: 'حَوّل إلى الوضع الليلي',

    [KEYS.VERSE_MEDIA_LECTURE_FROM]: 'مشاهدة محاضرة {from}',
    [KEYS.VERSE_BOOKMARKED]: 'لها إشارة مرجعية',
    [KEYS.VERSE_BOOKMARK]: 'وضع إشارة مرجعية',
    [KEYS.VERSE_NOT_FOUND]: 'لم يعثر على الآية',
    [KEYS.VERSE_FOOT_NOTE_TITLE]: 'حاشية',

    [KEYS.SEARCH_PLACEHOLDER]: 'بحث',
    [KEYS.SEARCH_RESULTHEADING]:
      '{from}-{to} من <span> {total} </span> نتائج البحث عن: <span>{query}</span>', // eslint-disable-line max-len
    [KEYS.SEARCH_ERROR]: 'حدث خطأ! أوقف البحث',
    [KEYS.SEARCH_NOTHING]: 'بحث بلا كلمات',
    [KEYS.SEARCH_NO_RESULT]: 'لم يعثر على نتائج',

    [KEYS.CHAPTER_NEXT]: 'السورة التالية',
    [KEYS.CHAPTER_PREVIOUS]: 'السورة السابقة',
    [KEYS.CHAPTER_VERSES]: 'الآيات',
    [KEYS.CHAPTER_PAGES]: 'الصفحات',

    [KEYS.CHAPTER_INFO]: 'معلومات السورة',
    [KEYS.CHAPTER_INDEX_HEADING]: 'السور',
    [KEYS.CHAPTER_INDEX_CONTINUE]: 'استئناف',
    [KEYS.CHAPTER_INDEX_QUICKLINKS]: 'روابط سريعة',
    [KEYS.CHAPTER_GOTOBEGINNING]: 'ابتداء من سورة',
    [KEYS.CHAPTER_READ]: 'قراءة سورة كاملة',

    [KEYS.AUDIOPLAYER_CURRENTVERSE]: 'آية',
    [KEYS.AUDIOPLAYER_NEXT_VERSE]: 'الآية التالية',
    [KEYS.AUDIOPLAYER_PREVIOUS_VERSE]: 'الآية السابقة',
    [KEYS.AUDIOPLAYER_REPEAT_TITLE]: 'وضع التكرار',
    [KEYS.AUDIOPLAYER_REPEAT_SINGLE]: 'وضع عدم التكرار',
    [KEYS.AUDIOPLAYER_REPEAT_RANGE]: 'النطاق',
    [KEYS.AUDIOPLAYER_REPEAT_RANGESTART]: 'من',
    [KEYS.AUDIOPLAYER_REPEAT_RANGEEND]: 'إلى',
    [KEYS.AUDIOPLAYER_REPEAT_TIMES]: 'مرات',
    [KEYS.AUDIOPLAYER_REPEAT_LOOP]: 'حلقة',
    [KEYS.AUDIOPLAYER_SCROLLBUTTONTIP]:
      'مخطوطات تلقائيا إلى يلعب حاليا الآية على التحولات ...',

    [KEYS.APP_LOADING]: 'جار التحميل ...',
    [KEYS.ACTIONS_COPY]: 'نسخ',
    [KEYS.ACTIONS_COPIED]: 'تم النسخ',
    [KEYS.ACTIONS_PLAY]: 'تشغيل',
    [KEYS.ACTIONS_PAUSE]: 'إيقاف',
    [KEYS.ACTIONS_TAFSIRS]: 'تفسير',

    [KEYS.NAV_TITLE]: 'القرآن',
    [KEYS.NAV_SETTINGS]: 'خيارات',
    [KEYS.NAV_CONTRIBUTE]: 'ساهم',
    [KEYS.NAV_ABOUTUS]: 'عن الموقع',
    [KEYS.NAV_DEVELOPERS]: 'المطورون',
    [KEYS.NAV_USEFULSITES]: 'مواقع مفيدة',
    [KEYS.NAV_OTHERLINKS]: 'روابط اخرى',
    [KEYS.NAV_CONTACTUS]: 'اتصل بنا',
    [KEYS.NAV_HELP]: 'المساعدة والملاحظات',
    [KEYS.NAV_ABOUT_QURAN_PROJECT]:
      'Quran.com المعروف أيضا باسم القرآن الكريم) هو مشروع خيري)', // eslint-disable-line max-len
    [KEYS.NAV_RIGHTSRESERVED]: 'كل الحقوق محفوظة',
    [KEYS.NAV_MOBILE]: 'تطبيق الجوال',
    [KEYS.NAV_NAVIGATE]: 'انتقال',
    [KEYS.NAV_LEGACY_SITE]: 'الموقع القديم',
    [KEYS.NAV_BLOG]: 'المدونة',

    [KEYS.TAFSIRS_SELECT]: 'اختر التفسير',

    [KEYS.JUZ_INDEX_HEADING]: 'الجزء',

    [KEYS.LOGIN_MESSAGE]:
      'لتخزين عناوينك وملاحظاتك وأنشطتك، سجل دخولك في الموقع Quran.com',
    [KEYS.ERROR_INVALID_CHAPTER]:
      "السورة خارج النطاق. الرجاء الانتقال إلى <a href='/'> الصفحة الرئيسة </a> وتحديد سورة",
    [KEYS.ERROR_INVALID_VERSE]:
      "آية خارج النطاق. الرجاء الانتقال إلى <a href='/'> الصفحة الرئيسة </a> وتحديد سورة / آية",
    [KEYS.ERROR_NOT_FOUND]: 'عذرا، الصفحة غير موجودة',

    [KEYS.NO_SCRIPT_DESCRIPTION]:
      'يبدو أن متصفحك لا يدعم جافا سكريبت أو أنه معطل. Quran.com يعمل بشكل أفضل مع تمكين JavaScript. لمزيد من التعليمات حول كيفية تمكين Javascript',
    [KEYS.CLICK_HERE]: 'انقر هنا',
  },
};
