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
    `,
  },
  {
    subject: "web-dev",
    title: "Differentiate between the <Navigate> component and the navigate() function in React Router. Provide an example scenario for using each.",
    tags: ["React", "Router", "Navigation"],
    answer: `
      <p><code>&lt;Navigate&gt;</code> and <code>navigate()</code> are both used for routing in React Router, but they are used in different situations.</p>
      <p><code>&lt;Navigate&gt;</code> is a component. It is returned from JSX when navigation should happen during rendering. It is useful for protected routes where the UI decides whether to show a page or redirect the user.</p>
      <pre><code>import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return &lt;Navigate to="/login" replace /&gt;;
  }
  return children;
}</code></pre>
      <p><code>navigate()</code> is a function returned by the <code>useNavigate</code> hook. It is used inside event handlers or after some action, such as login, form submission, or button click.</p>
      <pre><code>import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  function handleLogin() {
    // after successful login
    navigate("/dashboard");
  }

  return &lt;button onClick={handleLogin}&gt;Login&lt;/button&gt;;
}</code></pre>
      <p>Use <code>&lt;Navigate&gt;</code> when redirecting as part of rendering logic. Use <code>navigate()</code> when redirecting after an action. This distinction keeps route protection and user-triggered navigation clear.</p>
    `,
  },
  {
    subject: "web-dev",
    title: "Explain how the useEffect dependency array controls when an effect runs. Describe the behavior for an empty array, no array, and a specific dependency.",
    tags: ["React", "Hooks", "useEffect"],
    answer: `
      <p><code>useEffect</code> is used to run side effects in a React functional component. Side effects include API calls, timers, subscriptions, updating the document title, or storing data in local storage. The dependency array controls when the effect runs.</p>
      <p>If there is no dependency array, the effect runs after every render. This is useful only when the effect truly depends on every render, but it can easily cause repeated work.</p>
      <pre><code>useEffect(() =&gt; {
  console.log("Runs after every render");
});</code></pre>
      <p>If the dependency array is empty, the effect runs only once after the first render. This is commonly used for initial API calls.</p>
      <pre><code>useEffect(() =&gt; {
  fetchUsers();
}, []);</code></pre>
      <p>If the array contains a dependency, the effect runs after the first render and again whenever that dependency changes.</p>
      <pre><code>useEffect(() =&gt; {
  document.title = "Count: " + count;
}, [count]);</code></pre>
      <p>React uses the dependency array to avoid unnecessary effect execution. If a value used inside the effect can change, it should usually be added to the array. This keeps the effect correct and prevents stale values or repeated calls.</p>
    `,
  },
  {
    subject: "web-dev",
    title: "Explain the purpose of the cleanup function in useEffect. How would you use it to clear an interval when a component unmounts? Provide a code snippet.",
    tags: ["React", "Hooks", "Cleanup"],
    answer: `
      <p>The cleanup function in <code>useEffect</code> is used to remove side effects that should not continue after a component updates or unmounts. It helps prevent memory leaks, repeated timers, duplicate event listeners, and unwanted background work.</p>
      <p>In <code>useEffect</code>, the cleanup function is returned from the effect callback. React runs it before the effect runs again and when the component is removed from the screen.</p>
      <p>A common use case is clearing an interval:</p>
      <pre><code>import { useEffect, useState } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() =&gt; {
    const intervalId = setInterval(() =&gt; {
      setSeconds(prevSeconds =&gt; prevSeconds + 1);
    }, 1000);

    return () =&gt; {
      clearInterval(intervalId);
    };
  }, []);

  return &lt;p&gt;Timer: {seconds}&lt;/p&gt;;
}</code></pre>
      <p>Here, <code>setInterval</code> starts a timer when the component mounts. The returned cleanup function calls <code>clearInterval</code> when the component unmounts. Without cleanup, the interval may keep running even after the component is gone.</p>
