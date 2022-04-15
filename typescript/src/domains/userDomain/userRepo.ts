import { UserErrors } from "./userErrors";


export interface IUser {
  id?: Number;
  firstName: string;
  lastName: string;
}
export interface IUserRepo {
  createUser(user: IUser): Number;
  fetchUser(id: Number): IUser;
  fetchAllUsers(): IUser[];
}

const users: IUser[] = [];
let id = 0;

export class UserRepository implements IUserRepo {
  fetchAllUsers(): IUser[] {
    try {
      if (users.length === 0) throw UserErrors.USER_NOT_FOUND;
      return users;
    } catch (error) {
      throw error;
    }
  }
  public fetchUser = (id: Number): IUser => {
    try {
      const user = users.find((u) => u.id === id);
      if (!user) {
        throw UserErrors.USER_NOT_FOUND;
      }
      return user;
    } catch (error) {
      throw error;
    }
  };

  public createUser = (user: IUser): Number => {
    try {
      const newUser: IUser = {
        id: ++id,
        firstName: user.firstName,
        lastName: user.lastName,
      };

      users.forEach((u) => {
        if (u.id === newUser.id) {
          throw UserErrors.DUPLICATE_ID;
        }
        if (u.lastName === user.lastName && u.firstName === user.firstName) {
          throw UserErrors.USER_EXISTS;
        }
      });

      users.push(newUser);

      return id;
    } catch (error) {
      throw error;
    }
  };
}
