const payouts = [
  { combo: '💯 💯 💯', multiplier: 'x100' },
  { combo: '🎓 🎓 🎓', multiplier: 'x50' },
  { combo: '🔥 🔥 🔥', multiplier: 'x25' },
  { combo: '🧠 🧠 🧠', multiplier: 'x15' },
  { combo: '📚 📚 📚', multiplier: 'x10' },
  { combo: '✏️ ✏️ ✏️', multiplier: 'x8' },
  { combo: '❌ ❌ ❌', multiplier: 'x0' },
];

const PayoutTable = () => {
  return (
    <div className="payout-table">
      <h3>Таблица выигрышей</h3>
      <div className="payout-grid">
        {payouts.map((item, idx) => (
          <div className="payout-item" key={idx}>
            <span>{item.combo}</span>
            <span className="multiplier">{item.multiplier}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PayoutTable;
