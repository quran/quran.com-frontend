import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { generateShareIcon } from 'react-share';
import { save } from 'redux/actions/auth';
import { push } from 'react-router-redux';

const FacebookIcon = generateShareIcon('facebook');

const Button = styled.button`
  background: #3b5998;
  border-color: #3b5998;
  color: #fff;
  font-weight: 300;
  & > div {
    display: inline-block;
    vertical-align: text-top;
  }
`;

// eslint-disable-next-line
const FacebookTokenButton = ({ save, push }) => {
  let popup = null;
  let interval = null;

  const handleClick = () => {
    popup = window.open(
      '/onequran/omniauth/facebook?omniauth_window_type=newWindow&resource_class=User',
      '_blank'
    ); // eslint-disable-line
    interval = setInterval(
      () => popup.postMessage('requestCredentials', '*'),
      1000
    );

    window.addEventListener(
      'message',
      event => {
        // eslint-disable-line
        if (event.data.uid) {
          save(event.data);
          clearInterval(interval);

          return push('/');
        }

        return null;
      },
      false
    );
  };

  return (
    <Button onClick={handleClick} className="btn btn-default btn-block btn-lg">
      <FacebookIcon
        size={24}
        iconBgStyle={{ fill: 'transparent' }}
        logoFillColor="white"
      />{' '}
      Continue with Facebook
    </Button>
  );
};

export default connect(
  null,
  { save, push }
)(FacebookTokenButton);
