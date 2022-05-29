export class CarouselTourModel {
  constructor(
    public imageLink?: string,
    public name?: string,
  ) {
  }

  public static fromObject(image: CarouselTourModel): CarouselTourModel {
    return new CarouselTourModel(
      image.imageLink,
      image.name
    );
  }
}
