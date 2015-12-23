import React, {Component, PropTypes} from 'react';
import { Icon, LogGroupList } from 'components';
import styles from './GroupPage.scss';

export default class GroupPage extends Component {
  static propTypes = {
    groupId: PropTypes.string,
    group: PropTypes.object
  }

  render() {
    const { groupId, group } = this.props;
    return (
      <section className={styles.groupPage}>
        <header>
          <h2>{group.name}</h2>
          <div>
            <input ref="filter" type="text" placeholder="Filter list..."/>
            <Icon iconName="magnify"/>
          </div>
        </header>
        <section>
          <LogGroupList groupId={groupId} group={group}/>
        </section>
      </section>
    );
  }
}
