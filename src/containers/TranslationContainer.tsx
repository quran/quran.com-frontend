import { connect } from 'react-redux';
import { loadFootNote } from '../redux/actions/media';
import Translation from '../components/Translation';

export default connect(
  null,
  { loadFootNote }
)(Translation);
