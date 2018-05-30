import Controller from '@ember/controller';
import {computed} from '@ember/object';
import {inject} from '@ember/service';
import {get} from '@ember/object';

export default Controller.extend({
  flashMessages: inject(),
  firebaseApp: inject(),
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
    registrarInmueble() {
      const that = this;
      // DATOS INCOMPLETOS?
      // Verifica si se llenaron las variables principales del inmueble
      let checkvar = ['selTipo', 'direccion', 'estrato', 'area', 'npisos', 'nbalcones', 'ncuartos'];
      checkvar = checkvar.filter(function (el) {
        return (that.get(el) === undefined || that.get(el) === '')

      });
      // En caso de haber ingresado cuartos verifica que se hayan llenado los campos correspondientes
      if (this.get('ncuartosarray') !== null) {
        if (this.get('ncuartosarray').filter(el => {
            return (el['area'] === undefined || el['area'] === '')
          }).length > 0) {
          checkvar.push('ncuartosarray');
        }
      }
      // En caso de haber ingresado baños verifica que se hayan llenado los campos correspondientes
      if (this.get('nbanosarray') !== null) {
        if (this.get('nbanosarray').filter(el => {
            return (el['area'] === undefined || el['area'] === '')
          }).length > 0) {
          checkvar.push('nbanosarray');
        }
      }
      // Si se seleccionó apartamento verifica que se hayan ingresado datos de la Unidad y la Torre
      if (!this.get('isCasa')) {
        if (['unidad_nombre', 'torre_numero', 'torre_pisos', 'apartamento_piso'].filter(function (el) {
            return (that.get(el) === undefined || that.get(el) === '')
          }).length > 0) {
          checkvar.push('unidadytorre');
        }
      }

      if (checkvar.length > 0) {
        // Desplegar mensaje de error si hay datos incompletos
        get(this, 'flashMessages').clearMessages();
        get(this, 'flashMessages').danger('Campos Incompletos', {
          //timeout: 3000,
          priority: 100,
          sticky: true,
          showProgress: true
        });
        alert('Campos Incompletos');
      } else {
        // DATOS VÁLIDOS?
        // Verificar si los campos son válidos
        let validvar = [];
        const estrato = (!isNaN(this.get('estrato')) ? parseInt(this.get('estrato')) : 0);
        if (estrato <= 0 || estrato > 6) {
          validvar.push('estrato');
        }
        const area_total = (!isNaN(this.get('area')) ? parseFloat(this.get('area')) : 0);
        if (area_total <= 0) {
          validvar.push('area_total');
        }
        const npisos = (!isNaN(this.get('npisos')) ? parseInt(this.get('npisos')) : 0);
        if (npisos <= 0) {
          validvar.push('npisos');
        }
        const nbalcones = (!isNaN(this.get('nbalcones')) ? parseInt(this.get('nbalcones')) : -1);
        if (nbalcones < 0) {
          validvar.push('nbalcones');
        }
        const ncuartos = (!isNaN(this.get('ncuartos')) ? parseInt(this.get('ncuartos')) : -1);
        if (ncuartos < 0) {
          validvar.push('ncuartos');
        }
        const nbanos = (!isNaN(this.get('nbanos')) ? parseInt(this.get('nbanos')) : -1);
        if (nbanos < 0) {
          validvar.push('nbanos');
        }
        // En caso de haber ingresado cuartos verifica que el área ingresada sea válida
        if (this.get('ncuartosarray') !== null) {
          if (this.get('ncuartosarray').filter(el => {
              return (!isNaN(el['area']) ? parseFloat(el['area']) <= 0 : true);
            }).length > 0) {
            validvar.push('ncuartosarray');
          }
        }
        // En caso de haber ingresado baños verifica que el área ingresada sea válida
        if (this.get('nbanosarray') !== null) {
          if (this.get('nbanosarray').filter(el => {
              return (!isNaN(el['area']) ? parseFloat(el['area']) <= 0 : true);
            }).length > 0) {
            validvar.push('nbanosarray');
          }
        }
        let torre_pisos = 0;
        let apartamento_piso = 0;

        // Si se seleccionó apartamento verifica que se hayan ingresado datos válidos en Unidad y Torre
        if (!this.get('isCasa')) {
          torre_pisos = (!isNaN(this.get('torre_pisos')) ? parseInt(this.get('torre_pisos')) : 0);
          if (torre_pisos <= 0) {
            validvar.push('torre_pisos');
          }
          apartamento_piso = (!isNaN(this.get('apartamento_piso')) ? parseInt(this.get('apartamento_piso')) : 0);
          if (apartamento_piso <= 0) {
            validvar.push('apartamento_piso');
          }
        }

        if (validvar.length > 0) {
          // Desplegar mensaje de error si hay datos no válidos
          get(this, 'flashMessages').clearMessages();
          get(this, 'flashMessages').danger('Tipo de dato incorrecto', {
            //timeout: 3000,
            priority: 100,
            sticky: true,
            showProgress: true
          });
          alert('Tipo de dato incorrecto');
        } else {
          // DATOS CONSISTENTES?
          // Verificar si la información ingresada en los campos es consistente
          let consistentvar = [];

          // Suma de áreas
          let suma_areas = 0;
          this.get('ncuartosarray').map(el => {
            suma_areas = suma_areas + parseFloat(el['area']);
          });
          this.get('nbanosarray').map(el => {
            suma_areas = suma_areas + parseFloat(el['area']);
          });
          if (area_total < suma_areas) {
            consistentvar.push('suma_areas');
          }
          // Cuartos o Baños sin ingresar/escondidos
          if (ncuartos !== this.get('ncuartosarray').length || nbanos !== this.get('nbanosarray').length) {
            consistentvar.push('room_missing');
          }
          // Baños en cuartos por debajo de el número general de baños
          let suma_banos = 0;
          this.get('ncuartosarray').map(el => {
            suma_banos = suma_banos + ((el['tiene_bano']) ? 1 : 0);
          });
          if (suma_banos > nbanos) {
            consistentvar.push('nbanos');
          }
          // Si se seleccionó apartamento verifica la consistencia en los datos de la Torre
          if (!this.get('isCasa')) {
            if ((apartamento_piso + npisos - 1) > torre_pisos) {
              consistentvar.push('apartamento_piso');
            }
          }

          if (consistentvar.length > 0) {
            // Desplegar mensaje de error si hay datos inconsistentes
            get(this, 'flashMessages').clearMessages();
            get(this, 'flashMessages').danger('Hay un error en la consistencia de los datos', {
              //timeout: 3000,
              priority: 100,
              sticky: true,
              showProgress: true
            });
            alert('Hay un error en la consistencia de los datos');
          } else {
            // Guardar el Inmueble

            let inmueble = null;
            let inmueblemain = null;

            inmueblemain = this.get('store').createRecord('inmueble', {});

            inmueblemain.set('direccion', this.get('direccion'));
            inmueblemain.set('estrato', estrato);
            inmueblemain.set('area_total', area_total);
            inmueblemain.set('nro_pisos', npisos);
            inmueblemain.set('nro_balcones', nbalcones);
            inmueblemain.set('nro_banos', nbanos);
            inmueblemain.set('estado', 'Libre');
            inmueblemain.save();

            if (this.get('isCasa')) {
              inmueble = this.get('store').createRecord('casa', {
                tiene_terraza: this.get('tiene_terraza'),
                tiene_garaje: this.get('tiene_garaje'),
              });
              inmueble.save();
              inmueblemain.set('tipo', 'Casa');
              inmueblemain.save();
            } else {
              inmueble = this.get('store').createRecord('apartamento', {
                nro_piso: this.get('apartamento_piso'),
              });
              inmueble.save();
              inmueblemain.set('tipo', 'Apartamento');
              inmueblemain.save();
            }
            inmueble.set('inmueble', inmueblemain);

            for (let i = 0; i <= ncuartos - 1; i++) {
              let cuarto = this.get('store').createRecord('cuarto', {
                area: this.get('ncuartosarray')[i]['area'],
                tiene_armario: this.get('ncuartosarray')[i]['tiene_armario'],
                tiene_bano: this.get('ncuartosarray')[i]['tiene_bano'],
              });
              cuarto.save();
              inmueblemain.get('cuartos').pushObject(cuarto);
            }
            inmueblemain.save();

            for (let i = 0; i <= nbanos - 1; i++) {
              let bano = this.get('store').createRecord('bano', {
                area: this.get('nbanosarray')[i]['area'],
                tiene_ducha: this.get('nbanosarray')[i]['tiene_ducha'],
              });
              bano.save();
              inmueblemain.get('banos').pushObject(bano);
            }
            inmueblemain.save();

            if (!this.get('isCasa')) {
              let unidad = this.get('store').createRecord('unidad', {
                nombre: this.get('nombre_unidad'),
                is_cerrada: this.get('unidad_cerrada'),
                tiene_aseo: this.get('unidad_tiene_aseo'),
                tiene_vigilancia: this.get('unidad_tiene_vigilancia'),
                tiene_piscina: this.get('unidad_tiene_piscina'),
                tiene_gimnasio: this.get('unidad_tiene_gimnasio'),
                tiene_salonsocial: this.get('unidad_tiene_salonsocial'),
                tiene_parquerecreacional: this.get('unidad_tiene_parquerecreacional'),
                tiene_zonasverdes: this.get('unidad_tiene_zonasverdes'),
              });
              unidad.save();

              let torre = this.get('store').createRecord('torre', {
                numero: this.get('torre_numero'),
                tiene_ascensor: this.get('torre_tiene_ascensor'),
                nro_pisos: this.get('torre_pisos'),
                unidad: unidad
              });
              torre.save();

              inmueble.set('torre', torre);
              inmueble.save();
            }

            this.get('store').findRecord('cliente', '-' + this.get('session').content.uid).then((user) => {
              inmueblemain.set('arrendador', user);
              inmueblemain.save();
              user.get('inmueblesOfrece').pushObject(inmueblemain);
              user.save();
            });

            get(this, 'flashMessages').clearMessages();
            get(this, 'flashMessages').success('Inmueble creado correctamente!', {
              //timeout: 3000,
              priority: 100,
              sticky: true,
              showProgress: true
            });

            ['direccion', 'estrato', 'area', 'npisos', 'nbalcones', 'ncuartos', 'nbanos',
              'tiene_terraza', 'tiene_garaje',
              'unidad_nombre', 'unidad_cerrada', 'unidad_tiene_aseo',
              'unidad_tiene_vigilancia',
              'unidad_tiene_piscina',
              'unidad_tiene_gimnasio',
              'unidad_tiene_salonsocial',
              'unidad_tiene_parquerecreacional',
              'unidad_tiene_zonasverdes',
              'torre_numero',
              'torre_pisos',
              'apartamento_piso',
              'torre_tiene_ascensor'].map(el => {
              this.set(el, '');
            });
            this.send('updateCuartos');
            this.send('updateBanos');
            alert('Inmueble creado correctamente!');
          }
        }
      }
    }
  }
});
