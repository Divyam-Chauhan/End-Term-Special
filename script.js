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
        onChange={event =&gt; setSearch(event.target.value)}
        placeholder="Search products"
      /&gt;

      &lt;ul&gt;
        {filteredProducts.map(product =&gt; (
          &lt;li key={product}&gt;{product}&lt;/li&gt;
        ))}
      &lt;/ul&gt;
    &lt;/div&gt;
  );
}</code></pre>
      <p>The input is a controlled component because its value comes from React state. The <code>filter()</code> method checks each item and keeps only those that include the typed text. Converting both strings to lowercase makes the search case-insensitive.</p>
      <p>For large lists, performance can be improved using debouncing or backend search. For normal lists, this state and filter pattern is simple, clear, and exam-ready.</p>
    `,
  },
  {
    subject: "web-dev",
    title: "Given the two methods for storing client-side data - cookies and local storage - analyze their differences in terms of data expiration, storage size, and security. Provide one scenario where cookies are preferred over local storage.",
    tags: ["Storage", "Cookies", "Security"],
    answer: `
      <p>Cookies and local storage are both used to store data in the browser, but they behave differently. The correct choice depends on lifetime, size, and security needs.</p>
      <p>Cookies can have an expiry time. They may expire when the browser closes or at a specific date set by the server. Local storage has no automatic expiry. It stays in the browser until the app or user clears it.</p>
      <p>Cookies are small, usually around a few kilobytes. Local storage can store more data, usually several megabytes depending on the browser. So local storage is better for larger non-sensitive data like UI preferences or cached settings.</p>
      <p>Security is a major difference. Cookies can be given flags such as <code>HttpOnly</code>, <code>Secure</code>, and <code>SameSite</code>. <code>HttpOnly</code> prevents JavaScript from reading the cookie, which helps protect tokens from script-based attacks. Local storage is accessible through JavaScript, so sensitive tokens stored there can be stolen if malicious script runs on the page.</p>
      <p>Cookies are preferred for login sessions where the server needs to receive the session identifier automatically with each request. For example, an authentication session cookie is better than storing a sensitive login token in local storage.</p>
    `,
  },
  {
    subject: "web-dev",
    title: "How do you conditionally apply CSS classes to a React element? Provide an example using a state variable.",
    tags: ["React", "CSS", "State"],
    answer: `
      <p>In React, CSS classes can be applied conditionally by changing the <code>className</code> value based on state or props. This is useful for active buttons, selected tabs, error messages, dark mode, and expanded sections.</p>
      <p>A simple method is to use a ternary operator:</p>
      <pre><code>import { useState } from "react";

function ToggleButton() {
  const [isActive, setIsActive] = useState(false);

  return (
    &lt;button
      className={isActive ? "btn active" : "btn"}
      onClick={() =&gt; setIsActive(!isActive)}
    &gt;
      {isActive ? "Active" : "Inactive"}
    &lt;/button&gt;
  );
}</code></pre>
      <p>When <code>isActive</code> is true, the button gets both <code>btn</code> and <code>active</code> classes. When it is false, it gets only <code>btn</code>.</p>
      <p>Another common approach is string interpolation or array joining:</p>
      <pre><code>className={"card " + (isActive ? "selected" : "")}</code></pre>
      <p>The CSS can then style each state differently:</p>
      <pre><code>.btn {
  background: white;
}

