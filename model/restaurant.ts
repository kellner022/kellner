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

export const TestRestaurants: Restaurant[] = [
  {
    id: 0,
    name: 'Bar Italia',
    loc: [105.32, 56.75],
    recips: [0, 1, 2],
    images: ['https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fkellner-test-restaurants-2.png?alt=media&token=36873756-2d2d-4f16-8133-233980503556'],
    logo: 'https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fkellner-restaurant-logo-italybar.png?alt=media&token=a2ca97f6-9f39-4d7a-9664-c11fcc3741df',
    address: 'Viale Europa, 21, 80053 Castellammare di Stabia NA, Italy',
    stars: 4.9,
    introduction: '',
    comments: [0, 1, 2, 3],
  },
  {
    id: 1,
    name: 'Corito sano',
    loc: [105.32, 56.75],
    recips: [0, 1, 2],
    images: ['https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fkellner-test-restaurants-1.png?alt=media&token=36873756-2d2d-4f16-8133-233980503556'],
    address: 'Viale Europa, 21, 80053 Castellammare di Stabia NA, Italy',
    stars: 4.9,
    introduction: '',
    comments: [0, 1, 2, 3],
  },
  {
    id: 2,
    name: 'Corito IN-sano',
    loc: [105.32, 56.75],
    recips: [0, 1, 2],
    images: ['https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fkellner-test-restaurants-3.png?alt=media&token=36873756-2d2d-4f16-8133-233980503556'],
    address: 'Viale Europa, 21, 80053 Castellammare di Stabia NA, Italy',
    stars: 4.9,
    introduction: '',
    comments: [0, 1, 2, 3],
  },
  {
    id: 3,
    name: 'Bambaa American',
    loc: [115.45, 96.13],
    recips: [0, 1, 2],
    images: ['https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fkellner-test-new-1.png?alt=media&token=5016916c-8d8c-47cc-8bcc-a7ef852f72ae'],
    address: '202 S Main St, Salt Lake City, UT 84101US',
    stars: 4.9,
    introduction: '',
    comments: [0, 1, 2, 3],
  },
  {
    id: 4,
    name: 'Donna Panca',
    loc: [155.45, 206.13],
    recips: [0, 1, 2],
    images: ['https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fkellner-test-new-1.png?alt=media&token=5016916c-8d8c-47cc-8bcc-a7ef852f72ae'],
    address: '202 S Main St, Salt Lake City, UT 84101US',
    stars: 4.9,
    introduction: '',
    comments: [0, 1, 2, 3],
  },
  {
    id: 5,
    name: 'Donna Panca',
    loc: [155.45, 206.13],
    recips: [0, 1, 2],
    images: ['https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fkellner-test-new-1.png?alt=media&token=5016916c-8d8c-47cc-8bcc-a7ef852f72ae'],
    address: '202 S Main St, Salt Lake City, UT 84101US',
    stars: 4.9,
    introduction: '',
    comments: [0, 1, 2, 3],
  },
  {
    id: 4,
    name: 'Mulberry Pizza',
    loc: [97.38, 102.54],
    recips: [0, 1, 2],
    images: ['https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fkellner-test-back-1.png?alt=media&token=6dd73b92-6ad8-4821-a7fc-59b9ea6d416e'],
    address: '101 Smith Ranch Rd C, San Rafael, CA 94903US',
    stars: 4.9,
    introduction: '',
    comments: [0, 1, 2, 3],
  },
  {
    id: 5,
    name: 'Café Paris',
    loc: [97.38, 102.54],
    recips: [0, 1, 2],
    images: ['https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fkellner-test-back-2.png?alt=media&token=e630a206-5bd5-4c0d-934c-19003bc2f70e'],
    address: '101 Smith Ranch Rd C, San Rafael, CA 94903US',
    stars: 4.9,
    introduction: '',
    comments: [0, 1, 2, 3],
  },
  {
    id: 6,
    name: 'Fiorentini',
    loc: [97.38, 102.54],
    recips: [0, 1, 2],
    images: ['https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fkellner-test-back-3.png?alt=media&token=a1b40d22-6040-42af-b94a-72a8e96619fd'],
    address: '101 Smith Ranch Rd C, San Rafael, CA 94903US',
    stars: 4.9,
    introduction: '',
    comments: [0, 1, 2, 3],
  },
];