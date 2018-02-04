import { helper } from "@ember/component/helper";

export function round(num) {
  return parseFloat((+num).toFixed(2), 10);
}

export default helper(round);
