import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Alert, { ALERT_TYPES_AS_ARRAY } from '../Alert';
import { MessagesContext } from '../../providers/Messages';

import './styles.scss';

let i = 1;
const getKey = () => (i += 1);

export default class Toast extends PureComponent {
  static propTypes = {
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.node,
        type: PropTypes.oneOf(ALERT_TYPES_AS_ARRAY)
      })
    )
  };

  static defaultProps = {
    messages: []
  };

  render() {
    return (
      <div className="toast">
        <ul className="pr-3 pb-2">
          <MessagesContext.Consumer>
            {messages =>
              messages.list.map(message => {
                return (
                  <Alert key={getKey()} type={message.type}>
                    {message.content}
                  </Alert>
                );
              })
            }
          </MessagesContext.Consumer>
        </ul>
      </div>
    );
  }
}
