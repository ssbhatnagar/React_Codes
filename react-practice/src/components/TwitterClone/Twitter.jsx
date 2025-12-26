import { useState } from "react";

function Twitter() {

  const [userInput, setUserInput] = useState("");
  const [tweet, setTweets] = useState([]);
  const [editingInput, setEditingInput] = useState("");
  const [editingId, setEditingId] = useState(null)


  const [replyInput, setReplyInput] = useState("");
  const [replyingToId, setReplyingToId] = useState(null);


  function submitTweet() {
    if (userInput.trim() !== "") {
      const newTweet = {
        id: Date.now(),
        tweet: userInput,
        replies: []
      }
      setTweets((prevTweet) => [...prevTweet, newTweet])
      setUserInput("")
    } else {
      window.alert("Tweet Cannot be empty")
    }

  }

  function deleteTweet(id) {
    setTweets((prevTweet) => prevTweet.filter((t) => t.id !== id))
  }

  function editTweet(currentTweet) {
    setEditingId(currentTweet.id);
    setEditingInput(currentTweet.tweet)
  }

  function updateTweet(currentTweet) {
    if (editingInput.trim() !== "") {
      setTweets((prevTweet) =>
        prevTweet.map((t) =>
          t.id === currentTweet.id ? { ...t, tweet: editingInput } : t
        )
      );
      setEditingInput(""); // Reset editing input
      setEditingId(null); // Reset editing ID
    } else {
      window.alert("Tweet cannot be empty")
    }
  }

  function addReply(tweetId) {
  if (replyInput.trim() === "") {
    window.alert("Reply cannot be empty");
    return;
  }

  const newReply = {
    id: Date.now(),
    tweet: replyInput,
    replies: []
  };

  setTweets((prevTweet) =>
    prevTweet.map((t) =>
      t.id === tweetId
        ? { ...t, replies: [...t.replies, newReply] }
        : t
    )
  );

  setReplyInput("");
  setReplyingToId(null); // 🔥 IMPORTANT FIX
}


  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter ur tweet"
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
        ></input>
        <button onClick={() => submitTweet()} >Submit</button>
        <div>
          <ul>
            {tweet.map((t) =>
              <li key={t.id}>
                {t.id === editingId ? <span>
                  <input
                    type="text"
                    value={editingInput}
                    onChange={(e) => setEditingInput(e.target.value)}
                  />
                </span> : <span>{t.tweet}</span>}

                <button onClick={() => deleteTweet(t.id)}>Delete</button>
                {t.id === editingId ? (
                  <button onClick={() => updateTweet(t)}>Update</button>) : (<button onClick={() => editTweet(t)}>Edit</button>)}
                <button onClick={() => setReplyingToId(t.id)}>Reply</button>
                {replyingToId === t.id && (
                  <div style={{ marginLeft: "20px" }}>
                    <input
                      type="text"
                      placeholder="Write reply..."
                      value={replyInput}
                      onChange={(e) => setReplyInput(e.target.value)}
                    />
                    <button onClick={() => addReply(t.id)}>Add Reply</button>
                  </div>
                )}

                {/* Replies */}
                {t.replies.length > 0 && (
                  <ul style={{ marginLeft: "20px" }}>
                    {t.replies.map((r) => (
                      <li key={r.id}>
                        <span>{r.tweet}</span>
                      </li>
                    ))}
                  </ul>
                )}

              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )

}

export default Twitter;
