import Controller from '@ember/controller';

export default Controller.extend({
    columns: [
        {
            "component": "inmueble-expand-toggle",
            "mayBeHidden": false
        },
        {
          "propertyName": "identificador",
          "title": "ID"
        },
        {
          "propertyName": "direccion",
          "title": "Dirección"
        },
        {
            "propertyName": "estrato",
            "title": "Estrato"
          },
        {
          "propertyName": "area_total",
          "title": "Área total (m^2)"
        },
        {
          "propertyName": "nro_pisos",
          "title": "Nro pisos"
        },
        {
          "propertyName": "nro_balcones",
          "title": "Nro balcones"
        },
        {
            "propertyName": "nro_banos",
            "title": "Nro baños"
        },
        {
            "propertyName": "estado",
            "title": "Estado"
        }
    ],
    expandedRowComponent: 'inmueble-expanded-row',
    actions: {
        regresar(){
            this.transitionToRoute('menu-cliente');
        },
    }
});
