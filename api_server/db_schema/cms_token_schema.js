const { Sequelize, Model } = require('sequelize');

const sequelize = require('./_database');

/**
 * 初始化表结构，
 */
class CmsTokenModel extends Model {}
CmsTokenModel.init(
  {
    uuid: Sequelize.UUID,
    token: Sequelize.STRING,
  },
  {
    sequelize,
    tableName: 'cms_token',
    freezeTableName: true,
    underscored: true,
  }
);

/** 自动更新字段 */
CmsTokenModel.sync({ alter: true });

module.exports = CmsTokenModel;
