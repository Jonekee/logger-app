import SystemHelper from '../../utils/system';

export default function getGroups() {
  return new Promise((resolve) => {
    resolve(SystemHelper.getGroups().map(group => ({
      ...group,
      navOpen: true,
      listFilter: '',
      logs: group.logs.map(log => ({
        ...log,
        logData: [],
        pausedLogData: [],
        extraActionsOpen: false,
        activeState: 'INACTIVE',
        hasNew: false,
        scrollLocked: true,
        logLevelMapping: null
      }))
    })));
  });
}
