export default async function VerifyPayment() {
  const payment_not_verfied_users = await fetch(
    "http://localhost:3000/api/user/get-payment-not-verified-users"
  );
  const payment_pending_users_json = await payment_not_verfied_users.json();
  console.log(payment_pending_users_json);
  return (
    <div>
      <h1>Verify Payment</h1>
      <p>Here you can see all the users who have not verified their payment</p>
      {payment_pending_users_json.map((user: any) => (
        <div key={user.id}>
          <h2>{user.student_name}</h2>
          <a href={`/admin/dashboard/verify-payment/${user.mtc_id}`}>
            Click Here
          </a>
        </div>
      ))}
    </div>
  );
}
