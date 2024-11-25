export class Course {
    id: string;
    name: string;
    image: string;
    price: number;
    isPopular: boolean;
    startDate: string;
    modules: string[];
    category: string;
    description: string;
    reviews?: { user: string; comment: string }[];
  
    constructor(
      id: string,
      name: string,
      image: string,
      price: number,
      isPopular: boolean,
      startDate: string,
      modules: string[],
      category: string,
      description: string,
      reviews: { user: string; comment: string }[] = []
    ) {
      this.id = id;
      this.name = name;
      this.image = image;
      this.price = price;
      this.isPopular = isPopular;
      this.startDate = startDate;
      this.modules = modules;
      this.category = category;
      this.description = description;
      this.reviews = reviews;
    }
  }
  