.btn.active {
  background: blue;
  color: white;
}</code></pre>
      <p>Conditional classes keep styling connected to component state. This makes UI changes predictable and easy to manage.</p>
    `,
  },
  {
    subject: "web-dev",
    title: "Describe what cookies are and how they differ from local storage. Provide at least two scenarios where cookies are preferred over local storage in a web application.",
    tags: ["Storage", "Cookies", "Local Storage"],
    answer: `
      <p>Cookies are small pieces of data stored by the browser. They are often created by the server and can be sent automatically with HTTP requests to the same domain. They are commonly used for sessions, authentication, user preferences, and tracking.</p>
      <p>Local storage is also browser storage, but it is accessed through JavaScript and is not sent automatically with every request. It can store more data than cookies and has no default expiry.</p>
      <h3>Differences</h3>
      <ul>
        <li><strong>Expiry:</strong> Cookies can expire at a set time; local storage remains until cleared.</li>
        <li><strong>Size:</strong> Cookies are small; local storage can hold more data.</li>
        <li><strong>Request behavior:</strong> Cookies can be sent automatically to the server; local storage cannot.</li>
        <li><strong>Security:</strong> Cookies can use <code>HttpOnly</code>, <code>Secure</code>, and <code>SameSite</code> flags.</li>
      </ul>
      <p>Cookies are preferred for login sessions because the server can receive the session cookie automatically and verify the user. They are also preferred when the token should be protected from JavaScript using <code>HttpOnly</code>.</p>
      <p>Another scenario is server-side personalization, where the server needs a small value like language or region before sending the page. Local storage is better for larger non-sensitive client-only data, but cookies are better when the server must receive the value securely.</p>
    `,
  },
  {
    subject: "dbms",
    title: "Create a database indexing strategy for a large e-commerce website to optimize search performance while maintaining transaction consistency.",
    tags: ["Indexing", "Transactions", "Performance"],
    answer: `
      <p>For a large e-commerce website, indexing should improve read speed without weakening transaction consistency. The main tables usually include products, categories, orders, customers, payments, and inventory. Indexes should be planned according to the queries that run most often, not added randomly.</p>
      <p>Product search should have indexes on columns used in filtering and sorting, such as <code>category_id</code>, <code>brand</code>, <code>price</code>, <code>rating</code>, and <code>availability</code>. A composite index such as <code>(category_id, price)</code> is useful when users filter by category and sort by price. Product names and descriptions may need a full-text index because normal indexes are not enough for keyword search.</p>
      <p>Order and payment tables should have indexes on <code>customer_id</code>, <code>order_date</code>, and <code>status</code> because these are used in order history and admin reports. Foreign key columns should also be indexed so joins remain fast.</p>
      <p>Consistency is maintained by using transactions for order placement, payment update, and stock reduction. Indexes do not replace ACID rules; they only speed up access. Extra indexes should be avoided on highly updated columns because every insert, update, or delete must also update the index.</p>
      <p>A good strategy is to create indexes for high-use queries, monitor slow queries, remove unused indexes, and keep transactions short. This gives faster search while preserving correct order and inventory data.</p>
    `,
  },
  {
    subject: "dbms",
    title: "Compare relational databases and NoSQL databases. Describe scenarios where each is more appropriate.",
    tags: ["Relational DB", "NoSQL", "Database Design"],
    answer: `
      <p>Relational databases store data in tables with rows and columns. They use a fixed schema, primary keys, foreign keys, and SQL. They are strong when the data has clear relationships and correctness is very important.</p>
      <p>NoSQL databases store data in flexible formats such as documents, key-value pairs, wide columns, or graphs. They are useful when data structure changes often, very large volumes of data are handled, or the application needs flexible storage.</p>
      <h3>Relational databases are better when</h3>
      <ul>
        <li>Data is highly structured, such as banking, student records, payroll, and inventory.</li>
        <li>Transactions must follow ACID properties.</li>
        <li>Relationships between tables are important and joins are common.</li>
        <li>Reports need accurate filtering, grouping, and aggregation using SQL.</li>
      </ul>
      <h3>NoSQL databases are better when</h3>
      <ul>
        <li>Data is semi-structured, such as user profiles, logs, messages, and product catalogs.</li>
        <li>The schema may change frequently.</li>
        <li>The system needs to scale across many servers.</li>
        <li>Fast access to whole documents is more important than complex joins.</li>
      </ul>
      <p>For example, an online banking system should usually use a relational database because consistency is critical. A social media activity feed or product recommendation store may use NoSQL because the data is large and changes quickly. The correct choice depends on data structure, consistency needs, query pattern, and scale.</p>
    `,
  },
  {
    subject: "dbms",
    title: "Design a transaction scenario for an online shopping platform that demonstrates the ACID properties, ensuring the transaction is both reliable and efficient.",
    tags: ["Transactions", "ACID", "E-commerce"],
    answer: `
      <p>A good transaction scenario is order placement in an online shopping platform. When a customer buys a product, the system must create an order, reduce stock, record payment, and confirm the purchase. These steps should be treated as one transaction.</p>
      <pre><code>BEGIN TRANSACTION;

INSERT INTO orders(order_id, customer_id, order_date, status)
VALUES (5001, 101, CURRENT_DATE, 'CONFIRMED');

UPDATE inventory
SET quantity = quantity - 1
WHERE product_id = 25 AND quantity &gt; 0;

INSERT INTO payments(order_id, amount, status)
VALUES (5001, 1200, 'PAID');

COMMIT;</code></pre>
      <p><strong>Atomicity</strong> means all steps complete or none of them are saved. If payment fails, the order and stock change must be rolled back.</p>
      <p><strong>Consistency</strong> means the database moves from one valid state to another. Stock should not become negative, and each payment should belong to a valid order.</p>
      <p><strong>Isolation</strong> means two customers buying the same item at the same time should not create wrong stock values. Proper locks or isolation levels prevent both transactions from using the same last unit incorrectly.</p>
      <p><strong>Durability</strong> means once the transaction is committed, the order remains saved even if the system crashes immediately after.</p>
      <p>To keep it efficient, the transaction should be short and should update only required rows. Indexes on <code>product_id</code> and <code>customer_id</code> help locate records quickly. This scenario clearly shows how ACID makes online shopping reliable.</p>
    `,
  },
  {
    subject: "dbms",
    title: "Describe the two-phase locking (2PL) protocol and explain how it ensures serializability.",
    tags: ["Concurrency", "2PL", "Serializability"],
    answer: `
      <p>Two-phase locking, or 2PL, is a concurrency control protocol used to manage transactions that access the same data at the same time. It uses locks so that conflicting operations do not produce incorrect results.</p>
      <p>There are two main lock types. A shared lock is used for reading data, and many transactions can hold shared locks on the same item. An exclusive lock is used for writing data, and only one transaction can hold it on a data item at a time.</p>
      <p>2PL has two phases. In the growing phase, a transaction can acquire new locks but cannot release any lock. In the shrinking phase, the transaction can release locks but cannot acquire new locks. Once a transaction releases its first lock, it cannot request more locks.</p>
      <p>This rule ensures conflict serializability because it forces transactions to have a lock point, which is the moment when the transaction has acquired all the locks it needs. Transactions can then be ordered according to their lock points, producing a result equal to some serial execution.</p>
      <p>Strict 2PL is a common version where exclusive locks are held until commit or rollback. This also prevents cascading rollback because other transactions cannot read uncommitted changes.</p>
      <p>The main drawback is that 2PL can cause deadlocks if two transactions wait for each other. Still, it is important because it gives a clear way to protect correctness during concurrent database operations.</p>
    `,
  },
  {
    subject: "dbms",
    title: "Compare writing SQL keywords in uppercase versus lowercase. Which approach should be preferred and justify your answer with examples.",
    tags: ["SQL", "Code Style", "Readability"],
    answer: `
      <p>SQL keywords can usually be written in uppercase or lowercase because SQL is generally case-insensitive for keywords. For example, <code>SELECT</code> and <code>select</code> are treated the same by most database systems.</p>
      <pre><code>SELECT name, salary
FROM employees
WHERE department = 'Sales';</code></pre>
      <pre><code>select name, salary
