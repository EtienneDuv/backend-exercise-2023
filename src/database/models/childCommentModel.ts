import {DataTypes} from 'sequelize';
import {sequelize, CustomModel} from '..';

export class ChildCommentModel extends CustomModel {
    declare parentId: string;
    declare childId: string;
}

ChildCommentModel.init({
    parentId: {
        type: DataTypes.INTEGER,
    },
    childId: {
        type: DataTypes.INTEGER,
    },
}, {
    sequelize,
    freezeTableName: true,
    modelName      : 'childComment',
    tableName      : 'childComments',
    timestamps     : false,
});
