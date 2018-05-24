import Controller from '@ember/controller';

export default Controller.extend({
    columns: [
        {
            "title": "Arrendador",
            "component": "arrendadorCol",
        },

        {
            "title": "Arrendatario",
            "component": "arrendatarioCol",
        },

        {
            "title": "Funcionario",
            "component": "funcionarioCol",
        },

        {
          "propertyName": "fecha",
          "title": "Fecha"
        },
        {
          "propertyName": "valor",
          "title": "Valor por mes (Peso Colombiano)"
        },
    ],

    actions:{
        regresar(){
            this.transitionToRoute('ver-inmuebles');
        },
    }
});
