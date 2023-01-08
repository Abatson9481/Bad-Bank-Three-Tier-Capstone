function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const ctx = useUserContext();

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label + " is required.");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function handleCreate(e) {
    e.stopPropagation();
    console.log(name, email, password);
    if (!validate(name, "Name")) return;
    if (!validate(email, "Email")) return;
    if (!validate(password, "Password")) return;
    else {
    if (password.length < 8) {
    alert("Password must be 8 characters long");
    return;
    }}
    fetch(`/account/create/${name}/${email}/${password}`)
    .then(response => response.json())
    .then(data => console.log('Backend Data', data))
    
    ctx.setState({
    ...ctx.state,
    users: [...ctx.state.users, { name, email, password, balance: 100 }],
    });
    ctx.addAudit({ action: "New Account", email, data: { name } });
    setShow(false);
    
    console.log(password.length);
    }    

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
  }

  return (
    <Card
      bgcolor="info"
      header="Create a New Account"
      status={status}
      body={
        show ? (
          <form onSubmit={handleCreate}>
            Name:
            <br />
            <input
              type="input"
              className="form-control"
              id="name"
              placeholder="Enter name (required)"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <br />
            Email address
            <br />
            <input
              type="input"
              className="form-control"
              id="email"
              placeholder="Enter email (required)"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <br />
            Password
            <br />
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password (required)"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <br />
            <button type="submit" className="btn btn-light" disabled={!name && !email && !password}>
              Create Account
            </button>
          </form>
        ) : (
          <>
            <h5>Success!</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              Click here to add another account
            </button>
            
          </>
        )
      }
    />
  );
}