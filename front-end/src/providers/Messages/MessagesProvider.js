import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { MessagesContext } from './MessagesContext';
import { ALERT_TYPES } from '../../Components/Alert';

const MESSAGE_LIFETIME = 3500;

export function MessagesProvider({ children = null }) {
  const [messages, setMessages] = useState([]);
  const intervalId = useRef(0);

  const addMessage = message => {
    if (!message.content) return;
    if (!intervalId.current) {
      intervalId.current = setInterval(() => {
        const newMessages = [...messages.slice(1)];
        if (!newMessages.length) {
          clearInterval(intervalId.current);
          intervalId.current = 0;
        }
        setMessages(newMessages);
      }, MESSAGE_LIFETIME);
    }

    setTimeout(() => {
      setMessages([
        {
          content: message.content,
          type: message.type || ALERT_TYPES.PRIMARY
        },
        ...messages
      ]);
    });
  };

  return (
    <MessagesContext.Provider
      value={{ list: messages, addMessage: addMessage, ALERT_TYPES }}
    >
      {children}
    </MessagesContext.Provider>
  );
}

MessagesProvider.propTypes = {
  children: PropTypes.node.isRequired
};
