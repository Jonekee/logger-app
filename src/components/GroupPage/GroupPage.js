import React, {Component, PropTypes} from 'react';
import { Icon, LogGroupList } from '../../components';
import styles from './GroupPage.scss';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

@connect((state, props) => ({
  logs: props.group.logs.reduce((prev, curr) => ({ ...prev, [curr]: state.logz.data[curr] }), {})
}))
export default class GroupPage extends Component {
  static propTypes = {
    groupId: PropTypes.string.isRequired,
    group: PropTypes.object.isRequired,
    logs: PropTypes.object.isRequired,
    setGroupListFilter: PropTypes.func.isRequired
  };

  shouldComponentUpdate(nextProps) {
    /*  GroupPage should only update if it is being passed a new groupId
     *  or if the group list filter has changed. You can update the Logs
     *  or anything like that while viewing this page so no need to check
     *  them for any change.
     */
    const { groupId: currId, group: currGroup } = this.props;
    const { groupId: nextId, group: nextGroup } = nextProps;
    return (currId !== nextId) || (currGroup.listFilter !== nextGroup.listFilter);
  }

  componentDidUpdate() {
    console.log('GroupPage:cDU');
  }

  setGroupListFilter = (event) => {
    const { groupId, setGroupListFilter } = this.props;
    setGroupListFilter(groupId, event.target.value);
  };

  render() {
    const { group, logs } = this.props;

    const listLogs = group.logs.map(logId => ({
      logId,
      logName: logs[logId].name,
      logFileName: logs[logId].fname,
      logFilePath: logs[logId].fpath,
      logStatus: logs[logId].activeState,
      logHasNew: logs[logId].hasNew
    }));

    listLogs.sort((first, second) => (first.logName > second.logName));

    const groupList = {
      listFilter: group.listFilter,
      logs: listLogs
    };

    return (
      <section className={styles.groupPage}>
        <Helmet title={group.name}/>
        <header>
          <h2>{group.name}</h2>
          <div>
            <input ref="filter" type="text" placeholder="Filter list..." value={group.listFilter} onChange={this.setGroupListFilter}/>
            <Icon iconName="magnify"/>
          </div>
        </header>
        <section>
          <LogGroupList {...groupList}/>
        </section>
      </section>
    );
  }
}
