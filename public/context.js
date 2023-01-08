const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const HashRouter = ReactRouterDOM.HashRouter;
const UserContext = React.createContext(null);

function UserContextProvider({ children }) {
  const [state, setState] = React.useState({
    users: [{ name: "Amy", email: "Amy@test.com", password: "testing123", balance: 100, activity: "" }],
    currentUserEmail: null,
    audit: [],
  });


// TODO Persist to local storage
const addAudit = React.useCallback((entry) => {
  setState((state) => ({
    ...state,
    audit: [...state.audit, { timestamp: Date.now(), ...entry }],
  }));
  }, []);
const contextValue = React.useMemo(
  () => ({
    state,
    setState,
    addAudit,
  }),
  [state]
  );
return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
}

function useUserContext() {
  return React.useContext(UserContext);
}

function useCurrentUser() {
  const ctx = useUserContext();
  const currentUser = React.useMemo(
    () => ctx.state.users.find((user) => user.email === ctx.state.currentUserEmail),
    [ctx.state.users, ctx.state.currentUserEmail]
  );
  return currentUser;
}

function Card(props) {
  function classes() {
    const bg = props.bgcolor ? " bg-" + props.bgcolor : " ";
    const txt = props.txtcolor ? " text-" + props.txtcolor : " text-white";
    return "card mb-3 " + bg + txt;
  }
  return (
    <div className={classes()} style={{ maxWidth: "25rem" }}>
      {props.header && <div className="card-header">{props.header}</div>}
      <div className="card-body">
        {props.title && <h5 className="card-title">{props.title}</h5>}
        {props.text && <p className="card-text">{props.text}</p>}
        {props.body}
        {props.status && <div id="createStatus">{props.status}</div>}
      </div>
    </div>
  );
}