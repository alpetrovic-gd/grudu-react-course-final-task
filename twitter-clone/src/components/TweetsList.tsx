import { TweetModel } from "../models/TweetModel";
import Tweet from "./Tweet";

type Props = {
  tweets: TweetModel[];
};

const TweetsList: React.FC<Props> = ({ tweets }) => {
  return (
    <div>
      {tweets.map((tweet: TweetModel) => {
        return <Tweet key={tweet.id} tweet={tweet} />;
      })}
    </div>
  );
};

export default TweetsList;
