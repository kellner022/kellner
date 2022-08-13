interface Restaurant {
  id: number;
  name: string;
  logo?: string;
  loc: number[];
  recips: number[];
  images: string[];
  address: string;
  stars: number;
  introduction: string;
  comments: number[];
}

export default Restaurant;
