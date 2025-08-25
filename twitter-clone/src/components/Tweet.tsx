import { TweetModel } from "../models/TweetModel";
import classes from "./Tweet.module.css";
import DOMPurify from "dompurify";

type Props = {
  tweet: TweetModel;
};

const Tweet: React.FC<Props> = ({ tweet: { author, text } }) => {
  let authorInitials = author?.name
    .split(" ")
    .map((word) => word[0])
    .join("");

  return (
    <div className={classes.container}>
      <div className={classes.authorInfo}>
        <div className={classes.authorInitials}>{authorInitials}</div>
        <div className={classes.authorName}>{author?.name}</div>
      </div>

      <div
        className={classes.text}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }}
      />
    </div>
  );
};

export default Tweet;
