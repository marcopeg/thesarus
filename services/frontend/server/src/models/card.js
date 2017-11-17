
import Sequelize from 'sequelize'

const modelName = 'Card'

const fields = {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        field: 'created_at',
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        field: 'updated_at',
    },
    projectId: {
        type: Sequelize.BIGINT,
        field: 'project_id',
        allowNull: false,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    quadrant: {
        type: Sequelize.ENUM('iu', 'in', 'nu', 'nn'),
        allowNull: true,
    },
    moscow: {
        type: Sequelize.ENUM('m', 's', 'c', 'w'),
        allowNull: true,
    },
}

const indexes = []

const options = {
    tableName: 'cards',
    freezeTableName: true,
    underscored: true,
    createdAt: true,
    updatedAt: true,
    indexes,
}

const init = (conn) => {
    const Model = conn.define(modelName, fields, options)
    return Model.sync()
}

export default { name: modelName, init }
