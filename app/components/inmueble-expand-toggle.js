import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    collapseRow(index, record) {
      Ember.get(this, 'collapseRow')(index, record);
    },
    expandRow(index, record) {
      Ember.get(this, 'expandRow')(index, record);
    }
  }
});