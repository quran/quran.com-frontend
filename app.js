import Fluxible from 'fluxible';
import Application from 'components/Application';
import routes from 'configs/routes';
import ApplicationStore from 'stores/ApplicationStore';
import SurahsStore from 'stores/SurahsStore';
import UserStore from 'stores/UserStore';
import AyahsStore from 'stores/AyahsStore';
import AudioplayerStore from 'stores/AudioplayerStore';
import React from 'react';

// create new fluxible instance
const app = new Fluxible({
  component: React.createFactory(Application)
});

// register other stores
app.registerStore(ApplicationStore);
app.registerStore(SurahsStore);
app.registerStore(UserStore);
app.registerStore(AudioplayerStore);
app.registerStore(AyahsStore);

export default app;
