import {DataTypes} from 'sequelize';
import {sequelize} from '../../database';

export const User = sequelize.define('User', {
    id: {
        type        : DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey  : true
    },
    username: {
        type     : DataTypes.STRING(255),
        allowNull: false,
        unique   : true,
    },
    password: {
        type     : DataTypes.STRING(255),
        allowNull: false
    }
}, {
    freezeTableName: true,
    modelName      : 'user',
    tableName      : 'users',
    timestamps     : true,
    updatedAt      : false,
    underscored    : false,
});
