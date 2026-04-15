import { useEffect, useRef } from 'react';

const ALL_SYMBOLS = ['📚', '✏️', '🧠', '🎓', '🔥', '💯', '❌'];

const Reel = ({ symbol, isSpinning }) => {
  const reelRef = useRef(null);

  useEffect(() => {
    if (!reelRef.current) return;
    const reel = reelRef.current;

    if (isSpinning) {
      reel.classList.add('spinning');
      reel.style.top = '0';
    } else {
      reel.classList.remove('spinning');
      const index = ALL_SYMBOLS.indexOf(symbol);
      if (index !== -1) {
        const offset = -index * 100;
        reel.style.top = `${offset}px`;
      }
    }
  }, [isSpinning, symbol]);

  return (
    <div className="slot">
      <div className="reel" ref={reelRef}>
        {ALL_SYMBOLS.map((sym, i) => (
          <div className="symbol" key={i}>
            {sym}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reel;