from employees
where department = 'Sales';</code></pre>
      <p>Both queries can return the same result. The difference is mainly readability and coding style. Uppercase keywords are often preferred in exam answers and professional SQL because they clearly separate SQL commands from table names, column names, and values. This makes longer queries easier to read.</p>
      <p>Lowercase SQL is also valid and is common in some teams because it is faster to type and looks cleaner to them. However, mixing styles in the same project should be avoided because it reduces consistency.</p>
      <p>The preferred approach for exams is to write SQL keywords in uppercase and identifiers in lowercase or meaningful names. For example, <code>SELECT</code>, <code>FROM</code>, <code>WHERE</code>, <code>GROUP BY</code>, and <code>ORDER BY</code> should stand out clearly.</p>
      <p>So, uppercase keywords should be preferred for final exam answers because they improve clarity, make query structure visible, and match common SQL formatting standards. The most important rule is consistency across the query.</p>
    `,
  },
  {
    subject: "dbms",
    title: "Describe the difference between optimistic and pessimistic concurrency control strategies.",
    tags: ["Concurrency", "Transactions", "Locking"],
    answer: `
      <p>Concurrency control is used when many transactions access the same data at the same time. Its goal is to keep the database correct while allowing users to work in parallel.</p>
      <p>Pessimistic concurrency control assumes that conflicts are likely to happen. So it locks data before reading or writing it. If one transaction is updating a row, another transaction may have to wait until the first one commits or rolls back. This prevents lost updates and dirty writes, but it can reduce speed when many users are waiting for locks.</p>
      <p>Optimistic concurrency control assumes that conflicts are not very common. Transactions are allowed to work without locking data for a long time. Before committing, the system checks whether another transaction changed the same data. If there is no conflict, the transaction commits. If there is a conflict, the transaction may be rolled back and tried again.</p>
      <h3>Key difference</h3>
      <ul>
        <li><strong>Pessimistic:</strong> Checks and blocks early using locks.</li>
        <li><strong>Optimistic:</strong> Allows work first and checks before commit.</li>
      </ul>
      <p>Pessimistic control is better for systems with frequent conflicts, such as ticket booking or stock updates. Optimistic control is better where conflicts are rare, such as editing user profiles or reading reports. Both aim to protect data, but they make different choices between waiting and retrying.</p>
    `,
  },
  {
    subject: "dbms",
    title: "Evaluate the advantages and disadvantages of using SELECT * compared to listing specific columns. Consider scenarios where each approach is appropriate and provide recommendations.",
    tags: ["SQL", "Query Design", "Performance"],
    answer: `
      <p><code>SELECT *</code> means selecting all columns from a table. Listing specific columns means selecting only the required fields. Both are valid, but they should be used carefully.</p>
      <p>The advantage of <code>SELECT *</code> is convenience. It is quick during learning, debugging, or checking table data. For example, <code>SELECT * FROM students;</code> is useful when the user wants to inspect the whole table.</p>
      <p>The disadvantages are important. It may fetch unnecessary data, increase network transfer, expose sensitive columns, and make the application depend on table structure. If new columns are added later, the query output changes automatically, which can break reports or application code.</p>
      <p>Listing columns is usually better in real applications:</p>
      <pre><code>SELECT student_id, name, course
FROM students
WHERE course = 'BCA';</code></pre>
      <p>This query is clearer, faster when fewer columns are needed, and safer because it returns only required data. It also makes the purpose of the query visible to the reader.</p>
      <p><code>SELECT *</code> is acceptable for quick testing, small temporary queries, or admin inspection. For final code, reports, APIs, and exam answers, specific columns should be preferred. The recommendation is simple: use <code>SELECT *</code> only when all columns are truly needed; otherwise list the required columns clearly.</p>
    `,
  },
  {
    subject: "dbms",
    title: "Create a comprehensive SQL solution to identify movies where three specific actors (ids 5, 10, and 15) all appeared together, showing the logic and query structure.",
    tags: ["SQL", "Joins", "Set Logic"],
    answer: `
      <p>To find movies where actors 5, 10, and 15 all appeared together, assume a table named <code>movie_cast(movie_id, actor_id)</code>. Each row stores one actor appearing in one movie. The goal is to return only those movies that contain all three actor IDs.</p>
      <p>A clean solution uses grouping and counting distinct actors:</p>
      <pre><code>SELECT movie_id
FROM movie_cast
WHERE actor_id IN (5, 10, 15)
GROUP BY movie_id
HAVING COUNT(DISTINCT actor_id) = 3;</code></pre>
      <p>The <code>WHERE</code> clause keeps only rows for the three required actors. Then <code>GROUP BY movie_id</code> groups those rows movie-wise. The <code>HAVING</code> condition checks that all three different actors are present in the same movie group.</p>
      <p>If movie details are stored in a separate table, the query can join with it:</p>
      <pre><code>SELECT m.movie_id, m.title
