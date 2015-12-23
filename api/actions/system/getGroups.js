import SystemHelper from '../../utils/system';

export default function getGroups() {
  return new Promise((resolve) => {
    resolve(SystemHelper.getGroups().map(group => ({
      ...group,
      navOpen: true,
      logs: group.logs.map(log => ({
        ...log,
        extraActionsOpen: false,
        active: 'INACTIVE'
      }))
    })));
  });
}
