import SystemHelper from '../../utils/system';

export default function getLogz() {
  return new Promise((resolve) => {
    resolve(SystemHelper.getLogz());
  });
}
