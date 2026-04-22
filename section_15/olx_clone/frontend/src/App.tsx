import Router from "./Router";

import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <Router />
    </UserProvider>
  )
}

export default App;
