import { gql } from 'react-apollo';

import juzFragment from '../fragments/juz';

export default gql`
  query Juzs {
    juzs {
      ...juzFragment
    }
  }

  ${juzFragment}
`;
