const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "pokemon",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        indexes: [{ fields: ["id"] }],
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      life: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      attack: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      defense: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      speed: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
        get() {
          const rawValue = this.getDataValue("height");
          return rawValue ? `${rawValue * 10} cm.` : null;
        },
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        get() {
          const rowValue = this.getDataValue("weight");
          return rowValue ? `${rowValue * 0.1} kls` : null;
        },
      },
    },
    { timestamps: false }
  );
};
