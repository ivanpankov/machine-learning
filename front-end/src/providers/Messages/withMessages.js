import React from 'react';
import { MessagesContext } from './MessagesContext';

export const withMessages = Component => props => (
  <MessagesContext.Consumer>
    {messages => <Component {...props} messages={messages} />}
  </MessagesContext.Consumer>
);
