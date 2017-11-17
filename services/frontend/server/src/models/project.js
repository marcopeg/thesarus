
import Sequelize from 'sequelize'

const modelName = 'Project'

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
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}

const indexes = []

const options = {
    tableName: 'projects',
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
