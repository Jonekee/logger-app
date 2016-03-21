import SystemHelper from '../../utils/system';

export default function getGroups() {
  return new Promise((resolve) => {
    resolve(SystemHelper.getGroupz());
  });
}
