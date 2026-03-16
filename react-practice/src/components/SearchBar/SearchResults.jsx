import '../SearchBar/SearchResults.css';

function SearchResults({setUserQuery, userQuery, searchResults }){
return(
    <div className="parent-div">
            <h1 className="header">Search Bar</h1>
            <input
                className="input-box"
                type="text"
                placeholder="Enter the query ...."
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
            />
            {/* {console.log("Here is the output", searchResults)} */}
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
export default SearchResults;