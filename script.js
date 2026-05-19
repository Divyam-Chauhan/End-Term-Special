const subjects = {
  "web-dev": {
    label: "Web Dev",
    badge: "WD",
    accent: "#006d77",
    description:
      "React hooks, routing, authentication, fetch, forms, exports, storage, and component patterns written for final exam answers.",
  },
  dbms: {
    label: "DBMS",
    badge: "DB",
    accent: "#254f9a",
    description:
      "Database design, normalization, SQL, transactions, indexing, and concurrency answers with clean logical flow.",
  },
  "dsa-cpp": {
    label: "DSA C++",
    badge: "DS",
    accent: "#bd4635",
    description:
      "Foundational and applied C++ DSA questions covering arrays, recursion, sorting, searching, linked lists, trees, graphs, STL, and complexity.",
  },
};

const questions = [
  {
    subject: "web-dev",
    title: "Explain the role of JWT Tokens in a React application. How are they used to authenticate a user and communicate with the server? Provide an example of how the token is sent in an HTTP request.",
    tags: ["React", "Authentication", "JWT"],
    answer: `
      <p>JWT means JSON Web Token. In a React application, it is commonly used to remember that a user has logged in successfully. After the user submits valid login details, the server creates a token and sends it back to the React app.</p>
      <p>The React app stores the token, usually in a secure cookie or sometimes in local storage depending on the project. For protected API calls, the app sends this token with the request. The server checks the token before returning private data.</p>
      <p>The usual flow is: user logs in, server returns JWT, React stores it, React sends it with future requests, and the server verifies it. If the token is invalid or expired, the user is treated as unauthenticated.</p>
      <pre><code>const token = localStorage.getItem("jwt_token");

fetch("https://api.example.com/profile", {
  method: "GET",
  headers: {
    Authorization: "Bearer " + token
  }
});</code></pre>
      <p>Here, the token is sent in the <code>Authorization</code> header. The word <code>Bearer</code> tells the server that the value is an access token.</p>
      <p>JWT helps React communicate with protected server routes without sending username and password again and again. For better security, tokens should expire, logout should remove the token, and sensitive tokens should be handled carefully.</p>
    `,
  },
  {
    subject: "web-dev",
    title: "How would you fetch data from an API and display it in a React component, showing a loading state while the request is in progress?",
    tags: ["React", "Fetch", "Hooks"],
    answer: `
      <p>In React, API data is usually fetched inside <code>useEffect</code> because the request should run after the component renders. State is used to store the data, loading status, and possible error message.</p>
      <pre><code>import { useEffect, useState } from "react";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() =&gt; {
    async function getUsers() {
      try {
        const response = await fetch("https://api.example.com/users");
        if (!response.ok) throw new Error("Request failed");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError("Unable to load users");
      } finally {
        setIsLoading(false);
      }
    }
    getUsers();
  }, []);

  if (isLoading) return &lt;p&gt;Loading...&lt;/p&gt;;
  if (error) return &lt;p&gt;{error}&lt;/p&gt;;

  return &lt;ul&gt;{users.map(user =&gt; &lt;li key={user.id}&gt;{user.name}&lt;/li&gt;)}&lt;/ul&gt;;
}</code></pre>
      <p>The empty dependency array makes the request run once when the component mounts. The loading state gives feedback while the request is in progress. The error state handles failure. The final UI displays the fetched data using <code>map()</code>.</p>
