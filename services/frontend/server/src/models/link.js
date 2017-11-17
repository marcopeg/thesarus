
import Sequelize from 'sequelize'

const modelName = 'Link'

const fields = {
    w1: {
        type: Sequelize.BIGINT,
        primaryKey: true,
    },
    w2: {
        type: Sequelize.BIGINT,
        primaryKey: true,
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
    accuracy: {
        type: Sequelize.INTEGER,
        defaultValue: 50,
    },
}

const indexes = []

const options = {
    tableName: 'links',
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
