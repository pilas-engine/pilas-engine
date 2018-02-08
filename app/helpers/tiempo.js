import { helper } from '@ember/component/helper';

export function tiempo(params) {
  return new Date(params * 1000).toISOString().substr(11, 8)
}

export default helper(tiempo);
