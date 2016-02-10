import SystemHelper from '../../utils/system';

export default function getSystemSettings() {
  return new Promise((resolve) => {
    resolve(SystemHelper.getSystemSettings());
  });
}
