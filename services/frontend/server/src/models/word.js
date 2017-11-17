
import Sequelize from 'sequelize'

const modelName = 'Word'

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
    value: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    locale: {
        type: Sequelize.JSONB,
        defaultValue: {},
    },
}

const indexes = []

const options = {
    tableName: 'words',
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
