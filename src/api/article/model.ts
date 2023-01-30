import {CreationOptional, DataTypes} from 'sequelize';
import {sequelize, CustomModel} from '../../database';

export class ArticleModel extends CustomModel {
    declare id: CreationOptional<string>;
    declare authorId: string;
    declare title: string;
    declare perex: string;
    declare content: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

ArticleModel.init({
    id: {
        type        : DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey  : true
    },
    title: {
        type     : DataTypes.STRING(255),
        allowNull: false,
        unique   : {
            name: 'articleNameUnique',
            msg : 'Article name already exists'
        },
    },
    perex: {
        type     : DataTypes.STRING(255),
        allowNull: false
    },
    content: {
        type     : DataTypes.TEXT,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        get () {
            return new Date(this.getDataValue('createdAt')).toISOString();
        }
    },
    updatedAt: {
        type: DataTypes.DATE,
        get () {
            return new Date(this.getDataValue('updatedAt')).toISOString();
        }
    },
}, {
    sequelize,
    freezeTableName: true,
    modelName      : 'article',
    tableName      : 'articles',
    timestamps     : true,
    updatedAt      : true,
    underscored    : false,
    // paranoid       : true,
});
