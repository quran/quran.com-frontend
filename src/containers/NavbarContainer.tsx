import { connect } from 'react-redux';
import ReduxState from '../types/ReduxState';
import Navbar from '../components/Navbar';

export const mapStateToProps = (state: ReduxState) => ({
  isNightMode: state.settings.isNightMode,
});

export default connect(mapStateToProps)(Navbar);
