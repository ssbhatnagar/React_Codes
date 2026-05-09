import { useState } from "react";


const booksData = [
    {
        id: "1",
        bookTitle: "xyz",
        authorName: "abc",
        isComplete: false
    },
    {
        id: "2",
        bookTitle: "two states",
        authorName: "Chetan Bhagat",
        isComplete: true
    },
    {
        id: "3",
        bookTitle: "Shiva Triology",
        authorName: "Amish",
        isComplete: false
    }
]


function BookTracker() {

    const [booksList, setBookList] = useState(booksData);
    const [bookTitleInput, setBookTitleInput] = useState("");
    const [bookAuthorInput, setBookAuthorInput] = useState("");

    function addNewBook(){
        if((bookAuthorInput.trim() && bookTitleInput.trim()) !== "") {
        const newBook = {
            id: Date.now().toString(),
            bookTitle: bookTitleInput,
            authorName: bookAuthorInput,
            isComplete: false
        }
        setBookList((prev) => [...prev, newBook]);
        setBookAuthorInput("");
        setBookTitleInput("")
    }
    else{
        window.alert("book Title or Author Cannot be Empty")
    }
    }

    function deleteBook(id){
        setBookList((prev) =>
            prev.filter((book) => book.id !== id)
        )
    }

    function markAsComplete(id){
        setBookList((prev) =>
            prev.map((book) => book.id === id ? {...book, isComplete: !book.isComplete} : book  )
        )
    }

    return(
        <div>
            <h1>The Mini Reading List</h1>
            <div>
                <input
                type="text"
                placeholder="Enter Book Title"
                value={bookTitleInput}
                onChange={(e) => setBookTitleInput(e.target.value)}
                />
                <input
                type="text"
                placeholder="Enter Author name"
                value={bookAuthorInput}
                onChange={(e) => setBookAuthorInput(e.target.value)}
                />
                <button onClick={addNewBook}>Add Book</button>
                <div>
                    <ul>
                        {booksList.map((book) => 
                        <li key={book.id}>
                            <span style={{textDecoration: book.isComplete ? 'line-through' : 'none' }} >
                            {book.bookTitle} - {book.authorName}
                            </span>
                            {" "}
                            <button onClick={() => deleteBook(book.id)}>Delete</button>
                            <input
                            type="checkbox"
                            checked={book.isComplete}
                            onChange={() => markAsComplete(book.id)}
                            />
                        </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
    
}

export default BookTracker;