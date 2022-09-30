export interface ButtonState {
  post: {
    clicked?: boolean;
  };
}

export interface Posts {
  postsId: string;
  id: string;
  description: string;
  image: string;
  username: string;
  picture: string;
  userImg: string;
  createdAt: string;
  feeling: string;
  likes: number;
}

export interface Followed {
  id: string;
  username: string;
  cover_photo: string;
  picture: string;
}

export interface FormikInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface FormigLoginInterface {
  email: string;
  password: string;
}

export interface UserToken {
  username: string;
  id: string;
  name: string;
  lname: string;
  img: string;
  cover: string;
}

export interface UserState {
  userInfo: {
    userInfo: [];
    userId: string;
    friendId: string;
    username?: string;
    name?: string;
    lname?: string;
    login?: string;
    image?: string;
    toggle?: boolean;
    suggestedId: string;
    followed?: boolean;
    allFollowed?: string;
    isOwner?: boolean;
  };
}

export interface UserInfo {
  userId?: string;
  name?: string;
  lname?: string;
  image?: string;
  toggle?: boolean;
}

export interface UserTokenInfo {
  id: string;
}

export interface UserDataInfo {
  userInfo: {
    userDataInfo: {
      cover_photo?: string;
      username?: string;
      first_name?: string;
      last_name?: string;
      picture?: string;
    };
  };
}

export interface FriendData {
  userInfo: {
    userFriendInfo: {
      cover_photo?: string;
      username?: string;
      first_name?: string;
      last_name?: string;
      picture?: string;
    };
  };
}

export interface userSuggestions {
  userData: {
    userDataInfo: {
      cover_photo?: string;
      username?: string;
      first_name?: string;
      last_name?: string;
      picture?: string;
    };
  };
}

export interface PostEditing {
  post: {
    editing: boolean;
    count: number;
  };
}

export interface imgUpload {
  desc: string;
}

export interface Feeling {
  post: {
    feelings: string;
  };
}

export interface FriendsList {
  username: string;
  cover_photo: string;
  picture: string;
}

export interface FriendsListMaped {
  friend: {
    id: string;
    username: string;
    cover_photo: string;
    picture: string;
  };
}

export interface Dropdown {
  openDropdown?: boolean;
}

export interface UserInfoData {
  user: UserDataInfo | undefined;
}

export interface UserInfoFollow {
  isSuggested?: boolean;
  userInfo: string;
  url: string;
}

export interface UserToFollow {
  id: string;
  username: string;
  name: string;
  lname: string;
  picture: string;
  cover: string;
}

export interface PostReducer {
  post: {
    login?: string;
  };
}
