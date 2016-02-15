import React, {Component, PropTypes} from 'react';
import styles from './ControlButton.scss';
import { Icon } from '../../components';

export default class ControlButton extends Component {
  static propTypes = {
    iconName: PropTypes.string,
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    onClick: PropTypes.func, // ##TODO Make this required
    isDisabled: PropTypes.bool
  };

  shouldComponentUpdate(nextProps) {
    /*  This component should only update if the iconName, text, color or
     *  onClick change.
     */
    return this.props.iconName !== nextProps.iconName
      || this.props.text !== nextProps.text
      || this.props.color !== nextProps.color
      || this.props.onClick !== nextProps.onClick
      || this.props.isDisabled !== nextProps.isDisabled;
  }

  componentDidUpdate() {
    console.log('ControlButton:cDU');
  }

  render() {
    const { iconName, text, color, onClick, isDisabled } = this.props;
    const colorClass = color ? styles[color] : styles.neutral;
    return (
      <button className={styles.controlButton + ' ' + colorClass} onClick={onClick} disabled={isDisabled}>
        <Icon iconName={iconName}/>
        <span>{text}</span>
      </button>
    );
  }
}
