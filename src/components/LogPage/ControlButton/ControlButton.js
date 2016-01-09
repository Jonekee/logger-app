import React, {Component, PropTypes} from 'react';
import styles from './ControlButton.scss';
import { Icon } from 'components';

export default class ControlButton extends Component {
  static propTypes = {
    iconName: PropTypes.string,
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    onClick: PropTypes.func // ##TODO Make this required
  }

  componentDidUpdate() {
    console.log('ControlButton:cDU');
  }

  render() {
    const { iconName, text, color, onClick } = this.props;
    const colorClass = color ? styles[color] : styles.neutral;
    return (
      <button className={styles.controlButton + ' ' + colorClass} onClick={onClick}>
        <Icon iconName={iconName}/>
        <span>{text}</span>
      </button>
    );
  }
}
