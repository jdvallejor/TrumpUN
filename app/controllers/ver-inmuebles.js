import Controller from '@ember/controller';

export default Controller.extend({
    columns: [
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
          "title": "Área total"
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
        },
        {
          "title": "Contratos",
          "component": "contratosRow"
        }
      ],
      actions: {
        contratos(record){
            alert(record.get('identificador'))
        }
      }
});
