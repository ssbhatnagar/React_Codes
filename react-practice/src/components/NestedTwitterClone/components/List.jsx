

import Styles from '../css/NestedTwitterClone.module.css';

// ==========================================
// 1. RECURSIVE LIST COMPONENT (READ)
// ==========================================
function List({
    tweets, level = 0,
    // Handlers for Reply
    replyId, replyInput, setReplyInput, openReplyBox, submitReply,
    // Handlers for Edit
    editId, editInput, setEditInput, openEditBox, submitEdit,
    // Handler for Delete
    deleteTweetNode
}) {
    return (
        <ul className={Styles.listContainer}>
            {tweets?.map((tweet) => (
                <li
                    className={`${Styles.tweetCard} ${level === 0 ? Styles.threadBlock : ''}`}
                    key={tweet.id}
                >
                    <div className={Styles.tweetHeader}>

                        {/* ---------------- EDIT MODE ---------------- */}
                        {editId === tweet.id ? (
                            <div className={Styles.replyInputBox} style={{ flex: 1, margin: 0 }}>
                                <input
                                    type="text"
                                    value={editInput}
                                    onChange={(e) => setEditInput(e.target.value)}
                                    autoFocus
                                />
                                <button onClick={() => submitEdit(tweet.id)}>Save</button>
                                <button style={{ backgroundColor: "gray" }} onClick={() => openEditBox(null, "")}>Cancel</button>
                            </div>
                        ) : (
                            /* ---------------- NORMAL READ MODE ---------------- */
                            <span className={Styles.tweetContent}>{tweet.content}</span>
                        )}

                        {/* ---------------- ACTION BUTTONS ---------------- */}
                        {editId !== tweet.id && (
                            <div style={{ display: 'flex', gap: '5px' }}>
                                <button className={Styles.replyButton} onClick={() => openEditBox(tweet.id, tweet.content)}>Edit</button>
                                <button className={Styles.replyButton} style={{ color: 'red' }} onClick={() => deleteTweetNode(tweet.id)}>Delete</button>
                                {replyId !== tweet.id && (
                                    <button className={Styles.replyButton} onClick={() => openReplyBox(tweet.id)}>Reply</button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* ---------------- REPLY INPUT BOX ---------------- */}
                    {replyId === tweet.id && (
                        <div className={Styles.replyInputBox}>
                            <input
                                type="text"
                                placeholder='Enter reply here ...'
                                value={replyInput}
                                onChange={(e) => setReplyInput(e.target.value)}
                                autoFocus
                            />
                            <button onClick={() => submitReply(tweet.id)}>Post</button>
                            <button style={{ backgroundColor: "gray" }} onClick={() => openReplyBox(null)}>Cancel</button>
                        </div>
                    )}

                    {/* ---------------- RECURSION ENGINE ---------------- */}
                    {tweet.replies && tweet.replies.length > 0 && (
                        <List
                            tweets={tweet.replies}
                            level={level + 1}
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
                    )}
                </li>
            ))}
        </ul>
    );
}

export default List