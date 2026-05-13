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
      <p>So, cleanup keeps components safe and predictable by stopping side effects that are no longer needed.</p>
    `,
  },
  {
    subject: "web-dev",
    title: "How do you pass data from a parent component to a child component in React? Explain with an example.",
    tags: ["React", "Components", "Props"],
    answer: `
      <p>In React, data is passed from a parent component to a child component using props. Props are values given to a component, similar to arguments passed to a function. They help make components reusable and dynamic.</p>
      <p>The parent component sends data by writing attributes on the child component. The child component receives those values through its props parameter.</p>
      <pre><code>function Parent() {
  const studentName = "Ananya";

  return &lt;StudentCard name={studentName} course="BCA" /&gt;;
}

function StudentCard(props) {
  return (
    &lt;div&gt;
      &lt;h2&gt;{props.name}&lt;/h2&gt;
      &lt;p&gt;Course: {props.course}&lt;/p&gt;
    &lt;/div&gt;
  );
}</code></pre>
      <p>In this example, <code>Parent</code> passes <code>name</code> and <code>course</code> to <code>StudentCard</code>. The child displays the received values.</p>
      <p>Props are read-only. A child component should not directly change the props it receives. If the child needs to update parent data, the parent can pass a function as a prop, and the child can call that function.</p>
      <p>This parent-to-child flow makes React applications easier to understand. Data is controlled by the parent, while the child focuses on displaying or using that data.</p>
    `,
  },
  {
    subject: "web-dev",
    title: "What is batch updating in React? Analyze what happens when multiple setState calls are made in an event handler.",
    tags: ["React", "State", "Batching"],
    answer: `
      <p>Batch updating in React means React groups multiple state updates together and performs one re-render instead of re-rendering after every single update. This improves performance and keeps the UI update process efficient.</p>
      <p>When multiple <code>setState</code> or state setter calls are made inside the same event handler, React usually batches them. The component re-renders once after the event handler finishes.</p>
      <pre><code>function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  }

  return &lt;button onClick={handleClick}&gt;{count}&lt;/button&gt;;
}</code></pre>
      <p>In this example, all three updates use the same old value of <code>count</code>. So the count may increase by only 1, not 3.</p>
      <p>To correctly update based on the previous state, use the functional form:</p>
      <pre><code>setCount(prev =&gt; prev + 1);
setCount(prev =&gt; prev + 1);
setCount(prev =&gt; prev + 1);</code></pre>
      <p>Now React applies each update in order, so the count increases by 3. The key point is that batching reduces unnecessary renders, but previous-state updates should use the functional setter form.</p>
    `,
  },
  {
    subject: "web-dev",
    title: "How do you handle form submission in React using controlled components? Provide a complete example.",
    tags: ["React", "Forms", "Controlled Components"],
    answer: `
      <p>A controlled component is a form element whose value is controlled by React state. The input displays the state value, and every change updates the state using an <code>onChange</code> handler.</p>
      <p>For form submission, React usually stores input values in state, prevents the browser's default submit reload, validates or uses the data, and then sends it to an API or displays it.</p>
      <pre><code>import { useState } from "react";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log({ username, password });
  }

  return (
    &lt;form onSubmit={handleSubmit}&gt;
      &lt;input
        type="text"
        value={username}
        onChange={event =&gt; setUsername(event.target.value)}
        placeholder="Username"
