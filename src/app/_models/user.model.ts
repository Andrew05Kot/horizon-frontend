import {Photo} from "./photo.model";
import { ImageModel } from "./image.model";

export class User {
  public id: number;
  public socialId?: string;
  public lastName: string;
  public firstName: string;
  public photo: Photo;
  public birthDate?: string;
  public role?: string;
  public email?: string;
  public phoneNumber?: string;
  public aboutMe?: string;
  public language?: string;
  public photoUrl?: string; // does not exist in response and request
  public fullName?: string; // does not exist in response and request
  public image?: ImageModel

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
    this.image = this.image ? ImageModel.fromObject(this.image) : this.image;
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
