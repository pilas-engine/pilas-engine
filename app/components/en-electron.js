import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  tagName: "",
  electron: service(),
  enElectron: alias("electron.enElectron")
});
