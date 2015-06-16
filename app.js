import Fluxible from 'fluxible';
import { RouteStore } from 'fluxible-router';
import Application from 'components/Application';
import routes from 'configs/routes';
import ApplicationStore from 'stores/ApplicationStore';
import SurahsStore from 'stores/SurahsStore';
import UserStore from 'stores/UserStore';
import AyahsStore from 'stores/AyahsStore';
import AudioplayerStore from 'stores/AudioplayerStore';

// create new fluxible instance
const app = new Fluxible({
    component: Application
});
// register routes
var MyRouteStore = RouteStore.withStaticRoutes(routes);
app.registerStore(MyRouteStore);

// register other stores
app.registerStore(ApplicationStore);
app.registerStore(SurahsStore);
app.registerStore(UserStore);
app.registerStore(AudioplayerStore);
app.registerStore(AyahsStore);

module.exports = app;
