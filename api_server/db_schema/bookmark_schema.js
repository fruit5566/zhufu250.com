const { Sequelize, Model } = require("sequelize");

const sequelize = require("./_database");

/**
 * 初始化表结构，
 */
class BookMarkModel extends Model {}
BookMarkModel.init(
  {
    url: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    title: Sequelize.STRING,
    desc: Sequelize.STRING,
    icon: Sequelize.STRING,
    icon_base64: Sequelize.TEXT
  },
  {
    sequelize,
    // modelName: 'bookmark', // 表名
    tableName: "bookmark",
    freezeTableName: true,
    underscored: true
  }
);

/** 自动更新字段 */
BookMarkModel.sync({ alter: true });

module.exports = BookMarkModel;
