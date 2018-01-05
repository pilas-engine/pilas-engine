import { helper } from "@ember/component/helper";

export function round(params /*, hash*/) {
  return Math.round(params);
}

export default helper(round);
