import SystemHelper from '../../utils/system';

export default function getAppSettings() {
  return new Promise((resolve) => {
    resolve(SystemHelper.getAppSettings());
  });
}
