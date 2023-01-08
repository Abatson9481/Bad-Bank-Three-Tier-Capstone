function Withdraw() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [withdraw, setWithdraw] = React.useState(0);

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

  function handleWithdraw(e) {
    e.preventDefault();
    console.log(withdraw);

    if (!validate(withdraw, "Please Enter Valid Amount")) return;
    else {
      if (withdraw > currentUser.balance) {
        alert("Insufficient Funds Available");
        return;
      } else if (withdraw <= 0 || isNaN(withdraw)) {
        alert("Please Enter Valid Amount");
        return;
      }
    }

    const newUsers = ctx.state.users.reduce((res, user) => {
      if (user.email === currentUser.email) {
        user.balance = Number(user.balance) - Number(withdraw);
        console.log("Current balance", user.balance);
      }
      res.push(user);
      return res;
    }, []);
    ctx.setState({ ...ctx.state, users: newUsers });
    ctx.addAudit({ action: "withdrawal", email: currentUser.email, data: { withdraw } });
    
    
    setShow(false);
  }

  function clearForm() {
    setWithdraw(0);
    setShow(true);
  }

  if (!currentUser) return <Card bgcolor="danger" body="Must Login To Continue"></Card>;

  const totalBalance = `Current Balance $ ${currentUser.balance}`;

  return (
    <Card
      bgcolor="info"
      header="Make a Withdrawal"
      status={status}
      body={
        show ? (
          <form onSubmit={handleWithdraw}>
            <h5> {totalBalance} </h5>
            <br />
            <br />
            Withdraw Amount
            <br />
            <input
              type="input"
              className="form-control"
              id="withdraw"
              placeholder="Amount"
              value={withdraw}
              onChange={(e) => setWithdraw(e.currentTarget.value)}
            />
            <br />
            <button type="submit" className="btn btn-light" disabled={!withdraw}>
              Submit Withdrawal
            </button>
          </form>
        ) : (
          <>
            <h5>Success, Current balance $ {currentUser.balance}</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              Make Another Withdrawal
            </button>
          </>
        )
      }
    />
  );
}
