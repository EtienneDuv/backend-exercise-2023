import {CreationOptional, DataTypes} from 'sequelize';
import {sequelize, CustomModel} from '..';
import {CommentVoteModel} from './commentVoteModel';

export class CommentModel extends CustomModel {
    declare id: CreationOptional<string>;
    declare articleId: string;
    declare authorId: string;
    declare content: string;
    declare createdAt: CreationOptional<Date>;

    async getScore (): Promise<number> {
        const votes = await CommentVoteModel.findAll({
            where     : {commentId: this.id},
            raw       : true,
            attributes: ['value']
        });
        const values = votes.map(el => el.value);
        return values.reduce((previous, current) => previous + current, 0);
    }

    upVote (ipAddress: string): Promise<object> {
        return CommentVoteModel.upsert({
            commentId: this.id,
            ip       : ipAddress,
            value    : 1
        });
    }

    downVote (ipAddress: string): Promise<object> {
        return CommentVoteModel.upsert({
            commentId: this.id,
            ip       : ipAddress,
            value    : -1
        });
    }
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

CommentModel.hasMany(CommentVoteModel, {
    foreignKey: 'commentId'
});
