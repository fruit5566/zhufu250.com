const { Sequelize, Model } = require('sequelize');

const sequelize = require('./_database');

/**
 * 初始化表结构，
 */
class RecommendModel extends Model {}
RecommendModel.init(
  {
    url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    title: Sequelize.STRING,
  },
  {
    sequelize,
    tableName: 'recommend',
    freezeTableName: true,
    underscored: true,
  }
);

/** 自动更新字段 */
RecommendModel.sync({ alter: true });

module.exports = RecommendModel;
