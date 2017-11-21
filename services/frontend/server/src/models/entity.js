
import Sequelize from 'sequelize'

const modelName = 'Entity'

const fields = {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}

const options = {
    tableName: 'entities',
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
