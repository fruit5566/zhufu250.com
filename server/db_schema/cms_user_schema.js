const {
    Sequelize,
    Model,
    DataTypes
} = require('sequelize');

const sequelize = require('./_database')


/**
 * 初始化表结构，
 */
class CmsUserModel extends Model {}
CmsUserModel.init({
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        unique: true,
        // primaryKey: false
    },
    name: Sequelize.STRING,
    password: Sequelize.STRING,
    avatar: Sequelize.TEXT,
    role: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    tableName: 'cms_user',
    freezeTableName: true,
    underscored: true
})

/** 自动更新字段 */
CmsUserModel.sync({
    alter: true
})

module.exports = CmsUserModel