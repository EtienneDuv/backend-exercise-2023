import {CreationOptional, DataTypes, Model} from 'sequelize';
import {sequelize} from '../../database';

export class UserModel extends Model {
    declare id: string;
    declare username: string;
    declare password: string;
    declare createdAt: CreationOptional<Date>;
}

UserModel.init({
    id: {
        type        : DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey  : true
    },
    username: {
        type     : DataTypes.STRING(255),
        allowNull: false,
        unique   : {
            name: 'usernameUnique',
            msg : 'Username already exists'
        },
    },
    password: {
        type     : DataTypes.STRING(255),
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        get () {
            return new Date(this.getDataValue('createdAt')).toISOString();
        }
    },
}, {
    sequelize,
    freezeTableName: true,
    modelName      : 'user',
    tableName      : 'users',
    timestamps     : true,
    updatedAt      : false,
    underscored    : false,
});
