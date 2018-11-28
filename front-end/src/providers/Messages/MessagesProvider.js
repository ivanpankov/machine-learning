import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MessagesContext } from './MessagesContext';
import { ALERT_TYPES } from '../../Components/Alert';

const MESSAGE_LIFETIME = 3500;

export class MessagesProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  state = {
    messages: []
  };

  intervalId = 0;

  addMessage = message => {
    if (!message.content) return;
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        const newMessages = [...this.state.messages.slice(1)];
        if (!newMessages.length) {
          clearInterval(this.intervalId);
          this.intervalId = 0;
        }
        this.setState({ messages: newMessages });
      }, MESSAGE_LIFETIME);
    }

    setInterval(() => {
      this.setState({
        messages: [
          {
            content: message.content,
            type: message.type || ALERT_TYPES.PRIMARY
          },
          ...this.state.messages
        ]
      });
    });
  };

  render() {
    return (
      <MessagesContext.Provider
        value={{ list: this.state.messages, addMessage: this.addMessage }}
      >
        {this.props.children}
      </MessagesContext.Provider>
    );
  }
}
