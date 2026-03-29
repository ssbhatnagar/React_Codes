import React, { useState } from 'react';
import List from '../components/List'
import data from '../data/data.json';
import Styles from '../css/NestedTwitterClone.module.css';


// ==========================================
// 2. MAIN PARENT COMPONENT
// ==========================================
function NestedTwitterClone() {
    const [tweets, setTweets] = useState(data);

    // States
    const [userInput, setUserInput] = useState(""); // Top level tweet
    const [replyInput, setReplyInput] = useState("");
    const [replyId, setReplyId] = useState(null); // Kis par reply kar rahe hain
    const [editInput, setEditInput] = useState("");
    const [editId, setEditId] = useState(null); // Kisko edit kar rahe hain

    // --- CREATE (Top Level) ---
    function addTweet() {
        if (userInput.trim() === "") return window.alert("Tweet cannot be empty");
        const newTweet = {
            id: Date.now().toString(),
            author: "@ssb",
            content: userInput,
            likes: 0,
            replies: []
        };
        setTweets((prev) => [...prev, newTweet]);
        setUserInput("");
    }

    // --- CREATE (Recursive Reply) ---
    function openReplyBox(id) {
         setReplyId(id); 
         setEditId(null); 
    }

    function submitReply(parentId) {
        if (replyInput.trim() === "") return window.alert("Reply cannot be empty");
        
        const newReply = { 
            id: Date.now().toString(), 
            author: "@ssb", 
            content: replyInput, 
            likes: 0, 
            replies: [] 
        };

        const insertReplyNode = (list) => {
            return list.map((item) => {
                if (item.id === parentId) {
                    return { ...item, replies: [...item.replies, newReply] };
                } else if (item.replies && item.replies.length > 0) {
                    return { ...item, replies: insertReplyNode(item.replies) };
                }
                return item;
            });
        };
        setTweets((prev) => insertReplyNode(prev));
        setReplyInput("");
        setReplyId(null);
    }

    // --- UPDATE (Recursive Edit) ---
    function openEditBox(id, currentText) { 
        setEditId(id); 
        setEditInput(currentText); 
        setReplyId(null); 
    }

    function submitEdit(targetId) {
        if (editInput.trim() === "") 
            return window.alert("Content cannot be empty");

        const updateNode = (list) => {
            return list.map((item) => {
                if (item.id === targetId) {
                    return { ...item, content: editInput }; // Content update kiya
                } else if (item.replies && item.replies.length > 0) {
                    return { ...item, replies: updateNode(item.replies) }; // Recursion
                }
                return item;
            });
        };
        setTweets((prev) => updateNode(prev));
        setEditInput("");
        setEditId(null);
    }

    // --- DELETE (Recursive Delete) ---
    function deleteTweetNode(targetId) {
        const removeNode = (list) => {
            // Step 1: Current level se uda do
            const filteredList = list.filter(item => item.id !== targetId);

            // Step 2: Bache hue items ke replies mein recursion chala do
            return filteredList.map(item => {
                if (item.replies && item.replies.length > 0) {
                    return { ...item, replies: removeNode(item.replies) };
                }
                return item;
            });
        };
        setTweets((prev) => removeNode(prev));
    }

    return (
        <div className={Styles.appContainer}>
            <h1 className={Styles.heading}>Twitter Clone</h1>

            <div className={Styles.composeBox}>
                <input
                    type="text"
                    placeholder="What's happening?"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                />
                <button onClick={addTweet}>Tweet</button>
            </div>

            <List
                tweets={tweets}
                level={0}
                replyId={replyId}
                replyInput={replyInput}
                setReplyInput={setReplyInput}
                openReplyBox={openReplyBox}
                submitReply={submitReply}
                editId={editId}
                editInput={editInput}
                setEditInput={setEditInput}
                openEditBox={openEditBox}
                submitEdit={submitEdit}
                deleteTweetNode={deleteTweetNode}
            />
        </div>
    );
}

export default NestedTwitterClone;