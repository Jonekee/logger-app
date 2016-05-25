import React, {Component, PropTypes} from 'react';

export default class Icon extends Component {
  static propTypes = {
    iconName: PropTypes.string.isRequired,
    viewBox: PropTypes.string
  };

  shouldComponentUpdate(nextProps) {
    // Should only update if icon name changes
    return nextProps.iconName !== this.props.iconName;
  }

  componentDidUpdate() {
    console.log('Icon:cDU - ' + this.props.iconName);
  }

  render() {
    const { iconName, viewBox } = this.props;

    const iconId = '#icon-' + iconName;
    return (
      <svg viewBox={viewBox || '0 0 1024 1024'}>
        <use xlinkHref={iconId}></use>
      </svg>
    );
  }
}
