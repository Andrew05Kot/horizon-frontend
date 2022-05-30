import { BookingStatus } from "../_constants/booking-status.constants";
import { Tour } from "./tour.model";
import { User } from "./user.model";

export class Booking {

  constructor(public id?: number,
              public status?: BookingStatus,
              public tourId?: number,
              public touristId?: number,
              public tour?: Tour,
              public tourist?: User,
              public liked?: Boolean,
  ) {
  }

  static fromObject(object: Booking): Booking {
    return new Booking(
      object.id,
      object.status,
      object.tourId,
      object.touristId,
      object.tour,
      object.tourist,
      object.liked,
    );
  }
}
