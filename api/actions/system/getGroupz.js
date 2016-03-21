import SystemHelper from '../../utils/system';

export default function getGroupz() {
  return new Promise((resolve) => {
    resolve(SystemHelper.getGroupz());
  });
}
