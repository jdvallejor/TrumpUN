import Controller from '@ember/controller';
import {computed} from '@ember/object';

export default Controller.extend({
  tipos: ['Casa', 'Apartamento'],
  selTipo: 'Casa',
  isCasa: computed('selTipo', function () {
    return this.get('selTipo') === 'Casa';
  }),
  ncuartosarray: null,
  nbanosarray: null,
  actions: {
    selectTipo(tipo) {
      this.set('selTipo', tipo);
    },
    updateBanos() {
      let banos = [];
      for (let i = 0; i < parseInt(this.get('nbanos')); i++) {
        banos[i] = {numero: i + 1, area: 0, tiene_ducha: false};
      }
      banos = (banos.length === 0) ? null : banos;
      this.set('nbanosarray', banos);
    },
    updateCuartos() {
      let cuartos = [];
      for (let i = 0; i < parseInt(this.get('ncuartos')); i++) {
        cuartos[i] = {numero: i + 1, area: 0, tiene_armario: false, tiene_bano: false};
      }
      cuartos = (cuartos.length === 0) ? null : cuartos;
      this.set('ncuartosarray', cuartos);
    },
  }
});
