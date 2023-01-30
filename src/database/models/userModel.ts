import {CreationOptional, DataTypes} from 'sequelize';
import {sequelize, CustomModel} from '..';
import {ArticleModel} from '../../database/models/articleModel';
import {CommentModel} from '../../database/models/commentModel';

export class UserModel extends CustomModel {
    declare id: CreationOptional<string>;
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

UserModel.hasMany(ArticleModel, {
    foreignKey: {
        name     : 'authorId',
        allowNull: false
    },
    constraints: true,
});

UserModel.hasMany(CommentModel, {
    foreignKey: {
        name     : 'authorId',
        allowNull: false
    },
    constraints: true,
});
