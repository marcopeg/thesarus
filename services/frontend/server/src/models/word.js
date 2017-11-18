
import Sequelize from 'sequelize'

const modelName = 'Word'

const fields = {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
    },
    locale: {
        type: Sequelize.JSONB,
        defaultValue: {},
    },
}

const options = {
    tableName: 'words',
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
