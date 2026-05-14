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
      /&gt;
      &lt;input
        type="password"
        value={password}
        onChange={event =&gt; setPassword(event.target.value)}
        placeholder="Password"
      /&gt;
      &lt;button type="submit"&gt;Submit&lt;/button&gt;
    &lt;/form&gt;
  );
}</code></pre>
      <p>Here, the input values always come from React state. When the user types, the state changes and the UI updates. On submit, <code>event.preventDefault()</code> stops page refresh.</p>
      <p>Controlled components are useful because validation, clearing fields, disabling buttons, and sending data become easier to manage from React state.</p>
    `,
  },
  {
    subject: "web-dev",
    title: "What is an uncontrolled input in React? How does it differ from a controlled input? Provide an example.",
    tags: ["React", "Forms", "Uncontrolled Components"],
    answer: `
      <p>An uncontrolled input is a form input whose value is managed by the browser DOM instead of React state. React does not update the value on every key press. When the value is needed, it is usually read using a ref.</p>
      <p>A controlled input is different because its value is stored in React state and updated using <code>onChange</code>. This gives React full control over the input.</p>
      <pre><code>import { useRef } from "react";

function UncontrolledForm() {
  const nameRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(nameRef.current.value);
  }

  return (
    &lt;form onSubmit={handleSubmit}&gt;
      &lt;input ref={nameRef} type="text" /&gt;
      &lt;button type="submit"&gt;Submit&lt;/button&gt;
    &lt;/form&gt;
  );
}</code></pre>
      <p>In this example, React reads the input value only when the form is submitted. The browser handles the value while the user types.</p>
      <p>Controlled inputs are better when validation, live search, conditional UI, or instant state updates are needed. Uncontrolled inputs are simpler for small forms, file inputs, or cases where the value is needed only at submit time.</p>
      <p>So, controlled inputs use React state, while uncontrolled inputs depend mainly on the DOM and refs.</p>
    `,
  },
  {
    subject: "web-dev",
    title: "What is Reconciliation in React? Why does React only update certain parts of the DOM instead of re-rendering the entire UI?",
    tags: ["React", "Reconciliation", "DOM"],
    answer: `
      <p>Reconciliation is the process React uses to compare the previous UI with the new UI after state or props change. React creates a new virtual representation of the UI and compares it with the old one to find what actually changed.</p>
      <p>React does not directly rebuild the whole browser DOM for every change because DOM operations can be expensive. Instead, it updates only the necessary parts. This keeps applications faster and smoother.</p>
      <p>For example, if a counter value changes from 5 to 6, React does not recreate the entire page. It updates only the text where the counter is shown.</p>
      <p>Keys are important during reconciliation when rendering lists. They help React identify which list items were added, removed, or changed.</p>
      <pre><code>{users.map(user =&gt; (
  &lt;li key={user.id}&gt;{user.name}&lt;/li&gt;
))}</code></pre>
      <p>Without proper keys, React may not track list items correctly, which can cause inefficient updates or UI mistakes.</p>
      <p>Reconciliation is important because it balances correctness and performance. React still re-renders components logically, but it applies only the required changes to the actual DOM. This is one reason React works well for interactive user interfaces.</p>
    `,
  },
  {
    subject: "web-dev",
    title: "What is the Context API in React and when should you use it?",
    tags: ["React", "Context", "State"],
    answer: `
      <p>The Context API in React is used to share data with many components without passing props manually through every level. It is helpful when several components need the same value, such as logged-in user details, theme, language, or authentication status.</p>
      <p>Normally, data flows from parent to child using props. But if a deeply nested component needs the data, props may have to pass through many intermediate components that do not use it. This problem is called prop drilling. Context helps reduce that.</p>
      <pre><code>const AuthContext = React.createContext();