FROM movies m
JOIN movie_cast mc ON m.movie_id = mc.movie_id
WHERE mc.actor_id IN (5, 10, 15)
GROUP BY m.movie_id, m.title
HAVING COUNT(DISTINCT mc.actor_id) = 3;</code></pre>
      <p>This approach is better than writing three separate manual checks because it is clear and easy to extend. If five actors are required later, we can add their IDs and change the count. The main point is that filtering selects candidate rows, grouping collects actors by movie, and <code>HAVING</code> confirms that all required actors appeared together.</p>
    `,
  },
  {
    subject: "dbms",
    title: "Explain BCNF (Boyce-Codd Normal Form) and describe how it differs from 3NF, with an example.",
    tags: ["Normalization", "BCNF", "3NF"],
    answer: `
      <p>BCNF, or Boyce-Codd Normal Form, is a stricter form of database normalization. A table is in BCNF if, for every functional dependency <code>X -> Y</code>, X is a super key. This means the left side of every dependency must be able to uniquely identify a row.</p>
      <p>3NF is slightly less strict. A table is in 3NF if, for every dependency <code>X -> Y</code>, either X is a super key, or Y is a prime attribute, meaning Y is part of some candidate key.</p>
      <p>The difference is that 3NF may allow some dependencies where the determinant is not a super key, if the dependent attribute is prime. BCNF does not allow this exception.</p>
      <p>Example: consider <code>Class(student, subject, teacher)</code>, where one teacher teaches only one subject, and a student can take a subject from a teacher. If <code>teacher -> subject</code>, then teacher decides subject. But teacher may not uniquely identify the whole row because many students can study from the same teacher.</p>
      <p>This can create redundancy because the same teacher-subject pair may repeat for many students. In BCNF, we decompose it into <code>TeacherSubject(teacher, subject)</code> and <code>StudentTeacher(student, teacher)</code>.</p>
      <p>Thus, 3NF removes many update problems, but BCNF removes stronger dependency-related redundancy. BCNF is preferred when lossless decomposition can be achieved without losing important dependencies.</p>
    `,
  },
  {
    subject: "dbms",
    title: "Examine the performance implications and practical differences between using UNION versus UNION ALL when dealing with large datasets, including when each should be preferred.",
    tags: ["SQL", "Set Operations", "Performance"],
    answer: `
      <p><code>UNION</code> and <code>UNION ALL</code> are SQL set operations used to combine results from two or more <code>SELECT</code> statements. The main difference is how they handle duplicate rows.</p>
      <p><code>UNION</code> removes duplicate rows from the final result. To do this, the database usually has to sort or compare rows. On large datasets, this can take extra time and memory. It is useful when the final result must contain unique rows only.</p>
      <pre><code>SELECT city FROM customers
UNION
SELECT city FROM suppliers;</code></pre>
      <p><code>UNION ALL</code> keeps all rows, including duplicates. Since it does not need duplicate removal, it is usually faster and more efficient for large datasets.</p>
      <pre><code>SELECT city FROM customers
UNION ALL
SELECT city FROM suppliers;</code></pre>
      <p><code>UNION</code> should be preferred when duplicate rows would be logically wrong, such as creating a unique list of cities or user IDs. <code>UNION ALL</code> should be preferred when duplicates are meaningful or when the source data is already known to be distinct.</p>
      <p>In reporting systems, logs, audit records, and large data processing, <code>UNION ALL</code> is often better because it avoids unnecessary work. The practical recommendation is to use <code>UNION ALL</code> by default for performance, and use <code>UNION</code> only when duplicate removal is actually required.</p>
    `,
  },
  {
    subject: "dbms",
    title: "Explain what a materialized view is and how it differs from a regular view in SQL.",
    tags: ["Views", "SQL", "Performance"],
    answer: `
      <p>A regular view is a saved SQL query. It does not usually store the result separately. When a user queries the view, the database runs the underlying query and returns the latest data from the base tables.</p>
      <pre><code>CREATE VIEW active_students AS
SELECT student_id, name
FROM students
WHERE status = 'ACTIVE';</code></pre>
      <p>A materialized view stores the result of a query physically. Because the result is already stored, reading from a materialized view can be faster, especially for complex joins, aggregations, or reports.</p>
      <p>The main difference is freshness and speed. A regular view always reflects current base table data because it is calculated when used. A materialized view may become outdated until it is refreshed. Some systems refresh it manually, on schedule, or automatically.</p>
      <h3>Comparison</h3>
      <ul>
        <li><strong>Regular view:</strong> Stores query definition, not result; always current; may be slower for complex queries.</li>
        <li><strong>Materialized view:</strong> Stores query result; faster reads; needs refresh to stay updated.</li>
      </ul>
      <p>Regular views are useful for simplifying queries and controlling access to columns. Materialized views are useful for dashboards, summaries, and repeated reports where read speed matters more than instant updates.</p>
      <p>Thus, a regular view is mainly a logical layer, while a materialized view is a stored result used to improve performance.</p>
    `,
  },
  {
    subject: "dbms",
    title: "In which scenarios can subqueries be utilized within an SQL statement?",
    tags: ["SQL", "Subqueries", "Query Design"],
    answer: `
      <p>A subquery is a query written inside another SQL query. It is used when one query needs a value, list, or table result produced by another query. Subqueries can appear in different parts of an SQL statement.</p>
      <p>In a <code>WHERE</code> clause, a subquery can filter records based on another result:</p>
      <pre><code>SELECT name
FROM students
WHERE course_id IN (
  SELECT course_id
  FROM courses
  WHERE department = 'Computer Science'
);</code></pre>
      <p>In a <code>SELECT</code> clause, a subquery can calculate a value for each row, such as count or average. In a <code>FROM</code> clause, a subquery can act like a temporary table.</p>
      <p>Subqueries are also useful with operators such as <code>IN</code>, <code>NOT IN</code>, <code>EXISTS</code>, <code>ANY</code>, and <code>ALL</code>. For example, <code>EXISTS</code> checks whether matching rows are present in another table.</p>
      <p>Common scenarios include finding students above average marks, customers who placed orders, products costlier than category average, or employees earning more than their department average.</p>
      <p>Subqueries make SQL more expressive because they allow step-by-step logic inside one statement. However, for very large datasets, joins may sometimes be easier to optimize. A good exam answer should mention that subqueries can be used for filtering, comparison, existence checks, derived tables, and calculated values.</p>
    `,
  },
  {
    subject: "dbms",
    title: "What is a subquery in SQL, and how is it typically used?",
    tags: ["SQL", "Subqueries", "Filtering"],
    answer: `
      <p>A subquery is an SQL query placed inside another query. The inner query gives a result that the outer query uses for filtering, comparison, or calculation. It is also called a nested query.</p>
      <p>A simple example is finding students who scored above the average marks:</p>
      <pre><code>SELECT name, marks
