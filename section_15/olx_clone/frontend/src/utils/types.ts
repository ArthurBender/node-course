// USER ----------------------------------------------------------
interface User {
  name: string;
  email: string;
  phone: string;
}

interface UserToCreate extends User {
  password: string;
  confirmPassword: string;
}

interface UserToLogin {
  email: string;
  password: string;
}

interface UserFromApi extends User {
  _id: string;
  avatarPath: string;
  createdAt: string;
  updatedAt: string;
}

// ITEM ----------------------------------------------------------
interface Item {
  title: string;
  description: string;
  price: number;
  category: string;
  condition: string;
}

interface ItemToSave extends Item {
  images?: (File)[];
}

interface ItemFromApi extends Item {
  _id: string;
  imagesPaths: string[];
  available: boolean;
  createdAt: string;
  updatedAt: string;
  buyer?: User;
  owner?: User;
}

// OTHERS --------------------------------------------------------

interface ApiResponse {
  status: number;
  message: string;
  data?: object;
}

export type { User, UserToCreate, UserToLogin, UserFromApi, Item, ItemToSave, ItemFromApi, ApiResponse };