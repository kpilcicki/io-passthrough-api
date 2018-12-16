import Sequelize from 'sequelize';
import dbConnection from '../dbConnection';

export default dbConnection.define('user', {
    id: {type: Sequelize.INTEGER.UNSIGNED, allowNull: false, primaryKey: true},
    login: {type: Sequelize.STRING, allowNull: false, validate: { is: '/^\d+$/' } },
    hashPassword: {type: Sequelize.STRING, allowNull: false}
    }, {
    freezeTableName: true,
    timestamps: false
    });