FROM students
WHERE marks &gt; (
  SELECT AVG(marks)
  FROM students
);</code></pre>
      <p>Here, the inner query calculates the average marks. The outer query uses that value to find students whose marks are greater than the average.</p>
      <p>Subqueries are typically used in <code>WHERE</code>, <code>HAVING</code>, <code>SELECT</code>, and <code>FROM</code> clauses. They may return a single value, a list of values, or a temporary result table. A single-value subquery can be used with comparison operators like <code>&gt;</code> or <code>=</code>. A list subquery is often used with <code>IN</code>. A table subquery can be used in the <code>FROM</code> clause.</p>
      <p>Subqueries are useful when the condition depends on another query result. They improve readability when the logic naturally happens in steps. However, they should be written carefully because unnecessary subqueries can slow down performance.</p>
      <p>In short, a subquery helps one SQL statement use the result of another SQL statement to produce a more meaningful final answer.</p>
    `,
  },
  {
    subject: "dbms",
    title: "Describe the different types of joins in SQL and provide a use case for each.",
    tags: ["SQL", "Joins", "Relationships"],
    answer: `
      <p>A join is used to combine rows from two or more tables based on a related column. Joins are important because relational databases store related data in separate tables to reduce duplication.</p>
      <p><strong>INNER JOIN</strong> returns only matching rows from both tables. It is used when we need records that exist in both tables, such as students who have enrolled in courses.</p>
      <pre><code>SELECT s.name, c.course_name
FROM students s
INNER JOIN courses c ON s.course_id = c.course_id;</code></pre>
      <p><strong>LEFT JOIN</strong> returns all rows from the left table and matching rows from the right table. If no match exists, right-side columns are null. It is useful for listing all customers, including those who have not placed orders.</p>
      <p><strong>RIGHT JOIN</strong> returns all rows from the right table and matching rows from the left table. It can be used to list all departments, including departments without employees.</p>
      <p><strong>FULL OUTER JOIN</strong> returns rows when there is a match in either table. It is useful for comparing two datasets and finding both matched and unmatched records.</p>
      <p><strong>CROSS JOIN</strong> returns all combinations of rows from both tables. It is used when every combination is needed, such as creating combinations of sizes and colors.</p>
      <p><strong>SELF JOIN</strong> joins a table with itself, useful for employee-manager relationships. The correct join depends on whether we need only matches, all records from one side, or all combinations.</p>
    `,
  },
  {
    subject: "dbms",
    title: "Illustrate how to make a query that combines both logical operators and conditional filters in MongoDB.",
    tags: ["MongoDB", "Filters", "NoSQL"],
    answer: `
      <p>MongoDB queries use documents to describe conditions. Conditional filters compare field values, while logical operators combine multiple conditions. Common conditional operators include <code>$gt</code>, <code>$lt</code>, <code>$gte</code>, <code>$lte</code>, <code>$eq</code>, and <code>$ne</code>. Common logical operators include <code>$and</code>, <code>$or</code>, and <code>$not</code>.</p>
      <p>Suppose we have a <code>products</code> collection. We want products from the electronics category, priced below 50000, and either in stock or highly rated.</p>
      <pre><code>db.products.find({
  $and: [
    { category: "Electronics" },
    { price: { $lt: 50000 } },
    {
      $or: [
        { stock: { $gt: 0 } },
        { rating: { $gte: 4.5 } }
      ]
    }
  ]
});</code></pre>
      <p>The <code>$and</code> operator means all main conditions must be true. The category must be electronics, and the price must be less than 50000. Inside that, <code>$or</code> means at least one of the two conditions should be true: either stock is available or rating is high.</p>
      <p>This style is useful when filters come from search pages, dashboards, or reports. The query is clear because each condition is written separately. In an exam answer, mention that logical operators control how conditions are combined, while conditional operators compare field values.</p>
    `,
  },
  {
    subject: "dbms",
    title: "Explain the concept of transaction management in databases and describe how COMMIT and ROLLBACK are used.",
    tags: ["Transactions", "Commit", "Rollback"],
    answer: `
      <p>Transaction management is the process of handling a group of database operations as one logical unit of work. It is important when one task needs multiple changes and all of them must remain correct together.</p>
      <p>For example, in a bank transfer, money is deducted from one account and added to another account. If only one step is saved, the database becomes incorrect. So both updates should be part of one transaction.</p>
      <pre><code>BEGIN TRANSACTION;

UPDATE accounts
SET balance = balance - 1000
WHERE account_id = 1;

UPDATE accounts
SET balance = balance + 1000
WHERE account_id = 2;

