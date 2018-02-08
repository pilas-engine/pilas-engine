import { helper } from '@ember/component/helper';

export function plus(params/*, hash*/) {
  return +params + 1;
}

export default helper(plus);
