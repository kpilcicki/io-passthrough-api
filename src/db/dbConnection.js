import Sequelize from 'sequelize';
import env from '../config';

export default new Sequelize(env.USER_DB,
    {
        timestamps: false,
        dialect: 'mysql',
        operatorsAliases: false
    });