COMMIT;</code></pre>
      <p><code>COMMIT</code> is used to permanently save all changes made during the transaction. After commit, the changes become visible and durable.</p>
      <p><code>ROLLBACK</code> is used to undo changes made during the transaction if an error occurs or a condition fails. For example, if the first account does not have enough balance, the transaction should be rolled back.</p>
      <pre><code>ROLLBACK;</code></pre>
      <p>Transaction management helps maintain ACID properties. It protects atomicity because all operations succeed or fail together. It protects consistency because invalid partial changes are not saved.</p>
      <p>In short, <code>COMMIT</code> confirms a transaction, while <code>ROLLBACK</code> cancels it. Both are essential for reliable database operations.</p>
    `,
  },
  {
    subject: "dbms",
    title: "Detail the process of chaining multiple query operations in MongoDB.",
    tags: ["MongoDB", "Query Chaining", "NoSQL"],
    answer: `
      <p>Chaining in MongoDB means applying multiple query operations one after another on the same result. It is commonly used with methods like <code>find()</code>, <code>sort()</code>, <code>limit()</code>, and <code>skip()</code>. Each method refines how the final result is returned.</p>
      <p>Example:</p>
      <pre><code>db.students
  .find({ course: "BCA", marks: { $gte: 60 } })
  .sort({ marks: -1 })
  .skip(5)
  .limit(10);</code></pre>
      <p>Here, <code>find()</code> filters students from the BCA course with marks greater than or equal to 60. <code>sort({ marks: -1 })</code> arranges the result in descending order of marks. <code>skip(5)</code> ignores the first five matching documents. <code>limit(10)</code> returns only ten documents.</p>
      <p>Chaining is useful for pagination, search results, ranking lists, and dashboards. For example, a website can show the second page of high-scoring students by sorting, skipping earlier results, and limiting the page size.</p>
      <p>The order of chained operations matters for readability, and sometimes for performance. Filtering should be done early so fewer documents need sorting or limiting. Indexes on filtered and sorted fields can improve speed.</p>
      <p>In short, MongoDB chaining allows developers to filter, arrange, and control result size in a clean step-by-step query format.</p>
    `,
  },
  {
    subject: "dbms",
    title: "Explain the concept of a deadlock in database systems and describe methods to prevent or resolve it.",
    tags: ["Concurrency", "Deadlock", "Transactions"],
    answer: `
      <p>A deadlock happens when two or more transactions wait for each other in such a way that none of them can continue. Each transaction holds a lock needed by another transaction.</p>
      <p>Example: Transaction T1 locks row A and waits for row B. Transaction T2 locks row B and waits for row A. Both keep waiting, so the database cannot move forward unless one transaction is stopped.</p>
      <p>Deadlocks occur because databases use locks to protect data during concurrent transactions. Locks are useful, but if transactions acquire them in different orders, waiting cycles can form.</p>
      <h3>Prevention methods</h3>
      <ul>
        <li>Access tables and rows in a fixed order in all transactions.</li>
        <li>Keep transactions short so locks are held for less time.</li>
        <li>Use proper indexes so the database locks fewer rows.</li>
        <li>Use lock timeouts so a transaction does not wait forever.</li>
      </ul>
      <h3>Resolution methods</h3>
      <ul>
        <li>The database can detect a waiting cycle and choose one transaction as a victim.</li>
        <li>The victim transaction is rolled back, releasing its locks.</li>
        <li>The rolled-back transaction can be retried later.</li>
      </ul>
      <p>Deadlocks cannot always be completely avoided in busy systems, but good transaction design reduces them. The main idea is to hold fewer locks, hold them for less time, and handle rollback properly.</p>
    `,
  },
  {
    subject: "dbms",
    title: "Assess the importance of the WHERE clause in database queries. Evaluate scenarios where using WHERE is essential versus when it can be omitted.",
    tags: ["SQL", "WHERE", "Filtering"],
    answer: `
      <p>The <code>WHERE</code> clause is used to filter rows in SQL queries. It tells the database which rows should be selected, updated, or deleted. Without <code>WHERE</code>, the operation usually applies to the whole table.</p>
      <p>In <code>SELECT</code> queries, <code>WHERE</code> is essential when only specific records are needed:</p>
      <pre><code>SELECT name, marks
FROM students
WHERE marks &gt;= 60;</code></pre>
      <p>This returns only students with marks greater than or equal to 60. Without the condition, all students would be returned.</p>
      <p><code>WHERE</code> is very important in <code>UPDATE</code> and <code>DELETE</code> statements because missing it can change or remove every row:</p>
      <pre><code>UPDATE students
SET status = 'PASS'
WHERE marks &gt;= 40;</code></pre>
      <p>It is also useful in joins, reports, search filters, date ranges, and permission-based data access.</p>
      <p>The <code>WHERE</code> clause can be omitted when the user intentionally wants all rows, such as showing a full product catalog, counting all records, or generating a complete table backup. For example, <code>SELECT COUNT(*) FROM students;</code> does not need a filter.</p>
      <p>So, <code>WHERE</code> is essential whenever the operation should apply only to selected rows. It improves correctness, safety, and query usefulness.</p>
    `,
  },
  {
    subject: "dbms",
    title: "Evaluate the importance of the WHERE clause in UPDATE operations using examples from both the student and player tables.",
    tags: ["SQL", "UPDATE", "WHERE"],
    answer: `
      <p>The <code>WHERE</code> clause is extremely important in <code>UPDATE</code> operations because it decides which rows will be changed. If <code>WHERE</code> is missing, the update applies to every row in the table, which can damage the data.</p>
      <p>Example using a student table:</p>
      <pre><code>UPDATE students
SET grade = 'A'
WHERE marks &gt;= 90;</code></pre>
      <p>This correctly updates only students whose marks are 90 or above. Without <code>WHERE</code>, every student would get grade A, which is wrong.</p>
      <p>Example using a player table:</p>
      <pre><code>UPDATE players
SET status = 'INJURED'
WHERE player_id = 12;</code></pre>
      <p>This updates only the player with ID 12. If the condition is removed, all players would be marked injured.</p>
      <p>The <code>WHERE</code> clause is also useful when updating based on teams, scores, positions, dates, or status. It makes the update targeted and meaningful.</p>
      <p>Before running an important update, it is good practice to test the condition with a <code>SELECT</code> query:</p>
      <pre><code>SELECT *
