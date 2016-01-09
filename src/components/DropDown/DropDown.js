import React, {Component, PropTypes} from 'react';
import styles from './DropDown.scss';
import { Icon } from 'components';

export default class DropDown extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  }

  componentDidUpdate() {
    console.log('DropDown:cDU');
  }

  render() {
    const { title, options, onChange } = this.props;
    return (
      <div className={styles.dropDown}>
        <span>{title}</span>
        <select onChange={onChange}>
          {options.map(option => <option value={option.value}>{option.text}</option>)}
        </select>
        <Icon iconName="menu-down"/>
      </div>
    );
  }
}
