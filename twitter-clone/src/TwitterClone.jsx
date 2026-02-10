// CODE 1 YE CODE SIRF TWEETS LEGA NO REPLIES.

// function TwitterClone() {

//   const [userInput, setUserInput] = useState("");
//   const [tweets, setTweets] = useState([]);

//   const [editingInput, setEditingInput] = useState("");
//   const [editingID, setEditingID] = useState(null);

//   function handleSubmit() {
//     if (userInput.trim() !== "") {
//       const newTweet = {
//         id: Date.now(),
//         text: userInput
//       }
//       setTweets((prevTweet) => [...prevTweet, newTweet]);
//       setUserInput("")
//     } else {
//       window.alert("Tweet cannot be empty")
//     }
//   }

//   function handleDelete(index) {
//     setTweets((prevTweet) =>
//       prevTweet.filter((t) => t.id !== index)
//     )
//   }

//   function handleEdit(currentTweet) {
//     setEditingInput(currentTweet.text);
//     setEditingID(currentTweet.id)
//   }

//   function handleUpdate(currentTweet) {
//     if (editingInput.trim() !== "") {
//       setTweets((prevTweet) =>
//         prevTweet.map((t) =>
//           t.id === currentTweet.id ? ({ ...t, text: editingInput }) : (t)
//         )
//       )
//       setEditingInput(""); // Reset editing input
//       setEditingID(null); // Reset editing ID
//     } else {
//       winndow.alert("Edit input cannot be empty")
//     }


//   }


//   return (
//     <div>
//       <div>
//         <input
//           type="text"
//           placeholder='Enter your tweet'
//           value={userInput}
//           onChange={(e) => setUserInput(e.target.value)}
//         ></input>
//         <button onClick={() => handleSubmit()} >Submit</button>
//         <div>
//           <ul>
//             {tweets.map((tweet) =>
//               <li key={tweet.id}>
//                 {tweet.id === editingID ? (
//                   <input
//                     type='text'
//                     value={editingInput}
//                     onChange={(e) => setEditingInput(e.target.value)}
//                   ></input>
//                 ) : (<span>{tweet.text}</span>)}

//                 <button onClick={() => handleDelete(tweet.id)} >Delete</button>
//                 {tweet.id === editingID ? (<button onClick={() => handleUpdate(tweet)}> Update</button>) : (<button onClick={() => handleEdit(tweet)}>Edit</button>)}
//               </li>
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   )

// }

// export default TwitterClone;

//  CODE 2 YE SIRF EK LEVEL KE REPLIES WALA HAI



import React, { useState } from 'react';

const TwitterClone = () => {
  const [userInput, setUserInput] = useState("");
  const [tweets, setTweets] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingInput, setEditingInput] = useState("");
  const [replyingToId, setReplyingToId] = useState(null);
  const [replyInput, setReplyInput] = useState("");

  // Naya Tweet add karne ke liye
  const handleSubmit = () => {
    if (userInput.trim() !== "") {
      const newTweet = { id: Date.now(), text: userInput, replies: [] };
      setTweets((prev) => [...prev, newTweet]);
      setUserInput("");
    } else {
      window.alert("Tweet Cannot be empty");
    }
  };

  // Reply add karne ke liye
  const addReply = (tweetId) => {
    if (replyInput.trim() !== "") {
      const newReply = { id: Date.now(), rep: replyInput };
      setTweets((prev) =>
        prev.map((t) =>
          t.id === tweetId ? { ...t, replies: [...t.replies, newReply] } : t
        )
      );
      setReplyInput("");
      setReplyingToId(null);
    } else {
      window.alert("Reply cannot be empty");
    }
  };

  // Delete Logic
  const handleDelete = (id, isReply, parentId) => {
    if (!isReply) {
      setTweets((prev) => prev.filter((t) => t.id !== id));
    } else {
      setTweets((prev) =>
        prev.map((t) =>
          t.id === parentId
            ? { ...t, replies: t.replies.filter((r) => r.id !== id) }
            : t
        )
      );
    }
  };

  // Cancel Edit Logic
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingInput("");
  };

  // Update Logic
  const handleUpdate = (id, isReply, parentId) => {
    if (editingInput.trim() === "") return alert("Input cannot be empty");

    if (!isReply) {
      setTweets((prev) =>
        prev.map((t) => (t.id === id ? { ...t, text: editingInput } : t))
      );
    } else {
      setTweets((prev) =>
        prev.map((t) =>
          t.id === parentId
            ? { ...t, replies: t.replies.map((r) => (r.id === id ? { ...r, text: editingInput } : r)) }
            : t
        )
      );
    }
    handleCancelEdit();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <input
        type="text"
        placeholder='What’s happening?'
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>

      <ul>
        {tweets.map((tweet) => (
          <li key={tweet.id} style={{ marginTop: "15px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
            
            {/* TWEET SECTION */}
            {editingId === tweet.id ? (
              <div>
                <input 
                  value={editingInput} 
                  onChange={(e) => setEditingInput(e.target.value)} 
                />
                <button onClick={() => handleUpdate(tweet.id, false)}>Update</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                <strong>{tweet.text}</strong>
                <button onClick={() => { setEditingId(tweet.id); setEditingInput(tweet.text); }}>Edit</button>
                <button onClick={() => handleDelete(tweet.id, false)}>Delete</button>
                <button onClick={() => setReplyingToId(tweet.id)}>Reply</button>
              </div>
            )}

            {/* REPLY INPUT SECTION */}
            {replyingToId === tweet.id && (
              <div style={{ marginTop: "10px", marginLeft: "20px" }}>
                <input
                  type="text"
                  value={replyInput}
                  onChange={(e) => setReplyInput(e.target.value)}
                  placeholder="Tweet your reply"
                />
                <button onClick={() => addReply(tweet.id)}>Add</button>
                <button onClick={() => setReplyingToId(null)}>Cancel</button>
              </div>
            )}

            {/* REPLIES RENDERING */}
            <ul style={{ marginLeft: "25px", color: "gray", listStyleType: "circle" }}>
              {tweet.replies.map((r) => (
                <li key={r.id} style={{ marginTop: "5px" }}>
                  {editingId === r.id ? (
                    <div>
                      <input 
                        value={editingInput} 
                        onChange={(e) => setEditingInput(e.target.value)} 
                      />
                      <button onClick={() => handleUpdate(r.id, true, tweet.id)}>Update</button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </div>
                  ) : (
                    <div>
                      {r.rep}
                      <button onClick={() => { setEditingId(r.id); setEditingInput(r.rep); }} style={{ fontSize: "10px" }}>Edit</button>
                      <button onClick={() => handleDelete(r.id, true, tweet.id)} style={{ fontSize: "10px" }}>Delete</button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TwitterClone;




