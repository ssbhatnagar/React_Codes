import React, { useEffect, useState } from "react";
import SearchResults from "./SearchResults";

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
        <>
        <SearchResults
        searchResults = {searchResults}
        userQuery = {userQuery}
        setUserQuery = {setUserQuery}
        />
        </>
    )

}

export default SearchBar;