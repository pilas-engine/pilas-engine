import { helper } from "@ember/component/helper";

export function tiempo(params) {
  let tiempo = new Date(params * 1000)
    .toISOString()
    .substr(11, 5)
    .split(":");

  return `${tiempo[0]} min ${tiempo[1]} seg`;
}

export default helper(tiempo);
