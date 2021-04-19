const { Schema, model } = require('mongoose');

const calendarSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId, //tipo de dato referencia con el id
            ref: "Users", // relacion al modelo de datos User
        },
        appoinment: [
            {
                date: {type: Date},
                startTime: {type: Date},
                endTime: {type: Date}
            }
        ],
    },
    {
        timestamps: true, //cada que se cree un dato vaya con su fecha de creacion y su ultima fecha de actualizacion.
        versionKey: false, //cada que se cree un dato no aparezca su _v
    }
);

module.exports = model('Calendar', calendarSchema); //se usan los datos de newsSchema y se guardan en la tabla news