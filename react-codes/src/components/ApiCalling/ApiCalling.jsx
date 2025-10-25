import React, { useState } from "react";

function ApiCalling() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // yaha par default false hai kyuki ap tabhi chalega jab user button par click karega but yehi agar useEffect hota to ye default value true hoti kyuki useEffect khud se chalta hai jaise hi component mount hota hai, jab component mount hua to API call hoga aur vo thoda time lega us gap mai true hoga to likha ayega ki lodaing. 
  // but is scenario mai component load ho jayega uskje baad jab user button par click karega tab API call hoga it means yaha default mai false dena hai kyuki yaha automatically component ke mount hote hi api call nahi hoga, instead user ke cutton click karne par hoga.
  // ab agar fetchData ya fetchPost ka logic dekho to vo sabse pehele step mai hi setLoading ko tru kar deta hai kyuki abhi user ne click nahi kiya aur api fail hua to loading aana chaiye.
  const [posts, setPosts] = useState([]);

  // Fetch all users
  const fetchData = async () => {
    setLoading(true);
    try {
      const rawData = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!rawData.ok) {
        throw new Error("Error in fetching API");
      }
      const data = await rawData.json();
      setUsers(data);
    } catch (error) {
      console.log("API failed:", error);
      setError("Failed to call API");
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts for specific user
  const fetchPost = async (id) => {
    setLoading(true);
    try {
      const rawData = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${id}`
      );
      if (!rawData.ok) {
        throw new Error("Error in fetching API");
      }
      const data = await rawData.json();
      setPosts(data);
    } catch (error) {
      console.log("API failed:", error);
      setError("Failed to call API");
    } finally {
      setLoading(false);
    }
  };

  const handleApiCall = () => {
    fetchData();
  };

  const viewPost = (id) => {
    fetchPost(id);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <button onClick={handleApiCall}>Fetch Users</button>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} — {user.id}{" "}
            <button onClick={() => viewPost(user.id)}>View Posts</button>
          </li>
        ))}
      </ul>

      {posts.length > 0 && (
        <div>
          <h3>Posts:</h3>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <strong>{post.title}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ApiCalling;
