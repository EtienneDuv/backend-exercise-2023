import {DataTypes} from 'sequelize';
import {sequelize, CustomModel} from '..';

export class CommentVoteModel extends CustomModel {
    declare commentId: string;
    declare ip: string;
    declare value: number;
}

CommentVoteModel.init({
    commentId: {
        type     : DataTypes.INTEGER,
        unique   : 'one_vote_per_ip_per_comment',
        allowNull: false
    },
    ip: {
        type     : DataTypes.STRING,
        allowNull: false,
        unique   : 'one_vote_per_ip_per_comment'
    },
    value: {
        type     : DataTypes.INTEGER,
        allowNull: false,
        validate : {
            customValidator: (value: number) => [-1, 1].includes(value)
        }
    },
}, {
    sequelize,
    freezeTableName: true,
    modelName      : 'commentVote',
    tableName      : 'commentVotes',
    timestamps     : false,
    underscored    : false,
});
