import { UserModel } from "./UserModel";

export interface TweetModel {
  id: string;
  author: UserModel | null;
  text: string;
}
