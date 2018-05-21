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
        },
        {
          "title": "Contratos",
          "component": "contratosRow"
        }
    ],
    
    groupedHeader1: [
        [
          {
            "title": "Inmuebles Ofrece",
            "colspan": 9
          }
        ],
    ],

    groupedHeader2: [
        [
          {
            "title": "Inmuebles Arrienda",
            "colspan": 9
          }
        ],
    ],

    //themeInstance: themeBootstrap3,

    actions: {
        contratos(record){
            alert(record.get('identificador'))
        }
    }
});
