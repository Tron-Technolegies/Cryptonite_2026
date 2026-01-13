import { useEffect, useRef, useState } from "react";

const SectionHeading = ({ children, color = "var(--primary-color)" }) => {
  const ref = useRef(null);
  const [draw, setDraw] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger when the element is visible
        if (entry.isIntersecting) {
          setDraw(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className="relative inline-block px-1">
      <span className="relative z-10">{children}</span>

      <svg
        className="absolute left-0 w-full overflow-visible"
        // bottom: -10px creates the distance from the text
        style={{ bottom: "-10px", height: "14px" }}
        viewBox="0 0 200 20"
        fill="none"
        preserveAspectRatio="none"
      >
        {/* Main Sketchy Path */}
        <path
          d="M2,15 C50,5 150,25 198,12"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          style={{
            strokeDasharray: 200,
            strokeDashoffset: draw ? 0 : 200,
            transition: "stroke-dashoffset 0.8s ease-in-out",
          }}
        />

        {/* Secondary Texture Path (Drawn slightly slower) */}
        <path
          d="M5,17 C60,10 140,20 195,15"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{
            opacity: 0.5,
            strokeDasharray: 200,
            strokeDashoffset: draw ? 0 : 200,
            transition: "stroke-dashoffset 1.1s ease-in-out",
            transitionDelay: "0.1s",
          }}
        />
      </svg>
    </span>
  );
};

export default SectionHeading;
