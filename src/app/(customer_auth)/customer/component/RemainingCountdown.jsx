import React from "react";
import Countdown from "react-countdown";

const RemainingCountdown = ({ targetDate }) => {
  // const targetDate = Date.now() + 15 * 24 * 60 * 60 * 1000;
  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col text-center">
      <span className="text-primary">{value}</span>
      <span>{label}</span>
    </div>
  );
  const renderer = ({ days, hours, minutes, seconds }) => (
    <span className="text-sm font-medium flex gap-2 items-center">
      <div className="flex bg-primary text-white p-2 rounded">Valid</div>
      <div className="flex items-center gap-2">
        <TimeUnit value={days} label="DAYS" />
        <TimeUnit value={hours} label="HRS" />
        <TimeUnit value={minutes} label="MIN" />
        <TimeUnit value={seconds} label="SEC" />
      </div>
    </span>
  );
  return <Countdown date={targetDate} renderer={renderer} />;
};

export default RemainingCountdown;
