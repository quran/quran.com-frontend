

import BaseStore from 'fluxible/addons/BaseStore';
import routesConfig from '../configs/routes';


class ApplicationStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.currentPageName = null;
    this.currentPage = null;
    this.pages = routesConfig;
    this.pageTitle = '';
    this.url = '';
  }
  handlePageTitle(data) {
    this.url = data.get('url');

    if (data.get('title') && data.get('name') !== 'surah') {
      this.pageTitle = data.get('title');
    }
    else if (data.get('name') === 'surah' && this.dispatcher.getStore('SurahsStore').getSurah()){
      if (this.dispatcher.getStore('RouteStore').getCurrentRoute().get('name') === 'surah') {
        let currentSurah = this.dispatcher.getStore('SurahsStore').getSurah();

        this.pageTitle = `Surah ${currentSurah.name.simple} - The Noble Qur'an - القرآن الكريم`;
      }
    }

    this.emitChange();
  }
  getCurrentPageName() {
    return this.currentPageName;
  }
  getPageTitle() {
    return this.pageTitle;
  }
  getUrl() {
    return this.url;
  }
  getPages() {
    return this.pages;
  }
  dehydrate() {
    return {
      currentPageName: this.currentPageName,
      currentPage: this.currentPage,
      pages: this.pages,
      pageTitle: this.pageTitle
    };
  }
  rehydrate(state) {
    this.currentPageName = state.currentPageName;
    this.currentPage = state.currentPage;
    this.pages = state.pages;
    this.pageTitle = state.pageTitle;
  }
}

ApplicationStore.storeName = 'ApplicationStore';
ApplicationStore.handlers = {
  'UPDATE_PAGE_TITLE': 'handlePageTitle',
  'NAVIGATE_SUCCESS': 'handlePageTitle'
};

export default ApplicationStore;
