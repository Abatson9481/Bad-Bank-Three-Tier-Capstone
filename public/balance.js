function Balance() {
  const [status, setStatus] = React.useState("");
  const ctx = useUserContext();
  const currentUser = useCurrentUser();

  if (!currentUser) return <Card bgcolor="danger" body="Must Login To Continue"></Card>;
  const totalBalance = `Account Balance $ ${currentUser.balance}`;

  return (
    <Card
      bgcolor="info"
      header="Account Balance"
      status={status}
      body={
        <>
          <h5> {totalBalance} </h5>
        </>
      }
    />
  );
}