import { useEffect, useState } from "react";

function Twitter() {

  /**
   * Dekho bhai twitter ka clone banana easy hai waha tak jaha tak normally input lena hai store karna hai aur array mai aur display karwana hai, CRUD bhi easy hai but the point is jab kaam aat ahai replies add karne ka vo thoda sa tricky hai but karte hai step wise with algo
   */

  const [userInput, setUserInput] = useState("");
  const [replyToId, setReplyToId] = useState(null);
  const [replyInput, setReplyInput] = useState("");
  
  const [tweets, setTweets] = useState(() => {
    const savedTweets = localStorage.getItem("tweetsData");
    return savedTweets ? JSON.parse(savedTweets) : []
  })  

  useEffect(() => {
    localStorage.setItem("tweetsData", JSON.stringify(tweets))
  }, [tweets])

  function handleSubmit(){
    if(userInput.trim() !== ""){
      const newTweet = {
        id: Date.now(),
        text:userInput,
        replies:[]
      }
      setTweets((prev) => [...prev, newTweet])
      setUserInput("")
    }else{
      window.alert("Tweet cannot be empty")
    }
  }

  function addTweet(tweetId){
    if (replyInput.trim() === "") {
    window.alert("Reply cannot be empty");
    return;
  }
    const newReply = {
      id: Date.now(),
      text: replyInput,
      replies: []
    }

    setTweets((prevTweet) =>
      prevTweet.map((tweet) =>
        tweet.id === tweetId 
    ? {...tweet, replies: [...tweet.replies, newReply]} :  tweet 
      )
    )
    setReplyInput("");
  setReplyToId(null);


  }

  function handleCancel() {
    setReplyToId(null);
    setReplyInput("");

}

  return(
    <div>
      <div>
        <label>
          Enter your Tweet:
        <input
        type="text"
        name="userTweetInput"
        placeholder="Enter your tweets ..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        />
        </label>
        <button onClick={handleSubmit} >submit</button>        
      </div>
      <div>
        <ul>
          {tweets.map((tweet) =>
          <li key={tweet.id}>
            {tweet.text}
            {replyToId === tweet.id ? ( 
              <div>
              <button onClick={() => addTweet(tweet.id)}>add</button>
              <button onClick={handleCancel}>Cancel</button>
              </div>
            )
            : <button onClick={() => setReplyToId(tweet.id)} >reply</button> }
            {replyToId === tweet.id && (
              <div>
                <input
                type="text"
                name="replyInput"
                value={replyInput}
                onChange={(e) => setReplyInput(e.target.value)}
                placeholder="Enter your Reply"
                />
              </div>
            )}
            {/* Replies */}
                {tweet.replies.length > 0 && (
                  <ul style={{ marginLeft: "20px" }}>
                    {tweet.replies.map((r) => (
                      <li key={r.id}>
                        <span>{r.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
          </li>
          )}
        </ul>
      </div>
    </div>
  )
 
 
}

export default Twitter;
