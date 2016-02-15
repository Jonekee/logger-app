import React, {Component, PropTypes} from 'react';
import styles from './DropDown.scss';
import { Icon } from '../../components';

export default class DropDown extends Component {
  static propTypes = {
    title: PropTypes.string,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    initialValue: PropTypes.string,
    isDisabled: PropTypes.bool
  };

  componentDidUpdate() {
    console.log('DropDown:cDU');
  }

  render() {
    const { title, options, onChange, initialValue, isDisabled } = this.props;
    return (
      <div className={styles.dropDown + (isDisabled ? ' ' + styles.isDisabled : '')}>
        {title && <span>{title}</span>}
        <select onChange={onChange} value={initialValue ? initialValue : ''} disabled={isDisabled}>
          {options.map((option, index) => <option key={index} value={option.value}>{option.text}</option>)}
        </select>
        <Icon iconName="menu-down"/>
      </div>
    );
  }
}
