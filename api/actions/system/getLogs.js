import SystemHelper from '../../utils/system';

export default function getLogs() {
  return new Promise((resolve) => {
    resolve(SystemHelper.getLogs());
  });
}
