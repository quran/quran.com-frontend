export enum PATHS {
  HOME = '/',
  DONATIONS = '/donations',
  CONTRIBUTIONS = '/contributions',
  ABOUT = '/about',
  CONTACT = '/contact',
  CONTACTUS = '/contactus',
  MOBILE = '/mobile',
  APPS = '/apps',
  SEARCH = '/search',
  ERROR = '/error/:errorKey',
  AYATUL_KURSI = '/ayatul-kursi',
  CHAPTER_INFO = '/:chapterId/info/:language?',
}

export enum CHAPTER_PATHS {
  WITH_COLON = '/:chapterId(\\d+):s(:|-)?:range?',
  WITH_RANGE = '/:chapterId(\\d+)/:range?',
  WITH_TRANSLATIONS = '/:chapterId(\\d+)/:range/:translations',
  WITH_TAFSIR = '/:chapterId(\\d+)/:range/tafsirs/:tafsirId',
}
