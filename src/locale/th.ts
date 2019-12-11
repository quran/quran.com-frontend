import KEYS from './keys';

type Shape = {
  messages: { [key: string]: string };
};

const TH: Shape = {
  messages: {
    local: 'ภาษาไทย',
    [KEYS.LOCAL_SITELOCALE]: 'ภาษา',
    [KEYS.LOCAL_CHANGELOCALE]:
      'เลือกภาษาที่ต้องการให้แสดงผล',
    [KEYS.LOCAL_NATIVENAME]: 'ภาษาไทย',
    [KEYS.LOCAL_SELECTLABEL]: 'ภาษา',
    [KEYS.SETTING_TITLE]: 'ตั้งค่า',
    [KEYS.SETTING_CHAPTERS]: 'ซูเราะห์',
    [KEYS.SETTING_VERSES]: 'ไปยังอายะห์',
    [KEYS.SETTING_RECITERS_TITLE]: 'เสียงอ่าน',
    [KEYS.SETTING_TRANSLATIONS_TITLE]: 'คำแปล',
    [KEYS.SETTING_TRANSLATIONS_REMOVEALL]: 'ลบทั้งหมด',
    [KEYS.SETTING_TRANSLATIONS_ENGLISH]: 'ภาษาอังกฤษ',
    [KEYS.SETTING_TRANSLATIONS_OTHER]: 'ภาษาอื่นๆ',
    [KEYS.SETTING_FONTSIZE]: 'ขนาดอักษร',
    [KEYS.SETTING_FONTSIZE_ARABIC]: 'ภาษาอาหรับ',
    [KEYS.SETTING_READING]: 'การอ่าน',
    [KEYS.SETTING_TOOLTIP]: 'เนื้อหาคำอธิบาย',
    [KEYS.SETTING_TOOLTIP_TITLE]: 'แสดงคำอธิบาย',
    [KEYS.SETTING_TOOLTIP_TRANSLATION]: 'คำแปล',
    [KEYS.SETTING_TOOLTIP_TRANSLITERATION]: 'การทับศัพท์',
    [KEYS.SETTING_NIGHTMODE]: 'โหมดกลางคืน',
    [KEYS.SETTING_NIGHTMODE_DAY_TIP]: 'เปลี่ยนเป็นโหมดปกติ',
    [KEYS.SETTING_NIGHTMODE_NIGHT_TIP]: 'เปลี่ยนเป็นโหมดกลางคืน',

    [KEYS.VERSE_MEDIA_LECTURE_FROM]: 'ดูวีดิโออรรถาธิบายจาก {from}',
    [KEYS.VERSE_BOOKMARKED]: 'บุ๊คมาร์กแล้ว',
    [KEYS.VERSE_BOOKMARK]: 'บุ๊คมาร์ก',
    [KEYS.VERSE_NOT_FOUND]: 'ไม่พบอายะห์',
    [KEYS.VERSE_FOOT_NOTE_TITLE]: 'เชิงอรรถ',

    [KEYS.SEARCH_PLACEHOLDER]: 'ค้นหา "นุห์"',
    [KEYS.SEARCH_RESULTHEADING]:
      'ผลการค้นหาที่ {from}-{to} จาก <span> {total} </span> สำหรับ: <span>{query}</span>', // eslint-disable-line max-len
    [KEYS.SEARCH_ERROR]: 'ขออภัย, เกิดข้อผิดพลาดขึ้นในการค้นหา.',
    [KEYS.SEARCH_NOTHING]: 'ไม่พบคำค้นหา.',
    [KEYS.SEARCH_NO_RESULT]: 'ไม่พบผลลัพธ์การค้นหา',

    [KEYS.CHAPTER_NEXT]: 'ถัดไป',
    [KEYS.CHAPTER_PREVIOUS]: 'ก่อนหน้า',
    [KEYS.CHAPTER_VERSES]: 'อายะห์',
    [KEYS.CHAPTER_PAGES]: 'หน้า',
    [KEYS.CHAPTER_INFO]: 'ข้อมูลซูเราะห์',
    [KEYS.CHAPTER_INDEX_HEADING]: 'ซูเราะห์',
    [KEYS.CHAPTER_INDEX_CONTINUE]: 'ถัดไป',
    [KEYS.CHAPTER_INDEX_QUICKLINKS]: 'ลิงค์เชื่อมโยงด่วน',
    [KEYS.CHAPTER_GOTOBEGINNING]: 'ส่วนต้นของซูเราะห์',
    [KEYS.CHAPTER_READ]: 'อ่านทั้งซูเราะห์',

    [KEYS.AUDIOPLAYER_CURRENTVERSE]: 'อายะห์',
    [KEYS.AUDIOPLAYER_NEXT_VERSE]: 'อายะห์ถัดไป',
    [KEYS.AUDIOPLAYER_PREVIOUS_VERSE]: 'อายะห์ก่อนหน้า',
    [KEYS.AUDIOPLAYER_REPEAT_TITLE]: 'เล่นซ้ำ',
    [KEYS.AUDIOPLAYER_REPEAT_SINGLE]: 'อายะห์เดียว',
    [KEYS.AUDIOPLAYER_REPEAT_RANGE]: 'หลายอายะห์',
    [KEYS.AUDIOPLAYER_REPEAT_RANGESTART]: 'จาก',
    [KEYS.AUDIOPLAYER_REPEAT_RANGEEND]: 'ถึง',
    [KEYS.AUDIOPLAYER_REPEAT_TIMES]: 'ครั้ง',
    [KEYS.AUDIOPLAYER_REPEAT_LOOP]: 'เล่นวน',
    [KEYS.AUDIOPLAYER_SCROLLBUTTONTIP]:
      'เลื่อนหน้าลงตามอายะห์ปัจจุบันที่เล่นเสียงอยู่', // eslint-disable-line max-len

    [KEYS.APP_LOADING]: 'กำลังโหลด...',
    [KEYS.ACTIONS_COPY]: 'คัดลอก',
    [KEYS.ACTIONS_COPIED]: 'คัดลอกแล้ว!',
    [KEYS.ACTIONS_PLAY]: 'เล่น',
    [KEYS.ACTIONS_PAUSE]: 'หยุด',
    [KEYS.ACTIONS_TAFSIRS]: 'ตัฟซีร',

    [KEYS.NAV_TITLE]: 'อัลกุรอาน',
    [KEYS.NAV_SETTINGS]: 'ตั้งค่า',
    [KEYS.NAV_CONTRIBUTE]: 'ร่วมพัฒนา',
    [KEYS.NAV_ABOUTUS]: 'เกี่ยวกับเรา',
    [KEYS.NAV_DEVELOPERS]: 'นักพัฒนา',
    [KEYS.NAV_USEFULSITES]: 'เว็บไซต์แนะนำ',
    [KEYS.NAV_OTHERLINKS]: 'ลิงค์อื่นๆ',
    [KEYS.NAV_CONTACTUS]: 'ติดต่อเรา',
    [KEYS.NAV_HELP]: 'แนะนำติชม',
    [KEYS.NAV_ABOUT_QURAN_PROJECT]:
      'Quran.com (หรือที่รู้จักในนาม The Noble Quran, Al Quran, Holy Quran, Koran) เป็นโครงการที่จัดทำขึ้นเพื่อสังคม.', // eslint-disable-line max-len
    [KEYS.NAV_RIGHTSRESERVED]: 'สงวนลิขสิทธิ์ทุกประการ',
    [KEYS.NAV_MOBILE]: 'แอปพลิเคชันมือถือ',
    [KEYS.NAV_NAVIGATE]: 'นำทาง',
    [KEYS.NAV_LEGACY_SITE]: 'Quran.com เวอร์ชั่นเก่า',
    [KEYS.NAV_BLOG]: 'บล็อก',

    [KEYS.TAFSIRS_SELECT]: 'เลือกตัฟซีร',

    [KEYS.JUZ_INDEX_HEADING]: 'ญุซ',

    [KEYS.LOGIN_MESSAGE]:
      'เข้าสู่ระบบของ Quran.com เพื่อบันทึกบุ๊คมาร์ก, โน๊ต, และกิจกรรมต่างๆของคุณ.',
    [KEYS.ERROR_INVALID_CHAPTER]:
      'ซูเราะห์ดังกล่าวไม่มีอยู่ในระบบ. กรุณากลับไปยังหน้าหลัก',
    [KEYS.ERROR_INVALID_VERSE]: 'อายะห์ดังกล่าวไม่มีอยู่ในระบบ. กรุณากลับไปยังหน้าหลัก',
    [KEYS.ERROR_NOT_FOUND]: 'ขออภัย, ไม่พบหน้าดังกล่าว',

    [KEYS.NO_SCRIPT_DESCRIPTION]:
      'ดูเหมือนว่าบราวเซอร์ของคุณไม่รองรับ Javascript หรือปิดการใช้งานไว้. Quran.com ทำงานบน JavaScript. หากต้องการคำแนะนำในการเปิดใช้งาน Javascript',

    [KEYS.CLICK_HERE]: 'คลิ๊กที่นี่',
  },
};

export default TH;
