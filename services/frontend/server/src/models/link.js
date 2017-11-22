
import Sequelize from 'sequelize'

const modelName = 'Link'

const fields = {
    nodeId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'node_id',
    },
    entityId: {
        type: Sequelize.STRING,
        primaryKey: true,
        field: 'entity_id',
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
