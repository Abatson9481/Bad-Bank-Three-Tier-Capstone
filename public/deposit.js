function Deposit() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [deposit, setDeposit] = React.useState(0);
  const ctx = useUserContext();
  const currentUser = useCurrentUser();

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function handleDeposit(e) {
    e.preventDefault();
    console.log(deposit);

    if (!validate(deposit, "Please Enter Valid Amount")) return;
    else {
      if (deposit <= 0 || isNaN(deposit)) {
        alert("Must Enter Valid Amount");
        return;
      }
    }

    const newUsers = ctx.state.users.reduce((res, user) => {
      if (user.email === currentUser.email) {
        user.balance = Number(user.balance) + Number(deposit);
        console.log("Balance", user.balance);
      }
      res.push(user);
      return res;
    }, []);
    ctx.setState({ ...ctx.state, users: newUsers });
    ctx.addAudit({ action: "Deposit", email: currentUser.email, data: { deposit } });
    
    setShow(false);
  }

  function clearForm() {
    setDeposit(0);
    setShow(true);
  }

  if (!currentUser) return <Card bgcolor="danger" body="Must Login To Continue"></Card>;

  const totalBalance = `Current Balance $${currentUser.balance}`;

  return (
    <Card
      bgcolor="info"
      header="Make a Deposit"
      status={status}
      body={
        show ? (
          <form onSubmit={handleDeposit}>
            <h5> {totalBalance} </h5>
            <br />
            <br />
            Amount
            <br />
            <input
              type="input"
              className="form-control"
              id="deposit"
              placeholder="Amount"
              value={deposit}
              onChange={(e) => setDeposit(e.currentTarget.value)}
            />
            <br />
            <button type="submit" className="btn btn-light" disabled={!deposit}>
              Deposit
            </button>
          </form>
        ) : (
          <>
            <h5>Success, new balance $ {currentUser.balance}</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              Make Another Deposit
            </button>
          </>
        )
      }
    />
  );
}