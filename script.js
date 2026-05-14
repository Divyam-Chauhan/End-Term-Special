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
  {
    subject: "web-dev",
    title: "Assess the impact of incorrect export syntax on your code. Explain common errors and how to fix them with examples.",
    tags: ["JavaScript", "Exports", "Errors"],
    answer: `
      <p>Incorrect export syntax can stop a React or JavaScript application from compiling. It can also cause import errors where a value is undefined or not found. Since components and utility functions are often shared through modules, export mistakes can break many files.</p>
      <p>One common error is mixing default and named import syntax.</p>
      <pre><code>// Button.js
export default function Button() {}

// Correct
import Button from "./Button";

// Incorrect
import { Button } from "./Button";</code></pre>
      <p>Another common error is importing a named export without braces.</p>
      <pre><code>// utils.js
export function add(a, b) {
  return a + b;
}

// Correct
import { add } from "./utils";

// Incorrect
import add from "./utils";</code></pre>
      <p>A third mistake is trying to export a variable incorrectly while declaring it. This is correct:</p>
      <pre><code>export const API_URL = "https://api.example.com";</code></pre>
      <p>Incorrect export syntax leads to build errors, broken imports, and wasted debugging time. The fix is to match export and import styles carefully: default exports use no braces during import, while named exports use braces.</p>
    `,
  },
  {
    subject: "web-dev",
    title: "Analyze the differences between exporting a function while defining it versus after defining it. Provide examples for both approaches and explain when each should be used.",
    tags: ["JavaScript", "Exports", "Functions"],
    answer: `
      <p>A function can be exported while it is being defined, or it can be defined first and exported later. Both approaches are valid. The difference is mainly readability, organization, and how many exports the file contains.</p>
      <p>Exporting while defining is direct and compact:</p>
      <pre><code>export function calculateTotal(price, tax) {
  return price + tax;
}</code></pre>
      <p>This is useful when the function is clearly meant to be used outside the file. It is common in utility files where many functions are exported.</p>
      <p>Defining first and exporting later keeps all exports grouped at the bottom:</p>
      <pre><code>function calculateTotal(price, tax) {
  return price + tax;
}

function calculateDiscount(price) {
  return price * 0.1;
}

export { calculateTotal, calculateDiscount };</code></pre>
      <p>This approach is useful when the file has several functions and the developer wants a clear export list. It also allows some functions to remain private inside the file.</p>
      <p>For default exports, both styles are also possible:</p>
      <pre><code>export default function Login() {}</code></pre>
      <p>or:</p>
      <pre><code>function Login() {}
export default Login;</code></pre>
      <p>Use inline exports for small, clear modules. Use export-at-bottom when the file has several functions and you want better organization.</p>
    `,
  },
  {
    subject: "web-dev",
    title: "Compare async/await with .then()/.catch() promise chaining. When would you prefer one over the other?",
    tags: ["JavaScript", "Promises", "Async"],
    answer: `
      <p><code>async/await</code> and <code>.then()/.catch()</code> are two ways to handle promises in JavaScript. Both can produce the same result, but they organize code differently.</p>
      <p>Promise chaining uses <code>.then()</code> for success and <code>.catch()</code> for errors:</p>
      <pre><code>fetch("/api/users")
  .then(response =&gt; response.json())
  .then(data =&gt; console.log(data))
  .catch(error =&gt; console.error(error));</code></pre>
      <p>This style is useful for short chains and simple operations. It clearly shows each promise step.</p>
      <p><code>async/await</code> makes asynchronous code look closer to normal step-by-step code:</p>
      <pre><code>async function loadUsers() {
  try {
    const response = await fetch("/api/users");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}</code></pre>
      <p>This style is usually easier to read when there are several dependent steps. Error handling is done with <code>try...catch</code>.</p>
      <p>Prefer <code>async/await</code> for most React API calls because it is readable and easier to debug. Prefer <code>.then()</code> when the operation is very short or when chaining is already simple. The important point is to handle both success and failure clearly.</p>
    `,
  },
  {
    subject: "web-dev",
    title: "What are React Components? Explain how components are reusable and composable.",
    tags: ["React", "Components", "Reusability"],
    answer: `
      <p>React components are independent pieces of UI. A component can contain markup, logic, event handling, and styling related to one part of the interface. Examples include buttons, cards, forms, headers, and pages.</p>
      <p>A component is reusable because the same component can be used in many places with different props.</p>
      <pre><code>function Button({ label, onClick }) {
  return &lt;button onClick={onClick}&gt;{label}&lt;/button&gt;;
}</code></pre>
      <p>The same <code>Button</code> component can be used for Save, Delete, Login, or Submit by passing different props.</p>
      <pre><code>&lt;Button label="Save" onClick={saveData} /&gt;
&lt;Button label="Delete" onClick={deleteData} /&gt;</code></pre>
      <p>Components are composable because smaller components can be combined to build bigger interfaces. For example, a <code>ProfilePage</code> can contain <code>Avatar</code>, <code>UserInfo</code>, and <code>PostList</code> components.</p>
      <p>This makes React applications easier to maintain. Each component can focus on one responsibility. If a design or logic change is needed, it can often be made in one component and reused everywhere.</p>
      <p>In exam terms, React components improve structure, reduce repeated code, and allow complex UIs to be built from smaller understandable parts.</p>
    `,
  },
  {
    subject: "web-dev",
    title: "Implement a simple counter application in React using useState. Include increment, decrement, and reset buttons.",
    tags: ["React", "Hooks", "useState"],
    answer: `
      <p>A counter application is a simple example of using React state. The <code>useState</code> hook stores the current count value, and button click handlers update that value.</p>
      <pre><code>import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(prevCount =&gt; prevCount + 1);
  }

  function decrement() {
    setCount(prevCount =&gt; prevCount - 1);
  }

  function reset() {
    setCount(0);
  }

  return (
    &lt;div&gt;
      &lt;h1&gt;Count: {count}&lt;/h1&gt;
      &lt;button onClick={increment}&gt;Increment&lt;/button&gt;
      &lt;button onClick={decrement}&gt;Decrement&lt;/button&gt;
      &lt;button onClick={reset}&gt;Reset&lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>
      <p>The initial value of <code>count</code> is 0. The increment function adds 1, the decrement function subtracts 1, and reset sets the value back to 0.</p>
      <p>The functional form <code>setCount(prevCount =&gt; prevCount + 1)</code> is preferred when the new value depends on the previous value. It avoids mistakes when React batches state updates.</p>
      <p>This example shows the basic React pattern: store UI data in state, update it through event handlers, and let React re-render the component.</p>
    `,
  },
  {
    subject: "web-dev",
    title: "Write a complete fetch implementation to retrieve and display joke data from the URL https://apis.ccbp.in/jokes/random.",
    tags: ["React", "Fetch", "API"],
    answer: `
      <p>To fetch joke data in React, we can use <code>useEffect</code> for the API request and <code>useState</code> to store loading, error, and joke data. The request should run once when the component mounts.</p>
      <pre><code>import { useEffect, useState } from "react";

function RandomJoke() {
  const [joke, setJoke] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() =&gt; {
    async function getJoke() {
      try {
        const response = await fetch("https://apis.ccbp.in/jokes/random");
        if (!response.ok) throw new Error("Failed to fetch joke");
        const data = await response.json();
        setJoke(data);
      } catch (err) {
        setError("Could not load joke");
      } finally {
        setIsLoading(false);
      }
    }

    getJoke();
  }, []);

  if (isLoading) return &lt;p&gt;Loading joke...&lt;/p&gt;;
  if (error) return &lt;p&gt;{error}&lt;/p&gt;;

  return &lt;p&gt;{joke.value}&lt;/p&gt;;
}</code></pre>
      <p>The component first shows a loading message. If the request succeeds, it displays the joke value. If the request fails, it displays an error message. This is a complete exam-ready pattern for API fetching in React.</p>
    `,
  },
  {
    subject: "web-dev",
    title: "What is prop drilling in React and how can it be solved? Explain with an example.",
    tags: ["React", "Props", "Context"],
    answer: `
      <p>Prop drilling happens when data is passed through many components only because a deeply nested child needs it. Intermediate components receive and forward the prop even if they do not use it. This makes code harder to maintain.</p>
      <p>Example:</p>
      <pre><code>function App() {
  const user = { name: "Divya" };
  return &lt;Dashboard user={user} /&gt;;
}

function Dashboard({ user }) {
  return &lt;Sidebar user={user} /&gt;;
}

function Sidebar({ user }) {
  return &lt;Profile user={user} /&gt;;
}</code></pre>
      <p>Here, <code>Dashboard</code> and <code>Sidebar</code> may not need <code>user</code>, but they still pass it down. This is prop drilling.</p>
      <p>One solution is the Context API:</p>
      <pre><code>const UserContext = React.createContext();

function App() {
  const user = { name: "Divya" };
  return (
    &lt;UserContext.Provider value={user}&gt;
      &lt;Dashboard /&gt;
    &lt;/UserContext.Provider&gt;
  );
}

function Profile() {
  const user = useContext(UserContext);
  return &lt;p&gt;{user.name}&lt;/p&gt;;
}</code></pre>
      <p>Context allows the deeply nested component to read shared data directly. Prop drilling can also be reduced by better component structure or state management libraries. The best solution depends on how widely the data is used.</p>
    `,
  },
  {
    subject: "web-dev",
    title: "Discuss the authentication flow in a React application. What steps should be taken after a successful login to manage access to protected routes?",
    tags: ["React", "Authentication", "Router"],
    answer: `
      <p>Authentication flow in a React application starts when the user enters login details and submits the form. React sends those details to the server. If the details are correct, the server returns user information and usually a token such as a JWT.</p>
      <p>After successful login, the app should store authentication information safely. Many applications store the token in a secure cookie. Some simple projects store it in local storage. The app should then update authentication state, such as <code>isLoggedIn</code> or current user data.</p>
      <p>Next, the user should be redirected to a protected page such as dashboard:</p>
      <pre><code>localStorage.setItem("jwt_token", token);
setIsLoggedIn(true);
navigate("/dashboard");</code></pre>
      <p>Protected routes should check the authentication state or token before showing private pages. If the user is not logged in, the route should redirect to login.</p>
      <p>For API requests after login, the token is sent with the request so the server can verify access:</p>
      <pre><code>headers: {
  Authorization: "Bearer " + token
}</code></pre>
      <p>The app should also support logout by removing the token and clearing user state. If the token expires, the app should redirect the user to login again. Client-side route protection improves user experience, but server-side token verification is still necessary for real security.</p>
    `,
  },
  {
    subject: "web-dev",
    title: "What is an uncontrolled input in React? How does it differ from a controlled input? Provide an example.",
    tags: ["React", "Forms", "Uncontrolled Components"],
    answer: `
      <p>An uncontrolled input is an input where React does not store the current value in state. The browser keeps the value internally, and React reads it only when needed, usually through <code>useRef</code>.</p>
      <pre><code>import { useRef } from "react";

function SearchForm() {
  const searchRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();
    alert(searchRef.current.value);
  }

  return (
    &lt;form onSubmit={handleSubmit}&gt;
      &lt;input ref={searchRef} placeholder="Search" /&gt;
      &lt;button type="submit"&gt;Search&lt;/button&gt;
    &lt;/form&gt;
  );
}</code></pre>
      <p>A controlled input stores its value in React state:</p>
      <pre><code>&lt;input
  value={search}
  onChange={event =&gt; setSearch(event.target.value)}
/&gt;</code></pre>
      <p>The controlled input updates React state whenever the user types. This is better for validation, live filtering, disabling buttons, and showing instant feedback.</p>
      <p>The uncontrolled input is simpler when the value is needed only at submit time. It is also common for file inputs because browser file values are handled differently.</p>
      <p>So, the main difference is control: controlled inputs are managed by React state, while uncontrolled inputs are managed by the DOM and accessed using refs.</p>
    `,
  },
  {
    subject: "web-dev",
    title: "Examine why syntax errors occur when exporting variables while defining them. Provide examples of incorrect and correct syntax with explanations.",
    tags: ["JavaScript", "Exports", "Syntax"],
    answer: `
      <p>Syntax errors occur during exports when the export statement does not match JavaScript module rules. This often happens when developers mix default export syntax with variable declaration syntax incorrectly.</p>
      <p>This is correct for a named export:</p>
      <pre><code>export const API_URL = "https://api.example.com";</code></pre>
      <p>Here, the variable is declared and exported in the same line.</p>
      <p>This is incorrect:</p>
      <pre><code>export default const API_URL = "https://api.example.com";</code></pre>
      <p>A default export cannot be used directly before <code>const</code> like this. The correct approach is to define the variable first and export it later:</p>
      <pre><code>const API_URL = "https://api.example.com";
export default API_URL;</code></pre>
      <p>For functions, inline default export is allowed:</p>
      <pre><code>export default function Login() {
  return &lt;h1&gt;Login&lt;/h1&gt;;
}</code></pre>
      <p>Another mistake is importing named exports as default exports or default exports as named exports. The import must match the export style.</p>
      <p>These errors occur because JavaScript modules have fixed grammar rules. To avoid them, use <code>export const name = value</code> for named variables, and use <code>const name = value; export default name;</code> for default variable exports.</p>
    `,
  },
  {
    subject: "web-dev",
    title: "What is batch updating in React? Analyze what happens when multiple setState calls are made in an event handler.",
    tags: ["React", "State", "Batching"],
    answer: `
      <p>Batch updating means React groups multiple state updates together before updating the screen. Instead of re-rendering after every setter call, React waits until the event handler completes and then renders once with the final result.</p>
      <p>Consider this example:</p>
      <pre><code>function handleClick() {
  setCount(count + 1);
  setCount(count + 1);
}</code></pre>
      <p>If <code>count</code> is 0, both calls read the same value, 0. So both try to set the count to 1. The final count becomes 1, not 2. This happens because state values inside the same render do not immediately change after calling the setter.</p>
      <p>When the new state depends on the old state, the correct approach is to use the functional updater:</p>
      <pre><code>function handleClick() {
  setCount(prevCount =&gt; prevCount + 1);
  setCount(prevCount =&gt; prevCount + 1);
}</code></pre>
      <p>Now React applies the updates one after another, so the count increases by 2.</p>
      <p>Batching is useful because it avoids unnecessary renders and improves performance. The exam point is that setters schedule updates; they do not instantly change the state variable in the current running function.</p>
    `,
  },
  {
    subject: "web-dev",
    title: "How do you use useNavigate in React Router to redirect after a form submission? Provide an example.",
    tags: ["React", "Router", "Forms"],
    answer: `
      <p><code>useNavigate</code> is a React Router hook used for programmatic navigation. It is useful when navigation should happen after an action, such as successful form submission, login, or saving data.</p>
      <p>First, import <code>useNavigate</code> and call it inside the component. Then use the returned <code>navigate</code> function after the form work is completed.</p>
      <pre><code>import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    if (username.trim() !== "") {
      navigate("/dashboard");
    }
  }

  return (
    &lt;form onSubmit={handleSubmit}&gt;
      &lt;input
        value={username}
        onChange={event =&gt; setUsername(event.target.value)}
      /&gt;
      &lt;button type="submit"&gt;Login&lt;/button&gt;
    &lt;/form&gt;
  );
}</code></pre>
      <p>Here, <code>event.preventDefault()</code> stops the default form reload. After the condition is satisfied, <code>navigate("/dashboard")</code> redirects the user.</p>
      <p>In real apps, navigation should happen after the server confirms login or data submission. This keeps the user flow correct and avoids sending users to protected pages before success.</p>
    `,
  },
  {
    subject: "web-dev",
    title: "How can multiple useEffect hooks be used to separate concerns in a component? Give an example with one effect updating the document title and another updating localStorage.",
    tags: ["React", "Hooks", "useEffect"],
    answer: `
      <p>Multiple <code>useEffect</code> hooks can be used in one component to separate different side effects. This keeps code easier to read because each effect handles one purpose.</p>
      <p>For example, one effect can update the document title when count changes, and another effect can store the count in local storage.</p>
      <pre><code>import { useEffect, useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() =&gt; {
    document.title = "Count: " + count;
  }, [count]);

  useEffect(() =&gt; {
    localStorage.setItem("count", String(count));
  }, [count]);

  return (
    &lt;button onClick={() =&gt; setCount(count + 1)}&gt;
      Count: {count}
    &lt;/button&gt;
  );
}</code></pre>
      <p>Both effects depend on <code>count</code>, so both run when <code>count</code> changes. Still, their responsibilities are separate. The first handles browser title updates. The second handles storage.</p>
      <p>This is better than placing unrelated logic in one large effect. If one effect needs cleanup later, it can have its own cleanup function without affecting the other. Multiple effects make component side effects organized and easier to maintain.</p>
    `,
  },
  {
    subject: "web-dev",
    title: "Explain how you would implement a search filter feature in React that filters a list of items as the user types.",
    tags: ["React", "Search", "Forms"],
    answer: `
      <p>A search filter in React can be implemented using state for the search text and array filtering for the displayed list. As the user types, the input state changes, and React recalculates which items match the search.</p>
      <pre><code>import { useState } from "react";

function ProductSearch() {
  const products = ["Laptop", "Mobile", "Keyboard", "Mouse"];
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter(product =&gt;
    product.toLowerCase().includes(search.toLowerCase())
  );

  return (
    &lt;div&gt;
      &lt;input
        value={search}
