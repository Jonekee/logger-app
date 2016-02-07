import React, { Component, PropTypes } from 'react';
import styles from './LogOutputPage.scss';
import { connect } from 'react-redux';
import { setLogRead } from '../../redux/modules/groups';

@connect(
  null,
  { setLogRead })
export default class LogOutputPage extends Component {
  static propTypes = {
    groupId: PropTypes.string,
    logId: PropTypes.string,
    logData: PropTypes.array,
    setLogRead: PropTypes.func,
    scrollLocked: PropTypes.bool
  };

  componentDidMount() {
    const { groupId, logId, setLogRead } = this.props; // eslint-disable-line no-shadow
    setLogRead(groupId, logId);
  }

  shouldComponentUpdate(nextProps) {
    /*  Should only update if IDs, scrollLocked or logData changes. Log data
     *  array is only ever changed by pushing to or reseting the whole array.
     *  Given this it is safe to simply check the array length.
     */
    return this.props.groupId !== nextProps.groupId
      || this.props.logId !== nextProps.logId
      || this.props.scrollLocked !== nextProps.scrollLocked
      || this.props.logData.length !== nextProps.logData.length;
  }

  componentDidUpdate = () => {
    console.log('LogOutputPage:cDU');
    const { groupId, logId, setLogRead, scrollLocked } = this.props; // eslint-disable-line no-shadow
    if (scrollLocked) {
      this.refs.scrollArea.scrollTop = this.refs.scrollArea.scrollHeight;
    }
    setLogRead(groupId, logId);
  };

  render() {
    const { logData } = this.props;
    return (
      <section ref="scrollArea" className={styles.logOutputPage}>
        <ul>
          {logData && logData.map((line, index) => <li key={index}><div>{line}</div></li>)}
        </ul>
      </section>
    );
  }
}
