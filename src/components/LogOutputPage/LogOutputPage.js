import React, { Component, PropTypes } from 'react';
import styles from './LogOutputPage.scss';
import { connect } from 'react-redux';
import { setLogRead } from '../../redux/modules/logs';
import { Icon } from '../../components';
import classnames from 'classnames';

@connect(
  null,
  { setLogRead })
export default class LogOutputPage extends Component {
  static propTypes = {
    logId: PropTypes.string.isRequired,
    logData: PropTypes.array.isRequired,
    setLogRead: PropTypes.func.isRequired,
    scrollLocked: PropTypes.bool.isRequired,
    tailError: PropTypes.string,
    setTailError: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { logId, setLogRead } = this.props; // eslint-disable-line no-shadow
    setLogRead(logId);
  }

  shouldComponentUpdate(nextProps) {
    /*  Should only update if IDs, scrollLocked or logData changes. Log data
     *  array is only ever changed by pushing to or reseting the whole array.
     *  Given this it is safe to simply check the array length.
     */
    return this.props.logId !== nextProps.logId
      || this.props.scrollLocked !== nextProps.scrollLocked
      || this.props.logData.length !== nextProps.logData.length
      || this.props.tailError !== nextProps.tailError;
  }

  componentDidUpdate = () => {
    console.log('LogOutputPage:cDU');
    const { logId, setLogRead, scrollLocked } = this.props; // eslint-disable-line no-shadow
    if (scrollLocked) {
      this.refs.scrollArea.scrollTop = this.refs.scrollArea.scrollHeight;
    }
    setLogRead(logId);
  };

  render() {
    const { logId, logData, tailError, setTailError } = this.props;

    let error = '';
    if (!!tailError) {
      switch (tailError) {
        case 'EACCES':
          error = 'The server was unable to tail this file due to insufficient permissions.';
          break;
        case 'ENOENT':
          error = 'The log file could not be found. Please check that the path and name are correct.';
          break;
        default:
          error = 'An error occured trying to tail this log file.';
      }
    }

    return (
      <section ref="scrollArea" className={styles.logOutputPage}>
        <div className={classnames(styles.errorPanel, { [styles.open]: !!tailError })}>
          <Icon iconName="alert-circle" />
          <p>{error}</p>
          <button onClick={() => setTailError(logId, null)}>
            <Icon iconName="close" />
          </button>
        </div>
        <ul>
          {logData && logData.map((line, index) => <li key={index}><div>{line}</div></li>)}
        </ul>
      </section>
    );
  }
}
