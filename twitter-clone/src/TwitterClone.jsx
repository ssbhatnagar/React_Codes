import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function TwitterClone() {

  /*
  is project mai ye sab banana hai - 
  1. Tweet operations kar sake Add, Delete, update, read 
  2. har tweet ka ek title hoga jisspe hum search bar lagayenge 
  3. Replies bhi kar skate honge har tweeet par 
  4. Replaies par bhi same operations hone chahiye add, delete, update read 
  5. likes bhi add karenge for both tweet and replies 
  6. use local storage 
  7. tweet ki kuch categories hongi jaise ki - general tweet, political tweet, finance tweet, fictional tweet aise jisse hum ek filter dalenge using checkboxes
  8. sab hooks use karne hai mostly sab cover ho jaye take
  */

  const [userInput, setUserInput] = useState("");
  const [tweets, setTweets] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editInput, setEditInput] = useState("");

  const [replyInput, setReplyInput] = useState("");

  function handleSubmit() {
    if (userInput.trim() !== "") {
      const newTweet = {
        id: Date.now(),
        text: userInput, 
        replies: []
      }

      setTweets((prev) => [...prev, newTweet])
      setUserInput("")
    } else {
      window.alert("Tweet cannot be empty")
    }
  }

  function handleDelete(currentId) {
    setTweets((prev) => prev.filter((t) => t.id !== currentId));
  }

  function handleEdit(currentTweet) {
    setEditInput(currentTweet.text);
    setEditingId(currentTweet.id)
  }

  function updateTweet(currentTweet) {
    if(editInput.trim() !== ""){
      setTweets((tweet) =>
        tweet.map((t) =>
        (t.id === currentTweet.id ? ({...t, text:editInput}) : (t))
        )
      )
      setEditInput("")
      setEditingId(null)
    }else{
      window.alert("Editing input cannot be empty")
    }
  }

  function addReply(currentTweet){

  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder='enter your tweet'
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        ></input>
        <button onClick={() => handleSubmit()}>
          Submit
        </button>
        <div>
          <ul>
            {tweets.map((tweet) =>
              <li key={tweet.id}>
                {tweet.id === editingId ? (
                  <input
                    type='text'
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                  ></input>
                ) :  
                ( <span>{ tweet.text }</span>)}
                <button onClick={() => handleDelete(tweet.id)} >Delete</button>
                {tweet.id === editingId ? 
                (<button onClick={() => updateTweet(tweet)}> Update</button>) 
                : (<button onClick={() => handleEdit(tweet)}>Edit</button>)}
                <button onClick={() => addReply(tweet)} >reply</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TwitterClone
