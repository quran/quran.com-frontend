// jscs:disable disallowQuotedKeysInObjects
export default {
  messages: {
    local: 'persian',
    [KEYS.LOCAL_SITELOCALE]: 'زبان سایت',
    [KEYS.LOCAL_CHANGELOCALE]:
      'زبانی که می خواهید سایت را با آن مشاهده کنید انتخاب نمایید',
    [KEYS.LOCAL_NATIVENAME]: 'فارسی',
    [KEYS.LOCAL_SELECTLABEL]: 'زبان',
    [KEYS.SETTING_TITLE]: 'تنظیمات',
    [KEYS.SETTING_CHAPTERS]: 'سوره ها',
    [KEYS.SETTING_VERSES]: 'برو به آیه',
    [KEYS.SETTING_RECITERS_TITLE]: 'قاریان',
    [KEYS.SETTING_TRANSLATIONS_TITLE]: 'ترجمه ها',
    [KEYS.SETTING_TRANSLATIONS_REMOVEALL]: 'حذف همه',
    [KEYS.SETTING_TRANSLATIONS_ENGLISH]: 'انگلیسی',
    [KEYS.SETTING_TRANSLATIONS_OTHER]: 'زبان های دیگر',
    [KEYS.SETTING_FONTSIZE]: 'اندازه فونت',
    [KEYS.SETTING_FONTSIZE_ARABIC]: 'عربی',
    [KEYS.SETTING_READING]: 'قرائت',
    [KEYS.SETTING_TOOLTIP]: 'نکته',
    [KEYS.SETTING_TOOLTIP_TITLE]: 'نمایش نکته',
    [KEYS.SETTING_TOOLTIP_TRANSLATION]: 'ترجمه',
    [KEYS.SETTING_TOOLTIP_TRANSLITERATION]: 'حرف به حرف',
    [KEYS.SETTING_NIGHTMODE]: 'حالت شبانه',
    [KEYS.SETTING_NIGHTMODE_DAY_TIP]: 'بازگشت به حالت روز',
    [KEYS.SETTING_NIGHTMODE_NIGHT_TIP]: 'بازگشت به حالت شبانه',

    [KEYS.VERSE_MEDIA_LECTURE_FROM]: 'مشاهده یک سخنرانی از {from}',
    [KEYS.VERSE_BOOKMARKED]: 'نشانه گذاری شده',
    [KEYS.VERSE_BOOKMARK]: 'نشانه گذاری',
    [KEYS.VERSE_NOT_FOUND]: 'آیه پیدا نشد',

    [KEYS.SEARCH_PLACEHOLDER]: 'جستجو "نوح"',
    [KEYS.SEARCH_RESULTHEADING]:
      '{from}-{to} از <span> {total} </span> نتایج جستجو برای: <span>{query}</span>', // eslint-disable-line max-len
    [KEYS.SEARCH_ERROR]: 'با عرض پوذش، خطایی در جستجوی شما وجود دارد.',
    [KEYS.SEARCH_NOTHING]: 'برای جستجو چیزی یافت نشد.',
    [KEYS.SEARCH_NO_RESULT]: 'هیچ نتیجه ای یافت نشد',

    [KEYS.CHAPTER_NEXT]: 'بعدی',
    [KEYS.CHAPTER_PREVIOUS]: 'قبلی',
    [KEYS.CHAPTER_INFO]: 'اطلاعات سوره',
    [KEYS.CHAPTER_INDEX_HEADING]: 'سوره ها',
    [KEYS.CHAPTER_INDEX_CONTINUE]: 'ادامه',
    [KEYS.CHAPTER_INDEX_QUICKLINKS]: 'لینک های سریع',
    [KEYS.CHAPTER_GOTOBEGINNING]: 'ابتدای سوره',
    [KEYS.CHAPTER_READ]: 'خواندن تمام سوره',

    [KEYS.AUDIOPLAYER_CURRENTVERSE]: 'آیه',
    [KEYS.AUDIOPLAYER_NEXT_VERSE]: 'آیه بعدی',
    [KEYS.AUDIOPLAYER_PREVIOUS_VERSE]: 'آیه قبلی',
    [KEYS.AUDIOPLAYER_REPEAT_TITLE]: 'سوئیچ تکرار',
    [KEYS.AUDIOPLAYER_REPEAT_SINGLE]: 'تک',
    [KEYS.AUDIOPLAYER_REPEAT_RANGE]: 'محدوده',
    [KEYS.AUDIOPLAYER_REPEAT_RANGESTART]: 'از',
    [KEYS.AUDIOPLAYER_REPEAT_RANGEEND]: 'به',
    [KEYS.AUDIOPLAYER_REPEAT_TIMES]: 'دفعه',
    [KEYS.AUDIOPLAYER_REPEAT_LOOP]: 'حلقه',
    [KEYS.AUDIOPLAYER_SCROLLBUTTONTIP]:
      'موقعیت صفحه به صورت اتومانیک به آیه ی در حال قرائت منتقل می شود.', // eslint-disable-line max-len

    [KEYS.APP_LOADING]: 'در حال براگذاری...',
    [KEYS.ACTIONS_COPY]: 'کپی',
    [KEYS.ACTIONS_COPIED]: 'کپی شد!',
    [KEYS.ACTIONS_PLAY]: 'پخش',
    [KEYS.ACTIONS_PAUSE]: 'توقف',

    [KEYS.NAV_TITLE]: 'قرآن',
    [KEYS.NAV_SETTINGS]: 'تنظیمات',
    [KEYS.NAV_CONTRIBUTE]: 'مشارکت',
    [KEYS.NAV_ABOUTUS]: 'درباره ما',
    [KEYS.NAV_DEVELOPERS]: 'توسعه دهندگان',
    [KEYS.NAV_USEFULSITES]: 'سایت های مفید',
    [KEYS.NAV_OTHERLINKS]: 'لینک های دیگر',
    [KEYS.NAV_CONTACTUS]: 'تماس با ما',
    [KEYS.NAV_HELP]: 'راهنما و بازخورد',
    [KEYS.NAV_ABOUT_QURAN_PROJECT]:
      'Quran.com (همچنین معروف به اسم قرآن کریم, قرآن, قرآن مجید, فرقان) یک پروژه خیریه می باشد.', // eslint-disable-line max-len
    [KEYS.NAV_RIGHTSRESERVED]: 'تمام حقوق محفوظ است.',
    [KEYS.NAV_MOBILE]: 'اپلیکیشن های موبایل',
    [KEYS.NAV_NAVIGATE]: 'انتقال',
    [KEYS.NAV_LEGACY_SITE]: 'Quran.com قدیمی',
    [KEYS.NAV_BLOG]: 'وبلاگ',

    [KEYS.JUZ_INDEX_HEADING]: 'جزء',

    [KEYS.LOGIN_MESSAGE]:
      'وارد سایت Quran.com شوید تا تمام نشانه گذاری ها، یادداشت ها و فعالیت های خود را ذخیره کنید.',
    [KEYS.ERROR_INVALID_CHAPTER]:
      "سوره خارج از محدوده می باشد. لطفا مراجعه کنید به <a href='/'> صفحه اصلی</a> و یک سوره را انتخاب کنید",
    [KEYS.ERROR_INVALID_VERSE]:
      "آیه خارج از محدوده می باشد. لطفا مراجعه کنید به <a href='/'> صفحه اصلی </a> و یک سوره/آیه را انتخاب کنید",
  },
};
