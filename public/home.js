function Home() {
  return (
    <div className="text-center">
      <Card
        bgcolor="info"
        txtcolor="white"
        header="Amy's Pretty Bad Bank"
        title="Welcome to my pretty, but Bad Bank!"
        text=""
        body={<img src="bank.png" className="img-fluid" alt="Responsive image" />}
      />
    </div>
  );
}