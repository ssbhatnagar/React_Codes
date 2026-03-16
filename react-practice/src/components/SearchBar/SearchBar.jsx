import React, { useEffect, useState } from "react";
import '../SearchBar/SearchBar.css';

function SearchBar() {

    const [searchResults, setSearchResults] = useState([]);
    const [userQuery, setUserQuery] = useState("");

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchQueryResults = async () => {

            if (userQuery.trim() === "") {
                setSearchResults([]);
                return;
            }

            setLoading(true);

            try {
                const rawData = await fetch(`https://www.google.com/complete/search?client=firefox&q=${userQuery}`);
                if (!rawData.ok) {
                    throw new Error("Error in fetching api")
                }
                const data = await rawData.json();
                setSearchResults(data);
            } catch (error) {
                setError("failed to fetch api: " + error.message);
                console.log("Error in fetching api")
            } finally {
                setLoading(false);
            }
        }
        const timerId = setTimeout(() => {
            fetchQueryResults();
        }, 300)

        return () => {
            clearTimeout(timerId)
        }

    }, [userQuery])

    return (
        <div className="parent-div">
            <h1 className="header">Search Bar</h1>
            <input
                className="input-box"
                type="text"
                placeholder="Enter the query ...."
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
            />
            {console.log("Here is the output", searchResults)}
            {searchResults.length !== 0 && (
                <div className="search-result">
                    <ul className="list">
                        {searchResults[1]?.map((result, idx) =>
                            <li className="list-item" key={idx}>
                                <span className="list-item-text">{result}</span>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    )

}

export default SearchBar;