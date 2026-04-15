import { useState, useEffect } from "react";


export default function UserSearchSuggestion() {
    const [searchResults, setSearchResults] = useState([]);
    const [userQuery, setUserQuery] = useState("");
    const [showSearchDropdown, setShowSearchDropDown] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Default false

    useEffect(() => {
        const fetchResults = async () => {
            try {
                if (userQuery.trim() === "") {
                    setSearchResults([]);
                    setShowSearchDropDown(false);
                    return;
                }
                setLoading(true); // Fetch hone se pehle loading ON
                
                const rawResults = await fetch(
                    `https://dummyjson.com/users/search?q=${userQuery}`
                );
                
                if (!rawResults.ok) {
                    throw new Error("Unable to fetch data");
                }
                
                const results = await rawResults.json();
                setSearchResults(results.users);
            } catch (error) {
                console.log("Unable to fetch data");
                setError("Failed to fetch data");
            } finally {
                setLoading(false); // FIX: Fetch hone ke baad loading OFF
            }
        };

        // Debounce Logic: 300ms tak user ka wait karega
        const timerId = setTimeout(() => {
            fetchResults();
        }, 300);

        // Cleanup function for debounce
        return () => {
            clearTimeout(timerId);
        };
    }, [userQuery]);

    function handleClick(result) {
        setUserQuery(result.firstName + " " + result.lastName);
        setSearchResults([]);
        setShowSearchDropDown(false);
    }

    if (error) return <div>Error in fetching data</div>;

    return (
        <div>
            <h1>Search Bar</h1>
            <input
                type="text"
                placeholder="search users here ..."
                value={userQuery}
                onChange={(e) => {
                    setUserQuery(e.target.value);
                    setShowSearchDropDown(true);
                }}
            />

            {/* Loading Indicator UI */}
            {loading && <div style={{ color: "blue", marginTop: "10px" }}>Loading...</div>}

            {/* Condition 1: Agar list mein items hain toh Dropdown dikhao */}
            {/* Added !loading to prevent showing list while fetching new data */}
            {showSearchDropdown && searchResults.length > 0 && !loading && (
                <div>
                    <ul>
                        {searchResults.map((result) => (
                            <li
                                style={{ cursor: "pointer" }}
                                onClick={() => handleClick(result)}
                                key={result.id}
                            >
                                {result.firstName} {result.lastName}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Condition 2: Agar list khali hai aur user ne kuch type kiya hai */}
            {/* Added !loading to prevent "No users found" from flashing while API is still loading */}
            {showSearchDropdown && searchResults.length === 0 && userQuery.trim() !== "" && !loading && (
                <div style={{ padding: "10px", color: "red" }}>
                    No users found
                </div>
            )}
        </div>
    );
}