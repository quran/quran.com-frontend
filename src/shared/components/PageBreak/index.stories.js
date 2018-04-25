import React from 'react';

import { storiesOf } from '@storybook/react';

import PageBreak from './index';

storiesOf('PageBreak', module).add('default', () => <PageBreak pageNum={1} />);