function App() {
  const user = { name: "Divya" };

  return (
    &lt;AuthContext.Provider value={user}&gt;
      &lt;Dashboard /&gt;
    &lt;/AuthContext.Provider&gt;
  );
}</code></pre>
      <p>A child component can read the value using <code>useContext</code>:</p>
      <pre><code>const user = useContext(AuthContext);</code></pre>
      <p>Context should be used for data that is needed by many components at different levels. It should not be used for every small piece of state because unnecessary context updates can re-render many components.</p>
      <p>In short, Context API is best for shared application-level data. It makes code cleaner when passing props through many layers becomes repetitive.</p>
    `,
  },
  {
    subject: "web-dev",
    title: "Write a React example to display a list of users using .map() and assign keys properly.",
    tags: ["React", "Lists", "Keys"],
    answer: `
      <p>In React, lists are commonly displayed using the JavaScript <code>map()</code> method. It converts each item in an array into a JSX element. Each element in a list should have a unique <code>key</code> prop so React can track it correctly during updates.</p>
      <pre><code>function UsersList() {
  const users = [
    { id: 1, name: "Asha", role: "Admin" },
    { id: 2, name: "Ravi", role: "Editor" },
    { id: 3, name: "Neha", role: "Viewer" }
  ];

  return (
    &lt;ul&gt;
      {users.map(user =&gt; (
        &lt;li key={user.id}&gt;
          {user.name} - {user.role}
        &lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}</code></pre>
      <p>Here, <code>users.map()</code> loops through the array and returns one <code>&lt;li&gt;</code> for each user. The <code>key</code> is set to <code>user.id</code>, which is stable and unique.</p>
      <p>Using the array index as a key should be avoided when list order can change, because it may confuse React during insertions or deletions. A database ID or unique value is better.</p>
      <p>Keys do not appear on the page. They are used internally by React to update lists correctly and efficiently.</p>
    `,
  },
  {
    subject: "web-dev",
    title: "Describe the lifecycle of a React functional component using hooks. Explain what happens at mount, update, and unmount phases.",
    tags: ["React", "Hooks", "Lifecycle"],
    answer: `
      <p>A React functional component goes through three main lifecycle phases: mount, update, and unmount. Hooks, especially <code>useEffect</code>, are used to handle work during these phases.</p>
      <p>The mount phase happens when the component appears on the screen for the first time. This is where initial API calls, timers, or subscriptions can be started.</p>
      <pre><code>useEffect(() =&gt; {
  fetchData();
}, []);</code></pre>
      <p>The empty dependency array means this effect runs once after the first render.</p>
      <p>The update phase happens when props or state change and the component renders again. An effect with dependencies runs when those dependency values change.</p>
      <pre><code>useEffect(() =&gt; {
  document.title = "Count: " + count;
}, [count]);</code></pre>
      <p>This runs when <code>count</code> changes.</p>
      <p>The unmount phase happens when the component is removed from the UI. Cleanup is done by returning a function from <code>useEffect</code>.</p>
      <pre><code>useEffect(() =&gt; {
  const id = setInterval(tick, 1000);
  return () =&gt; clearInterval(id);
}, []);</code></pre>
      <p>So, hooks let functional components handle lifecycle behavior clearly: start work on mount, react to changes on update, and clean up on unmount.</p>
    `,
  },
  {
    subject: "web-dev",
    title: "Demonstrate how to handle both successful and error cases when using fetch() with promises.",
    tags: ["React", "Fetch", "Promises"],
    answer: `
      <p>The <code>fetch()</code> function returns a promise. To handle success and error cases, we can use <code>.then()</code> for successful steps and <code>.catch()</code> for errors. It is also important to check <code>response.ok</code> because fetch does not automatically reject for HTTP error status codes like 404 or 500.</p>
      <pre><code>fetch("https://api.example.com/users")
  .then(response =&gt; {
    if (!response.ok) {
      throw new Error("Request failed");
    }
    return response.json();
  })
  .then(data =&gt; {
    console.log("Users:", data);
  })
  .catch(error =&gt; {
    console.error("Error:", error.message);
  });</code></pre>
      <p>In this example, the first <code>.then()</code> receives the response. If the response is not okay, an error is thrown. If the response is valid, it is converted to JSON. The next <code>.then()</code> receives the final data.</p>
      <p>The <code>.catch()</code> block handles network errors and any errors thrown in the previous promise chain. In a React component, success can update data state, while failure can update error state.</p>
      <p>This structure gives clear handling for both cases: display data when the request succeeds and show an error message when the request fails.</p>
    `,
  },
  {
    subject: "web-dev",
    title: "Explain how to implement a protected route in React Router that redirects unauthenticated users to the login page.",
    tags: ["React", "Router", "Authentication"],
    answer: `
      <p>A protected route is a route that only authenticated users can access. In React Router, this is commonly done by checking whether the user has a valid login state or token. If the user is not authenticated, they are redirected to the login page.</p>
      <pre><code>import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return &lt;Navigate to="/login" replace /&gt;;
  }
  return children;
}</code></pre>
      <p>The protected route can be used while defining routes:</p>
      <pre><code>&lt;Route
  path="/dashboard"
  element={
    &lt;ProtectedRoute isLoggedIn={isLoggedIn}&gt;
      &lt;Dashboard /&gt;
    &lt;/ProtectedRoute&gt;
  }
/&gt;</code></pre>
      <p>If <code>isLoggedIn</code> is false, the user is sent to <code>/login</code>. If it is true, the dashboard is shown. The <code>replace</code> prop prevents the protected page from staying in browser history before login.</p>
      <p>In real applications, <code>isLoggedIn</code> may be based on a JWT token, cookie, or authentication context. The app should also handle token expiry and logout.</p>
      <p>Protected routes improve security on the client side and improve user flow, but the server must still verify authentication before sending private data.</p>
    `,
  },
  {
    subject: "web-dev",
    title: "Evaluate the advantages and disadvantages of using default exports versus named exports. Provide examples and recommend when to use each approach.",
    tags: ["JavaScript", "Exports", "Modules"],
    answer: `
      <p>JavaScript modules can export values using default exports or named exports. Both help split code into reusable files, but they differ in how values are imported.</p>
      <p>A default export is the main export from a file. It can be imported with any name.</p>
      <pre><code>export default function Button() {
  return &lt;button&gt;Save&lt;/button&gt;;
}

import PrimaryButton from "./Button";</code></pre>
      <p>The advantage is simplicity when a file mainly contains one component or function. The disadvantage is that different files may import it with different names, which can reduce consistency.</p>
      <p>Named exports export values by their exact names.</p>
      <pre><code>export function formatDate(date) {
  return date.toDateString();
}

export function formatPrice(price) {
  return "$" + price;
}

import { formatDate, formatPrice } from "./formatters";</code></pre>
      <p>Named exports are clearer when a file contains multiple functions, constants, or components. They also make auto-import and refactoring easier because the imported name is fixed.</p>
      <p>Use default exports for one main component per file. Use named exports for utility files or when exporting multiple values. The best recommendation is to be consistent within the project.</p>
    `,
  },
  {
    subject: "web-dev",
    title: "How does React handle events differently from standard HTML events? Explain with an example.",
    tags: ["React", "Events", "JSX"],
    answer: `
      <p>React handles events using JSX event props, which are written in camelCase. In normal HTML, event attributes are written in lowercase strings, such as <code>onclick</code>. In React, they are written as <code>onClick</code> and receive a function reference.</p>
      <p>Standard HTML example:</p>
      <pre><code>&lt;button onclick="saveData()"&gt;Save&lt;/button&gt;</code></pre>
      <p>React example:</p>
      <pre><code>function SaveButton() {
  function handleClick() {
    console.log("Saved");
  }

  return &lt;button onClick={handleClick}&gt;Save&lt;/button&gt;;
}</code></pre>
      <p>In React, we pass the function itself, not a string. This keeps event logic inside JavaScript and makes it easier to use state and props.</p>
      <p>React also uses a cross-browser event system, so event behavior is more consistent across browsers. Event handler names follow JSX rules, such as <code>onChange</code>, <code>onSubmit</code>, and <code>onMouseEnter</code>.</p>
      <p>For form submission, React commonly uses <code>event.preventDefault()</code> to stop the browser from reloading the page.</p>
      <pre><code>function handleSubmit(event) {
  event.preventDefault();
}</code></pre>
      <p>The key differences are naming, passing functions instead of strings, and handling events as part of component logic.</p>
    `,
  },