FROM players
WHERE player_id = 12;</code></pre>
      <p>This confirms which rows will be affected. In conclusion, <code>WHERE</code> protects data from accidental mass updates and should be used carefully in almost every real <code>UPDATE</code> operation.</p>
    `,
  },
  {
    subject: "dbms",
    title: "Describe the aggregation pipeline in MongoDB and explain how stages like $match, $group, and $project work together.",
    tags: ["MongoDB", "Aggregation", "Pipeline"],
    answer: `
      <p>The aggregation pipeline in MongoDB is used to process documents step by step and produce calculated results. Each stage takes input documents, performs an operation, and passes the output to the next stage.</p>
      <p><code>$match</code> filters documents based on conditions. It is similar to <code>WHERE</code> in SQL. It should usually be placed early so later stages process fewer documents.</p>
      <p><code>$group</code> groups documents by a field and calculates values such as total, average, count, minimum, or maximum.</p>
      <p><code>$project</code> controls which fields appear in the final output. It can include fields, exclude fields, rename fields, or create calculated fields.</p>
      <pre><code>db.orders.aggregate([
  { $match: { status: "PAID" } },
  {
    $group: {
      _id: "$customer_id",
      totalAmount: { $sum: "$amount" },
      orderCount: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      customerId: "$_id",
      totalAmount: 1,
      orderCount: 1
    }
  }
]);</code></pre>
      <p>In this example, <code>$match</code> keeps only paid orders. <code>$group</code> summarizes them customer-wise. <code>$project</code> formats the output neatly. The pipeline is useful for reports, dashboards, summaries, and data transformation because it breaks complex processing into clear stages.</p>
    `,
  },
  {
    subject: "dbms",
    title: "List and explain the characteristics of denormalization with a focus on its impact on performance.",
    tags: ["Normalization", "Denormalization", "Performance"],
    answer: `
      <p>Denormalization is the process of intentionally adding some duplicate or precomputed data to a database design. It is usually done after normalization when read performance becomes more important than avoiding every duplication.</p>
      <p>One characteristic is controlled redundancy. Data that could be found through joins may be stored directly in another table. For example, an order table may store customer name along with customer ID to avoid joining the customer table for every report.</p>
      <p>Another characteristic is faster read performance. Since fewer joins are required, queries can become simpler and quicker, especially in dashboards, reports, and high-traffic applications.</p>
      <p>Denormalization can also store summary values, such as total order amount, number of comments, or average rating. This avoids recalculating the same values again and again.</p>
      <p>The main disadvantage is update difficulty. If duplicated data changes, all copies must be updated correctly. Otherwise, the database may show inconsistent values. It can also increase storage requirement and make write operations slower.</p>
      <p>Denormalization is useful when the system has many reads and fewer updates, or when reports must load quickly. It should not be done blindly. The database designer should first normalize the schema, identify slow queries, and then denormalize only where it gives a clear performance benefit.</p>
    `,
  },
  {
    subject: "dbms",
    title: "Explain what functional dependency means in the context of database normalization and give an example.",
    tags: ["Normalization", "Functional Dependency", "Database Design"],
    answer: `
      <p>Functional dependency is a relationship between attributes in a table. It means the value of one attribute determines the value of another attribute. It is written as <code>A -> B</code>, which means A determines B.</p>
      <p>For example, in a student table:</p>
      <pre><code>Student(student_id, student_name, course)</code></pre>
      <p>If each <code>student_id</code> belongs to only one student, then:</p>
      <pre><code>student_id -> student_name</code></pre>
      <p>This means that if we know the student ID, we can find the student name. The same student ID should not give two different names.</p>
      <p>Functional dependencies are important in normalization because they help identify redundancy and update problems. If a table stores data in a way where non-key attributes depend on only part of a key or on another non-key attribute, the table may need to be decomposed.</p>
      <p>Example of a problematic table:</p>
      <pre><code>Enrollment(student_id, course_id, student_name, course_name)</code></pre>
      <p>Here, <code>student_id -> student_name</code> and <code>course_id -> course_name</code>. If the primary key is <code>(student_id, course_id)</code>, then student name and course name depend only on part of the key. This creates redundancy.</p>
      <p>So, functional dependency is the basic idea used to check whether table design is logical, clean, and properly normalized.</p>
    `,
  },
  {
    subject: "dbms",
    title: "Identify key situations where denormalization is advantageous over normalization.",
    tags: ["Normalization", "Denormalization", "Database Design"],
    answer: `
      <p>Normalization reduces duplication and keeps data consistent. Denormalization intentionally adds some duplicate or derived data to improve read performance. Denormalization is advantageous only in selected situations where the benefit is clear.</p>
      <p>It is useful in reporting systems where the same summaries are needed repeatedly. For example, storing monthly sales totals can be faster than calculating them from thousands of order rows every time.</p>
      <p>It is also helpful in read-heavy applications. If a page is opened many times but updated rarely, storing commonly needed related data together can reduce joins and improve response time.</p>
      <p>Denormalization is useful in dashboards because dashboards often need quick counts, totals, and recent activity. Precomputed values can make them load faster.</p>
      <p>It can help in distributed systems where joining data across multiple servers is expensive. Storing a small copy of required data locally may improve speed.</p>
      <p>Search pages and product catalogs may also benefit. For example, storing category name, brand name, and rating summary with product data can make filtering and display faster.</p>
      <p>However, denormalization should not replace good design. It increases storage and can create inconsistency if updates are not handled carefully. It is best used after identifying slow read queries and only for data that does not change too frequently.</p>
    `,
  },
  {
    subject: "dbms",
    title: "How can aggregates be performed conditionally in MongoDB? Illustrate this with an example query.",
    tags: ["MongoDB", "Aggregation", "Conditional Logic"],
    answer: `
      <p>Conditional aggregation in MongoDB means calculating totals, counts, or other values only when certain conditions are true. This is commonly done inside the aggregation pipeline using expressions such as <code>$cond</code>, along with stages like <code>$group</code> and <code>$project</code>.</p>
      <p>Suppose an <code>orders</code> collection stores order amount and status. We want total sales, paid sales, and cancelled order count.</p>
      <pre><code>db.orders.aggregate([
  {
    $group: {
      _id: null,
      totalSales: { $sum: "$amount" },
      paidSales: {
        $sum: {
          $cond: [
            { $eq: ["$status", "PAID"] },
            "$amount",
            0
          ]
        }
      },
      cancelledCount: {
        $sum: {
          $cond: [
            { $eq: ["$status", "CANCELLED"] },
            1,
            0
          ]
        }
      }
    }
  }
]);</code></pre>
      <p>Here, <code>totalSales</code> adds all amounts. <code>paidSales</code> adds the amount only when status is paid; otherwise it adds 0. <code>cancelledCount</code> adds 1 only for cancelled orders.</p>
      <p>This is useful for reports where multiple totals are needed from the same data. Conditional aggregation avoids running separate queries for each condition and gives a clear result in one pipeline.</p>
    `,
  },
  {
    subject: "dbms",
    title: "Explain how indexing improves query performance in databases. Describe the trade-offs involved.",
    tags: ["Indexing", "Performance", "Trade-offs"],
    answer: `
      <p>Indexing improves query performance by helping the database find rows faster. Without an index, the database may scan the whole table to find matching records. With an index, it can locate the required rows more directly.</p>
      <p>For example, if a <code>students</code> table has thousands of rows and we often search by roll number, an index on <code>roll_no</code> helps the database find that student quickly.</p>
      <pre><code>CREATE INDEX idx_students_roll_no
