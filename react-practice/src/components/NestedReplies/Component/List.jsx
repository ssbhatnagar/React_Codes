import React, { useState } from 'react'; // <-- Ye line missing thi

function List({
    tweets, addReply, replyId, replyInput, setReplyInput, postReply, deleteTweet,
    editingId, setEditingId, editingInput, setEditingInput, saveEdit
}) {
    // Ye object track karega ki konsi ID ka reply khula hai aur kiska band
    // Format: { "1": true, "1-1": false }
    const [expanded, setExpanded] = useState({});

    // Toggle function jo specific tweet ID ke status ko ulta (true/false) kar dega
    const toggleShowReplies = (id) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    // YAHI WALA CHECK TERA .MAP ERROR FIX KAREGA
    if (!tweets || !Array.isArray(tweets) || tweets.length === 0) {
        return null; 
    }

    return (
        <div>
            <ul style={{ listStyleType: "none", paddingLeft: "20px", borderLeft: "1px solid #ccc" }}>
                {tweets.map((tweet) => (
                    <li key={tweet.id} style={{ marginBottom: "15px", marginTop: "10px" }}>

                        {/* CONDITIONAL RENDERING: Agar Edit mode on hai toh Input dikhao, nahi toh Text dikhao */}
                        {editingId === tweet.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editingInput}
                                    onChange={(e) => setEditingInput(e.target.value)}
                                />
                                <button onClick={() => saveEdit(tweet.id)} style={{ marginLeft: "5px" }}>Save</button>
                                <button onClick={() => setEditingId(null)} style={{ marginLeft: "5px" }}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <span><strong>Tweet: </strong>{tweet.content}</span>
                                <br />

                                <button onClick={() => deleteTweet(tweet.id)}>Delete</button>

                                {/* Edit Button: Click karne par state set hogi aur purana text input me aayega */}
                                <button onClick={() => {
                                    setEditingId(tweet.id);
                                    setEditingInput(tweet.content);
                                }} style={{ marginLeft: "5px" }}>Edit</button>

                                {tweet.id === replyId ? (
                                    <button onClick={() => postReply(tweet.id)} style={{ marginLeft: "5px" }}>Post</button>
                                ) : (
                                    <button onClick={() => addReply(tweet.id)} style={{ marginLeft: "5px" }}>Add Reply</button>
                                )}
                            </div>
                        )}

                        {/* Reply Input Box */}
                        {replyId === tweet.id && (
                            <div style={{ marginTop: "5px" }}>
                                <input
                                    type="text"
                                    placeholder='Enter reply'
                                    value={replyInput}
                                    onChange={(e) => setReplyInput(e.target.value)}
                                />
                                {/* Cancel reply button taaki input band ho sake */}
                                <button onClick={() => addReply(null)} style={{ marginLeft: "5px" }}>Cancel</button>
                            </div>
                        )}

                        {/* Button sirf tab dikhega jab iske andar replies honge */}
                        {tweet.replies && tweet.replies.length > 0 && (
                            <button onClick={() => toggleShowReplies(tweet.id)} style={{ marginTop: "5px", fontSize: "12px" }}>
                                {expanded[tweet.id] ? "Hide replies ▲" : "Show replies ▼"}
                            </button>
                        )}

                        {/* Recursive call mein saare naye props aage bhej diye */}
                        {expanded[tweet.id] && tweet.replies && tweet.replies.length > 0 && (
                            <List
                                tweets={tweet.replies}
                                addReply={addReply}
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
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default List;