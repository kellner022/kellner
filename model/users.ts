interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  userToken?: string;
  avatar?: string;
  favoriates?: number[];
}

export default User;