ON students(roll_no);</code></pre>
      <p>Indexes are useful on columns used often in <code>WHERE</code>, <code>JOIN</code>, <code>ORDER BY</code>, and <code>GROUP BY</code> clauses. Composite indexes can help when queries use multiple columns together, such as <code>(course_id, marks)</code>.</p>
      <p>The main benefit is faster read speed. Queries, joins, sorting, and searching can become much more efficient.</p>
      <p>The trade-off is that indexes take extra storage. They also slow down write operations because every insert, update, or delete may require the index to be updated. Too many indexes can hurt performance instead of helping it.</p>
      <p>Indexes should be created based on real query needs. Columns with many repeated values may not always benefit much from indexing. A good database design uses indexes for frequent and important queries, monitors performance, and removes unused indexes.</p>
    `,
  },
  {
    subject: "dbms",
    title: "Discuss timestamp-based protocols in concurrency control. How do they function?",
    tags: ["Concurrency", "Timestamps", "Transactions"],
    answer: `
      <p>Timestamp-based concurrency control is a method used to manage transactions without relying mainly on locks. Each transaction gets a unique timestamp when it starts. Older transactions have smaller timestamps, and newer transactions have larger timestamps.</p>
      <p>The basic idea is that database operations should follow the timestamp order. This gives a serial order based on when transactions started.</p>
      <p>For each data item, the system keeps two important values: <code>read_timestamp</code> and <code>write_timestamp</code>. The read timestamp records the largest timestamp of any transaction that successfully read the item. The write timestamp records the largest timestamp of any transaction that successfully wrote the item.</p>
      <p>When a transaction tries to read or write, the system checks whether that operation would break timestamp order. If it is safe, the operation is allowed and timestamps are updated. If it is not safe, the transaction is rolled back and restarted with a new timestamp.</p>
      <p>For example, if an older transaction tries to write a data item that has already been read or written by a newer transaction, allowing it may create an incorrect order. So the older transaction is rejected.</p>
      <p>The advantage is that timestamp protocols avoid deadlocks because transactions do not wait for locks in the same way. The disadvantage is that rollbacks can increase if conflicts are frequent. This method is useful when the system wants a clear serial order for concurrent transactions.</p>
    `,
  },
  {
    subject: "dbms",
    title: "Explain how the $lookup stage works in MongoDB and when you would use it.",
    tags: ["MongoDB", "Aggregation", "Lookup"],
    answer: `
      <p>The <code>$lookup</code> stage in MongoDB is used in an aggregation pipeline to combine documents from two collections. It works like a left outer join in SQL. It adds matching documents from another collection into an array field in the result.</p>
      <p>Suppose we have an <code>orders</code> collection with <code>customer_id</code>, and a <code>customers</code> collection with customer details. We can use <code>$lookup</code> to attach customer information to each order.</p>
      <pre><code>db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customer_id",
      foreignField: "_id",
      as: "customerDetails"
    }
  }
]);</code></pre>
      <p><code>from</code> is the collection to join with. <code>localField</code> is the field in the current collection. <code>foreignField</code> is the matching field in the other collection. <code>as</code> is the name of the array where matched documents will be stored.</p>
      <p><code>$lookup</code> is useful when related data is stored in separate collections, such as orders and customers, students and courses, or products and reviews.</p>
      <p>It should be used carefully because joining large collections can be costly. Proper indexes on matching fields help performance. If the data is always read together and rarely changes, embedding may sometimes be better. But when separate collections are needed, <code>$lookup</code> is the standard MongoDB aggregation stage for joining them.</p>
    `,
  },
  {
    subject: "dbms",
    title: "Analyze how the placement and usage of ORDER BY, LIMIT, and OFFSET affect query execution in set operations, providing examples of correct and incorrect implementations.",
    tags: ["SQL", "Set Operations", "Sorting"],
    answer: `
      <p>In SQL set operations such as <code>UNION</code>, <code>UNION ALL</code>, <code>INTERSECT</code>, and <code>EXCEPT</code>, the placement of <code>ORDER BY</code>, <code>LIMIT</code>, and <code>OFFSET</code> affects the final result. These clauses should usually be applied after the complete set operation, not inside each individual <code>SELECT</code>, unless subqueries are used.</p>
      <p>Correct example:</p>
