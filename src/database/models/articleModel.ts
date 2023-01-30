import {CreationOptional, DataTypes} from 'sequelize';
import {sequelize, CustomModel} from '..';
import {CommentModel} from '../../database/models/commentModel';

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
    authorId: {
        type        : DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
    paranoid       : true,
});

ArticleModel.hasMany(CommentModel, {
    foreignKey: {
        name     : 'articleId',
        allowNull: false
    },
    constraints: true,
});