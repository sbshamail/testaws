export const DancingText = ({ text = "This may take a moment." }) => (
  <span className="flex gap-[1px]">
    {text.split("").map((char, i) => (
      <span
        key={i}
        className="inline-block animate-dance"
        style={{ animationDelay: `${i * 100}ms` }}
      >
        {char}
      </span>
    ))}
  </span>
);
