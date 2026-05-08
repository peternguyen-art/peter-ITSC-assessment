// packages/api/src/infrastructure/sequelize/models/User.ts
import { CreationOptional, DataTypes, Model } from 'sequelize';
import sequelize from '../connection';

export class User extends Model {
  public declare id: CreationOptional<number>;
  public declare username: string;
  public declare password: string;
  public declare firstName: string;
  public declare lastName: string;
  public declare createdAt: CreationOptional<Date>;
  public declare updatedAt: CreationOptional<Date>;
}

User.init({
  id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
  createdAt: { allowNull: false, type: DataTypes.DATE },
  firstName: { allowNull: false, type: DataTypes.STRING },
  lastName: { allowNull: false, type: DataTypes.STRING },
  password: { allowNull: false, type: DataTypes.STRING },
  updatedAt: { allowNull: false, type: DataTypes.DATE },
  username: { allowNull: false, type: DataTypes.STRING, unique: true },
}, { sequelize, tableName: `users` });
