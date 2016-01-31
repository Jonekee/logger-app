import React, {Component, PropTypes} from 'react';
import { Icon, LogGroupList } from 'components';
import styles from './GroupPage.scss';
import DocumentMeta from 'react-document-meta';

export default class GroupPage extends Component {
  static propTypes = {
    groupId: PropTypes.string.isRequired,
    group: PropTypes.object.isRequired,
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
    const { groupId, group } = this.props;
    return (
      <section className={styles.groupPage}>
        <DocumentMeta title={'Logger - ' + group.name}/>
        <header>
          <h2>{group.name}</h2>
          <div>
            <input ref="filter" type="text" placeholder="Filter list..." value={group.listFilter} onChange={this.setGroupListFilter}/>
            <Icon iconName="magnify"/>
          </div>
        </header>
        <section>
          <LogGroupList groupId={groupId} group={group} listFilter={group.listFilter}/>
        </section>
      </section>
    );
  }
}
