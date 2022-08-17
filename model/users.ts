interface User {
  id: number;
  email: string;
  login_name?: string;
  display_name?: string,
  userToken?: string;
  avatar?: string;
  uid?: string,
  phone: string,
  verified: boolean,
  follows?: number[],
  reviews?: number[],
}

export default User;

export const TestUsers: User[] = [
  {
    id: 0,
    email: "ivan@mail.kellner.com",
    login_name: "ivan",
    display_name: "Ivan Navalon",
    avatar: "https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Favatar-ivan.png?alt=media&token=bb104efb-5643-420c-b2d4-3d51409d96af",
    phone: "+1-156464757",
    verified: true,
  },
  {
    id: 1,
    email: "guillermo@mail.kellner.com",
    login_name: "guillermo",
    display_name: "Guillermo Megias",
    avatar: "https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Favatar-guillermo.png?alt=media&token=0f58910d-febe-4a73-96a6-199c0ba45c25",
    phone: "+1-1434664769",
    verified: true,
  },
  {
    id: 2,
    email: "yliu@mail.kellner.com",
    login_name: "yliu197",
    display_name: "Yuming Liu",
    avatar: "https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Favatar-yuming.png?alt=media&token=27cff634-0ec2-494e-a015-596b8e9f82d1",
    phone: "+86-1581334354",
    verified: true,
  },
];