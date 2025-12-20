import { useState } from "react";


function Twitter() {

    const [userInput, setUserInput] = useState("");
    const [tweet, setTweet] = useState([]);
    const [editingInputTweet, setEditingInputTweet] = useState("");
    const [editTweetId, setEditTweetId] = useState(null);

    const [userReplyInput, setUserReplyInput] = useState("");
    const [replies, setReplies] = useState([])
    
    function submitTweet() {
        if (userInput.trim() !== "") {
            const newTweet = {
                id: Date.now(),
                tweet: userInput,
                reply: [
                    {
                        replyId: Date.now(),
                        reply: userReplyInput
                    }
                ],
            }

            setTweet((prevTweet) => [...prevTweet, newTweet]);

        } else {
            window.alert("Tweet Cannot be empty")
        }
        setUserInput("")
    }

    function DeleteTweet(index) {
        setTweet((prevTweet) => prevTweet.filter((tweet) => tweet.id !== index))
    }

    function edit(currentTweet) {
        setEditingInputTweet(currentTweet.tweet);
        setEditTweetId(currentTweet.id)
    }

    function updateTweet(currentTweet) {
        if (editingInputTweet.trim() !== "") {
            setTweet((prevTweet) =>
                prevTweet.map((tweet) =>
                    tweet.id === currentTweet.id ? { id: currentTweet.id, tweet: editingInputTweet } : tweet
                )
            );
            setEditTweetId(null)
            setEditingInputTweet("")
        } else {
            window.alert("Tweet Cannot be empty")
        }
    }

    function replyTweet(){

    }

    return (
        <div>
            <input
                type="text"
                placeholder="Tweet here"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
            ></input>
            <button onClick={() => submitTweet()}>tweet</button>
            <div>
                <ul>
                    {tweet.map((tweet) =>
                        <li key={tweet.id}>
                            {tweet.id === editTweetId ?
                                <span>
                                    <input
                                        type="text"
                                        value={editingInputTweet}
                                        onChange={(e) => setEditingInputTweet(e.target.value)}
                                    ></input>
                                </span>
                                : <span>{tweet.tweet}</span>}

                            <span>
                                <button onClick={() => DeleteTweet(tweet.id)}>Delete</button>
                                {tweet.id === editTweetId ? 
                                <span><button onClick={() => updateTweet(tweet)}>Update</button></span> : 
                                <span><button onClick={() => edit(tweet)}>Edit</button></span>}
                                
                                <button onClick={() => replyTweet(tweet.id)}>Reply</button>
                            </span>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )

}

export default Twitter;