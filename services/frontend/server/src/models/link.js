
import Sequelize from 'sequelize'

const modelName = 'Link'

const fields = {
    w1: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    w2: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    accuracy: {
        type: Sequelize.INTEGER,
        defaultValue: 50,
    },
}

const options = {
    tableName: 'links',
    freezeTableName: true,
    underscored: true,
    createdAt: false,
    updatedAt: false,
}

const init = (conn) => {
    const Model = conn.define(modelName, fields, options)
    return Model.sync()
}

export default { name: modelName, init }
