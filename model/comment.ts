interface Comment {
  id: number;
  author_id: number;
  restaurant_id: number;
  content: string;
  create_date: Date;
  update_date: Date;
  stars: number;
}

export default Comment;
