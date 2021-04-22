const { Schema, model } = require('mongoose');

const filesSchema = new Schema(
    {
        file_name: String,
        file_url: String,
        file_size: String,
        file_owner: {
            type: Schema.Types.ObjectId, //tipo de dato referencia con el id
            ref: "Users", // relacion al modelo de datos User
        }
    }, 
    {
        timestamps: true, //cada que se cree un dato vaya con su fecha de creacion y su ultima fecha de actualizacion.
        versionKey: false, //cada que se cree un dato no aparezca su _v
    }
);

module.exports = model('Files', filesSchema); //se usan los datos de newsSchema y se guardan en la tabla news