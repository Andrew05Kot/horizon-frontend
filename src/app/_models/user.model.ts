import { Photo } from "./photo.model";
import { ImageModel } from "./image.model";
import { Locale } from "./locale.model";
import { Locales } from "../_constants/locale.constants";

export class User {
  public locale?: Locale;

  constructor(public id: number,
              public socialId?: string,
              public lastName?: string,
              public firstName?: string,
              public photo?: Photo,
              public birthDate?: string,
              public role?: string,
              public email?: string,
              public phoneNumber?: string,
              public aboutMe?: string,
              public language?: string,
              public photoUrl?: string, // does not exist in response and request
              public fullName?: string, // does not exist in response and request
              public image?: ImageModel,
              public rate?: number
  ) {
    this.locale = Locales.VALUES.find(locale => {
      return locale.language == this.language;
    });
  }

  public static fromObject(model: User) {
    return new User(
      model.id,
      model.socialId,
      model.lastName,
      model.firstName,
      model.photo,
      model.birthDate,
      model.role,
      model.email,
      model.phoneNumber,
      model.aboutMe,
      model.language,
      model.photoUrl,
      model.fullName,
      model.image ? ImageModel.fromObject(model.image) : model.image,
      model.rate
    );
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
