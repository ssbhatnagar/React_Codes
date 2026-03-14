  import { useEffect, useState } from "react";

  const inititalTweets = [ // Level 1 outermost array
    { // Level 2 object inside array
      id: 1,
      tweetText: "Hi",
      reply: [ // Level 3 array inside object 
        { // Level 4 object inside array
          id: 1.1,
          replyText: "hello"
        },
        {
          id: 1.2,
          replyText: "hello"
        }
      ]
    },
    {
      id: 2,
      tweetText: "Hello",
      reply: [
        {
          id: 2.1,
          replyText: "hello2"
        },
        {
          id: 2.2,
          replyText: "hello2"
        }
      ]
    }

  ]


  function Twitter() {

    const [tweets, setTweets] = useState(inititalTweets)
    const [userInput, setUserInput] = useState("");

    const [editingInput, setEditingInput] = useState("");
    const [editingId, setEditingId] = useState(null);

    const [replyId, setReplyId] = useState(null);
    const [replyInput, setReplyInput] = useState("");

    function addTweet() {
      if (userInput.trim() !== "") {
        const newTweet = {
          id: Date.now(),
          tweetText: userInput,
          reply: []
        }
        setTweets((prev) => [...prev, newTweet])
        setUserInput("")
      } else {
        window.alert("Tweet cannot be empty")
      }
    }

    function deleteTweet(index) {
      setTweets((prev) =>
        prev.filter((t) => t.id !== index)
      )
    }

    function handleEdit(currentTweet) {
      setEditingId(currentTweet.id);
      setEditingInput(currentTweet.tweetText);
    }

    function updateTweet(currentTweet) {
      if (editingInput.trim() !== "") {
        setTweets((prev) =>
          prev.map((tweet) => tweet.id === currentTweet.id ? { ...tweet, tweetText: editingInput } : tweet)
        )
        setEditingInput("");
        setEditingId(null);
      } else {
        window.alert("Tweet cannot be empty")
      }
    }

    function addReply(currentTweet){
      setReplyId(currentTweet.id)

    }

    function submitReply(index){
      if (replyInput.trim() !== "") {
        const newReply = {
          id: Date.now(),
          replyText: replyInput
        }
        setTweets((prev) => 
          prev.map((tweet) =>
            tweet.id === index ? {...tweet, reply: [...tweet.reply, newReply]} : tweet
          )
        )
        setReplyInput("")
        setReplyId(null)
      } else {
        window.alert("Tweet cannot be empty")
      }
    }

    return (
      <div>
        <h1>Twitter</h1>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter your Tweet"
        />
        <button onClick={addTweet}>Add Tweet</button>
        <ul>
          {tweets.map((tweet) =>
            <li key={tweet.id}>
              {tweet.id === editingId ? (
                (<input
                  type="text"
                  value={editingInput}
                  onChange={(e) => setEditingInput(e.target.value)}
                />)
              ) : (<span>{tweet.tweetText}</span>)}

              <button onClick={() => deleteTweet(tweet.id)}>Delete</button>
              {tweet.id === editingId ? (<button onClick={() => updateTweet(tweet)}>update</button>) : (<button onClick={() => handleEdit(tweet)} >Edit</button>)}
              {tweet.id === replyId ? (<button onClick={() => submitReply(tweet.id)}>Submit Reply</button>) :  (<button onClick={() => addReply(tweet)}>Reply</button>)}           
              <div>
              {(replyId === tweet.id) && (
                <input
                type="text"
                value={replyInput}
                onChange={(e) => setReplyInput(e.target.value)}
                />
              )}
              </div>
              <ul>
                {tweet.reply.map((rep) =>
                  <li key={rep.id}>
                    {rep.replyText}
                  </li>
                )}
              </ul>
            </li>
          )}
        </ul>
      </div>
    )


  }

  export default Twitter;
