export default function SuccessPage() {
  return (
    <main className="success-page">
      <div className="success-card">
        <span className="success-badge">Order placed</span>
        <h1>Thank you for shopping with Velora.</h1>
        <p>Your order has been received and is now being prepared with care.</p>
        <a href="/" className="primary-btn success-link">
          Continue shopping
        </a>
      </div>
    </main>
  );
}
