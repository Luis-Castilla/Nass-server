const { Schema, model } = require('mongoose');

const rolesSchema = new Schema(
    {
        role_name:
            {
                type: String,
                required: true,
            }
    },
    {
        timestamps: true, //cada que se cree un dato vaya con su fecha de creacion y su ultima fecha de actualizacion.
        versionKey: false, //cada que se cree un dato no aparezca su _v
    }
);

module.exports = model('Roles', rolesSchema); //se usan los datos de newsSchema y se guardan en la tabla news