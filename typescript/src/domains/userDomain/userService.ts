
import { UserErrors } from "./userErrors";
import { IUser, IUserRepo } from "./userRepo";

export interface IUserService {
  addUser(user: IUser): Number;
  getAllUsers(): IUser[];
  getUserById(id: number): IUser;
}

export class UserService implements IUserService {
  private dao: IUserRepo;

  constructor(dao: IUserRepo) {
    this.dao = dao;
  }
  getAllUsers(): IUser[] {
    try {
      return this.dao.fetchAllUsers();
    } catch (error) {
      throw error;
    }
  }
  public addUser(user: IUser): Number {
    try {
      if (!this.validateNameLength(user.firstName)) {
        throw UserErrors.INVALID_FIRST_NAME;
      } else if (!this.validateNameLength(user.lastName)) {
        throw UserErrors.INVALID_LAST_NAME;
      }

      return this.dao.createUser(user);
    } catch (error) {
      throw error;
    }
  }

  public getUserById(id: number): IUser {
    try {
      return this.dao.fetchUser(id);
    } catch (error) {
      throw error;
    }
  }

  private validateNameLength(name: string): boolean {
    if (!/^[a-zA-Z-]{2,25}$/.test(name)) {
      return false;
    }
    return true;
  }
}
