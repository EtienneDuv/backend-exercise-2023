import {CreationOptional, DataTypes} from 'sequelize';
import {sequelize, CustomModel} from '../../database';

export class CommentModel extends CustomModel {
    declare id: CreationOptional<string>;
    declare articleId: string;
    declare authorId: string;
    declare content: string;
    declare createdAt: CreationOptional<Date>;
}

CommentModel.init({
    id: {
        type         : DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey   : true
    },
    articleId: {
        type        : DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    authorId: {
        type        : DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
}, {
    sequelize,
    freezeTableName: true,
    modelName      : 'comment',
    tableName      : 'comments',
    timestamps     : true,
    updatedAt      : false,
    underscored    : false,
});
