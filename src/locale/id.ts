import KEYS from './keys';

export default {
  messages: {
    local: 'indonesian',
    [KEYS.LOCAL_SITELOCALE]: 'Bahasa Situs',
    [KEYS.LOCAL_CHANGELOCALE]:
      'Pilih bahasa yang diinginkan untuk tampilan situs',
    [KEYS.LOCAL_NATIVENAME]: 'Indonesia',
    [KEYS.LOCAL_SELECTLABEL]: 'Bahasa',
    [KEYS.SETTING_TITLE]: 'Pengaturan',
    [KEYS.SETTING_CHAPTERS]: 'Surat',
    [KEYS.SETTING_VERSES]: 'Pergi ke ayat',
    [KEYS.SETTING_RECITERS_TITLE]: "Qari'",
    [KEYS.SETTING_TRANSLATIONS_TITLE]: 'Terjemahan',
    [KEYS.SETTING_TRANSLATIONS_REMOVEALL]: 'Buang semua',
    [KEYS.SETTING_TRANSLATIONS_ENGLISH]: 'Bahasa Inggris',
    [KEYS.SETTING_TRANSLATIONS_OTHER]: 'Bahasa Lainnya',
    [KEYS.SETTING_FONTSIZE]: 'Ukuran huruf',
    [KEYS.SETTING_FONTSIZE_ARABIC]: 'Arab',
    [KEYS.SETTING_READING]: 'Membaca',
    [KEYS.SETTING_TOOLTIP]: 'Isi tooltip',
    [KEYS.SETTING_TOOLTIP_TITLE]: 'Tampilan Tooltip',
    [KEYS.SETTING_TOOLTIP_TRANSLATION]: 'Terjemahan',
    [KEYS.SETTING_TOOLTIP_TRANSLITERATION]: 'Transliterasi',
    [KEYS.SETTING_NIGHTMODE]: 'Mode Malam',
    [KEYS.SETTING_NIGHTMODE_DAY_TIP]: 'Ganti ke mode terang',
    [KEYS.SETTING_NIGHTMODE_NIGHT_TIP]: 'Ganti ke mode malam',

    [KEYS.VERSE_MEDIA_LECTURE_FROM]: 'Lihat kuliah dari {from}',
    [KEYS.VERSE_BOOKMARKED]: 'Ditandai',
    [KEYS.VERSE_BOOKMARK]: 'Tandai',
    [KEYS.VERSE_NOT_FOUND]: 'Ayat tidak ditemukan',

    [KEYS.SEARCH_PLACEHOLDER]: 'Cari "Nuh"',
    [KEYS.SEARCH_RESULTHEADING]:
      '{from}-{to} DARI <span> {total} </span> HASIL PENCARIAN ATAS: <span>{query}</span>', // eslint-disable-line max-len
    [KEYS.SEARCH_ERROR]: 'Maaf, terdapat kesalahan dalam pencarian Anda.',
    [KEYS.SEARCH_NOTHING]: 'Tidak ada kata yang dicari.',
    [KEYS.SEARCH_NO_RESULT]: 'Tidak ada hasil yang ditemukan.',

    [KEYS.CHAPTER_NEXT]: 'BERIKUTNYA',
    [KEYS.CHAPTER_PREVIOUS]: 'SEBELUMNYA',
    [KEYS.CHAPTER_INFO]: 'Info Surat',
    [KEYS.CHAPTER_INDEX_HEADING]: 'SURAT (JUZ)',
    [KEYS.CHAPTER_INDEX_CONTINUE]: 'Lanjutkan',
    [KEYS.CHAPTER_INDEX_QUICKLINKS]: 'Tautan cepat',
    [KEYS.CHAPTER_GOTOBEGINNING]: 'Awal Surat',
    [KEYS.CHAPTER_READ]: 'Baca lengkap Surah',

    [KEYS.AUDIOPLAYER_CURRENTVERSE]: 'Ayat',
    [KEYS.AUDIOPLAYER_NEXT_VERSE]: 'Ayat Berikutnya',
    [KEYS.AUDIOPLAYER_PREVIOUS_VERSE]: 'Ayat Sebelumnya',
    [KEYS.AUDIOPLAYER_REPEAT_TITLE]: 'PENGULANGAN',
    [KEYS.AUDIOPLAYER_REPEAT_SINGLE]: 'Satu ayat',
    [KEYS.AUDIOPLAYER_REPEAT_RANGE]: 'Rentang',
    [KEYS.AUDIOPLAYER_REPEAT_RANGESTART]: 'Dari',
    [KEYS.AUDIOPLAYER_REPEAT_RANGEEND]: 'Hingga',
    [KEYS.AUDIOPLAYER_REPEAT_TIMES]: 'Kali',
    [KEYS.AUDIOPLAYER_REPEAT_LOOP]: 'tak berhenti',
    [KEYS.AUDIOPLAYER_SCROLLBUTTONTIP]:
      'Gulirkan secara otomatis ke ayat yang sedang diputar pada saat transisi...', // eslint-disable-line max-len

    [KEYS.APP_LOADING]: 'Memuat ...',
    [KEYS.ACTIONS_COPY]: 'Salin',
    [KEYS.ACTIONS_COPIED]: 'Tersalin!',
    [KEYS.ACTIONS_PLAY]: 'Putar',
    [KEYS.ACTIONS_PAUSE]: 'Jeda',

    [KEYS.NAV_TITLE]: 'Quran',
    [KEYS.NAV_SETTINGS]: 'Pengaturan',
    [KEYS.NAV_CONTRIBUTE]: 'Ambil Bagian',
    [KEYS.NAV_ABOUTUS]: 'Tentang kami',
    [KEYS.NAV_DEVELOPERS]: 'Pengembang',
    [KEYS.NAV_USEFULSITES]: 'Situs-situs yang berguna',
    [KEYS.NAV_OTHERLINKS]: 'Tautan lainnya',
    [KEYS.NAV_CONTACTUS]: 'Hubungi kami',
    [KEYS.NAV_HELP]: 'Bantuan & umpan balik',
    [KEYS.NAV_ABOUT_QURAN_PROJECT]:
      'Quran.com (juga dikenal sebagai The Noble Quran, Al Quran, Holy Quran, Koran) adalah sebuah proyek pro bono.', // eslint-disable-line max-len
    [KEYS.NAV_RIGHTSRESERVED]: 'Hak Cipta Terpelihara',
    [KEYS.NAV_MOBILE]: 'Aplikasi Ponsel',
    [KEYS.NAV_NAVIGATE]: 'Telusuri',
    [KEYS.NAV_LEGACY_SITE]: 'Quran.com versi lama',
    [KEYS.NAV_BLOG]: 'Blog',

    [KEYS.JUZ_INDEX_HEADING]: 'Juz',

    [KEYS.LOGIN_MESSAGE]:
      'Masuk ke Quran.com untuk menyimpan semua penanda, catatan, dan aktivitas Anda.',
    [KEYS.ERROR_INVALID_CHAPTER]:
      "Surah berada di luar jangkauan. Silahkan pergi ke <a href='/'> halaman rumah </a> dan pilih sebuah Surah",
    [KEYS.ERROR_INVALID_VERSE]:
      "Ayah berada di luar jangkauan. Silahkan pergi ke <a href='/'> halaman rumah </a> dan pilih Surah / Ayah",
  },
};
