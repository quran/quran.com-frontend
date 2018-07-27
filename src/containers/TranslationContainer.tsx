import { connect } from 'react-redux';
import { fetchFootNote } from '../redux/actions/footNotes';
import Translation from '../components/Translation';

export default connect(
  null,
  { fetchFootNote }
)(Translation);
