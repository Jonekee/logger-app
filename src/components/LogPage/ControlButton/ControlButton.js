import React, {Component, PropTypes} from 'react';
import styles from './ControlButton.scss';
import { Icon } from 'components';

export default class ControlButton extends Component {
  static propTypes = {
    iconName: PropTypes.string,
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    action: PropTypes.func // ##TODO Make this required
  }

  render() {
    const { iconName, text, color } = this.props;
    const colorClass = color ? styles[color] : styles.neutral;
    return (
      <button className={styles.controlButton + ' ' + colorClass}>
        <Icon iconName={iconName}/>
        <span>{text}</span>
      </button>
    );
  }
}
