import { useEffect, useState } from "react";

function Splash({ onFinish }) {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setFade(true), 1500);
    const timer2 = setTimeout(() => onFinish(), 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-700 ${
        fade ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* 🌌 Star Rain */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[1px] h-6 bg-[#FF3964]/40 animate-star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * -100}%`,
              animationDuration: `${1.5 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* 🔥 Logo */}
      <h1 className="text-5xl font-bold tracking-wide">
        <span className="text-[#FF3964] animate-glow">M</span>
        <span className="text-white">oiré</span>
      </h1>
    </div>
  );
}

export default Splash;