interface Comment {
  id: number;
  author_id: number;
  restaurant_id: number;
  content: string;
  create_date: string;
  update_date: string;
  stars: number;
  images?: string[];
}

export default Comment;

export const TestComments: Comment[] = [
  {
    id: 0,
    author_id: 1,
    restaurant_id: 0,
    content: `Me gustó la comida del restaurante. Los platos son atractivos y muy bonitos. Buena comida,
    espacio lujoso y servicio entusiasta. Volveré en
    el…`,
    create_date: new Date("2022-05-17T03:24:00"),
    update_date: new Date("2022-05-17T03:24:00"),
    stars: 4.9,
  },
  {
    id: 1,
    author_id: 2,
    restaurant_id: 1,
    content: `Me gustó la comida del restaurante. La reserva y la integración con Kellner fue maravillosa.
    Hicimos la reserva por la app, nos sentarnos en la mesa y pagamos al instante…`,
    create_date: new Date("2022-05-18T03:24:00"),
    update_date: new Date("2022-05-18T03:24:00"),
    stars: 4.9,
  },
];
