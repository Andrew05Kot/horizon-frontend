import {Photo} from "./photo.model";

export class User {
  public id: number;
  public socialId?: string;
  public lastName: string;
  public firstName: string;
  public photo: Photo;
  public birthDate?: string;
  public role?: string;
  public email?: string;
  public language?: string;
  public photoUrl?: string; // does not exist in response and request
  public fullName?: string; // does not exist in response and request

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }

  static getUserFullName(user: User): string {
    return user.firstName + ' ' + user.lastName;
  }

  static getUserPhotoUrlOrDefault(user: User): string {
    if (user && user.photo !== null) {
      return '/server/v1' + `/photos/${user.photo.id}`;
    }
    return './assets/img/user.png';
  }

}