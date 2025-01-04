import React, { useEffect, useState } from "react";
import "./style.scss";
import { addBalance, withdrawBalance, fetchTransactions } from "../../Service/wallet.Service";
import FooterComponent from "../../components/footer";
import { getUserProfile } from "../../Service/getUserProfile";
import { toast } from "react-toastify";

const WalletPage = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState("");
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  // Fetch user profile to get the balance
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        if (response?.data?.balance !== undefined) {
          setBalance(response.data.balance / 100); // Assuming balance is in paisa
        }
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
      }
    };

    fetchUserProfile();
  }, []);

  // Fetch transactions
  useEffect(() => {
    const fetchAllTransactions = async () => {
      try {
        const data = await fetchTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error.message);
      }
    };

    fetchAllTransactions();
  }, []);

  const handleActionChange = (newAction) => {
    setAction(newAction);
    setAmount(""); // Clear the input field when switching actions
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    const numericAmount = Number(amount);

    if (action === "withdraw" && numericAmount > balance) {
      toast.error("Insufficient balance.");
      return;
    }

    setLoading(true);
    try {
      if (action === "add") {
        const response = await addBalance(numericAmount);
        if (response?.success) {
          const addedAmount = response?.order?.amount || numericAmount;
          setBalance((prevBalance) => prevBalance + addedAmount / 100);
          setAmount("");
        }
      } else if (action === "withdraw") {
        const response = await withdrawBalance(numericAmount);
        if (response?.statusCode === 200 && response?.error === false) {
          setBalance((prevBalance) => prevBalance - numericAmount);
          setAmount("");
        }
      }
    } catch (error) {
      console.error(`Error processing ${action} action:`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mobile-container">
      {/* Header */}
      <header className="mobile-header">
        <h2>Wallet</h2>
      </header>

      {/* Display Current Balance */}
      <div className="balance-info">
        <h4>Balance:</h4>
        <p>₹{balance.toFixed(2)}</p>
      </div>

      {/* Action Buttons */}
      <div className="button-group">
        <button
          className={`action-btn ${action === "add" ? "active" : ""}`}
          onClick={() => handleActionChange("add")}
        >
          Add Money
        </button>
        <button
          className={`action-btn ${action === "withdraw" ? "active" : ""}`}
          onClick={() => handleActionChange("withdraw")}
        >
          Withdraw Money
        </button>
      </div>

      {action && (
        <form onSubmit={handleSubmit} className="edit-profile-form">
          <div className="form-group">
            <label className="label-color">
              {action === "add" ? "Add Amount" : "Withdraw Amount"}
            </label>
            <input
              type="number"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`Enter amount to ${action}`}
              required
            />
          </div>
          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? "Processing..." : action === "add" ? "Pay Now" : "Withdraw"}
          </button>
        </form>
      )}

      {/* Transactions Section */}
      <section className="transactions-section">
        <h4>Transaction History</h4>
        {transactions.length > 0 ? (
          <ul>
            {transactions.map((transaction) => (
              <li key={transaction._id}>
                <p>
                  <strong>Amount:</strong> ₹{(transaction.amount / 100).toFixed(2)}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(transaction.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No Results Found</p>
        )}
      </section>

      <FooterComponent />
    </div>
  );
};

export default WalletPage;
