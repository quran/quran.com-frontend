import UserStore from 'stores/UserStore';
import reactCookie from 'react-cookie';

describe('UserStore', function() {
  let storeInstance;

  beforeEach(function() {
    sinon.stub(reactCookie, 'save');

    storeInstance = new UserStore();
  });

  afterEach(function() {
    reactCookie.save.restore();
    storeInstance = undefined;
  });

  it('should have version number', function() {
    expect(storeInstance.version).to.eql('1.0.1');
  });

  it('should save last visit', function() {
    storeInstance.lastVisitReceived({surah: 2, ayah: 50});

    expect(storeInstance.lastVisit).to.eql({surah: 2, ayah: 50});
    expect(reactCookie.save).to.have.been.called;
  });

  it('should save last visit', function() {
    storeInstance.cookiesReceived({
      lastVisit: '2-50',
      quran: 1,
      audio: 1,
      content: '18,19',
      version: '1.0.1'
    });

    expect(storeInstance.lastVisit).to.eql({surah: 2, ayah: 50});
    expect(storeInstance.getContentOptions()).to.eql([18, 19]);
    expect(storeInstance.getAudioOptions()).to.eql(1);
    expect(storeInstance.getQuranOptions()).to.eql(1);
    expect(storeInstance.version).to.eql('1.0.1');
  });
});
