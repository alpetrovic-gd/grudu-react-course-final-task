import { useEffect, useState } from "react";
import TweetsList from "../components/TweetsList";
import { TweetModel } from "../models/TweetModel";
import { UserModel } from "../models/UserModel";
import classes from "./App.module.css";

type Tweet = Omit<TweetModel, "author"> & { author_id: string };

const App: React.FC = () => {
  const [tweets, setTweets] = useState<TweetModel[]>([]);
  const [newTweet, setNewTweet] = useState("");

  useEffect(() => {
    const fetchTweets = async () => {
      const responseTweets = await fetch("http://localhost:3001/tweets");
      const responseUsers = await fetch("http://localhost:3001/users");

      const tweets: Tweet[] = await responseTweets.json();
      const users: UserModel[] = await responseUsers.json();

      const tweetsWithAuthors: TweetModel[] = tweets.map((tweet: Tweet) => {
        const author = users.find((user: UserModel) => {
          return user.id === tweet.author_id;
        });

        return {
          id: tweet.id,
          author: author ? author : null,
          text: tweet.text,
        };
      });

      setTweets(tweetsWithAuthors);
    };

    fetchTweets();
  }, []);

  const handlePostTweet = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currentlyLoggedInUserJSONString =
      localStorage.getItem("loggedInUser");

    if (!currentlyLoggedInUserJSONString) {
      return;
    }

    const currentlyLoggedInUser: UserModel = JSON.parse(
      currentlyLoggedInUserJSONString
    );

    const newTweetId =
      Math.max(...tweets.map((tweet) => parseInt(tweet.id))) + 1;
    const newTweetAuthorId = currentlyLoggedInUser?.id;

    const response = await fetch("http://localhost:3001/tweets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: `${newTweetId}`,
        author_id: newTweetAuthorId,
        text: newTweet,
      }),
    });

    if (response.ok) {
      const newTweetModel: TweetModel = {
        id: `${newTweetId}`,
        author: currentlyLoggedInUser,
        text: newTweet,
      };
      setTweets((prevTweets) => [newTweetModel, ...prevTweets]);
      setNewTweet("");
    }
  };

  return (
    <main className={classes.container}>
      <form onSubmit={handlePostTweet} className={classes.form}>
        <textarea
          className={classes.tweetTextarea}
          placeholder="What's happening?"
          name="tweetText"
          minLength={1}
          maxLength={140}
          autoComplete="off"
          onChange={(event) => setNewTweet(event.target.value)}
          value={newTweet}
        ></textarea>

        <button className={classes.button}>Tweet</button>
      </form>
      <TweetsList tweets={tweets} />
    </main>
  );
};

export default App;
