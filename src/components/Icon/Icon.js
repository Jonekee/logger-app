import React, {Component, PropTypes} from 'react';

export default class Icon extends Component {
  static propTypes = {
    iconName: PropTypes.string.isRequired
  };

  render() {
    const iconId = '#icon-' + this.props.iconName;
    return (
      <svg viewBox="0 0 1024 1024">
        <use xlinkHref={iconId}></use>
      </svg>
    );
  }
}
