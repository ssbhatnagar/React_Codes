import { useState } from 'react';
import data from '../Data/data.json';
import List from '../Component/List';

// COMPONENT 2: NestedReplies (Parent)
function NestedReplies() {
    const [tweets, setTweets] = useState(data);
    const [userTweetInput, setUserTweetInput] = useState("");

    const [replyInput, setReplyInput] = useState("");
    const [replyId, setReplyId] = useState(null);

    const [editingId, setEditingId] = useState(null);
    const [editingInput, setEditingInput] = useState("");

    function addTweet() {
        if (userTweetInput.trim() !== "") {
            const newTweet = {
                id: Date.now().toString(),
                content: userTweetInput,
                replies: []
            };
            setTweets((prev) => [...prev, newTweet]);
            setUserTweetInput("");
        } else {
            window.alert("Tweet is empty");
        }
    }

    function handleAddReply(currentId) {
        setReplyId(currentId);
        setEditingId(null); // Taki ek time pe ek hi box khule
    }

    function postReply(parentId) {
        if (replyInput.trim() === "") {
            window.alert("reply cannot be empty");
            return;
        }
        const newReply = {
            id: Date.now().toString(),
            content: replyInput,
            replies: []
        };
        const updateTree = (list) => {
            return list.map((node) => {
                if (node.id === parentId) {
                    return { ...node, replies: [...node.replies, newReply] };
                }
                if (node.replies && node.replies.length > 0) {
                    return { ...node, replies: updateTree(node.replies) };
                }
                return node;
            });
        };
        setTweets((prev) => updateTree(prev));
        setReplyId(null);
        setReplyInput("");
    }

    function deleteTweet(id) {
        function updateTree(list) {
            return list.filter((tweet) => tweet.id !== id).map((tweet) => {
                if (tweet.replies) {
                    return { ...tweet, replies: updateTree(tweet.replies) };
                }
                return tweet;
            });
        }
        setTweets((prev) => updateTree(prev));
    }

    // NAYA FUNCTION: Edit Save karne ke liye
    function saveEdit(idToUpdate) {
        if (editingInput.trim() === "") {
            window.alert("Content cannot be empty");
            return;
        }

        const editTree = (list) => {
            return list.map((tweet) => {
                // Agar ID match ho gayi, toh naya content daal do
                if (tweet.id === idToUpdate) {
                    return { ...tweet, content: editingInput };
                }
                // Agar ID match nahi hui, aur replies hain, toh andar jake dhoondo
                if (tweet.replies && tweet.replies.length > 0) {
                    return { ...tweet, replies: editTree(tweet.replies) };
                }
                // Default return
                return tweet;
            });
        };

        setTweets((prev) => editTree(prev));
        setEditingId(null); // Input box band karne ke liye
        setEditingInput("");
    }

    return (
        <div>
            <h2>Twitter Replies</h2>
            <input
                type="text"
                placeholder='Enter your tweet'
                value={userTweetInput}
                onChange={(e) => setUserTweetInput(e.target.value)}
            />
            <button onClick={() => addTweet()}>Add Tweet</button>

            <List 
                tweets={tweets} 
                addReply={handleAddReply} 
                replyId={replyId} 
                replyInput={replyInput} 
                setReplyInput={setReplyInput} 
                postReply={postReply} 
                deleteTweet={deleteTweet}
                editingId={editingId}
                setEditingId={setEditingId}
                editingInput={editingInput}
                setEditingInput={setEditingInput}
                saveEdit={saveEdit} 
            />
        </div>
    );
}

export default NestedReplies;