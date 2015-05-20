import Fluxible from 'fluxible';
import { RouteStore } from 'fluxible-router';
import Application from 'components/Application';
import routes from 'configs/routes';
import ApplicationStore from 'stores/ApplicationStore';
import SurahsStore from 'stores/SurahsStore';
import UserOptionsStore from 'stores/UserOptionsStore';
import AyahsStore from 'stores/AyahsStore';

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
app.registerStore(UserOptionsStore);
app.registerStore(AyahsStore);

module.exports = app;
