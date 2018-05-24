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
            "colspan": 10
          }
        ],
    ],

    groupedHeader2: [
        [
          {
            "title": "Inmuebles Arrienda",
            "colspan": 10
          }
        ],
    ],

    expandedRowComponent: 'inmueble-expanded-row',

    expandedItems: [],

    actions: {
        contratos(record){
            this.transitionToRoute('ver-contratos', record.get('id'));
        },

        regresar(){
            this.transitionToRoute('menu-cliente');
        },

        changeTab(pageName, ind){
            var i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("tabcontentInmueble");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tablinkInmueble");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].style.backgroundColor = "";
            }
            tablinks[ind].style.backgroundColor = "red";

            document.getElementById(pageName).style.display = "block";
        }
    }
});
