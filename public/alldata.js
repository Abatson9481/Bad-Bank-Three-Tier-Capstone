function AuditEntry({ data }) {
  return (
    <div>
      <Card
        bgcolor="info"
        title={data.action}
        text={"Completed By " + (data.email || "User")}
        body={"At " + new Date(data.timestamp).toLocaleString()}
        status={data.data && "Action: " + JSON.stringify(data.data)}
      />
    </div>
  );
}

function AllData() {
   const ctx = useUserContext();

  if (!ctx.state.audit.length) return <Card bgcolor="info" body="Current data: (empty)" />;

  return ctx.state.audit.map((data, i) => <AuditEntry key={i} data={data}></AuditEntry>);


}