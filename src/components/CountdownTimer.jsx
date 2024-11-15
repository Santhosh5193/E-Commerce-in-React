import React from "react";
import Countdown from "react-countdown";

const CountdownTimer = () => {
  const renderer = ({ hours, minutes, seconds }) => (
    <div className="flex lg:space-x-5 space-x-3">
      <span className="InterFont font-bold lg:text-[32px] text-[28px]">
        {hours < 10 ? `0${hours}` : hours}
      </span>
      <p className="text-2xl text-secondary font-semibold">:</p>
      <span className="InterFont font-bold lg:text-[32px] text-[28px]">
        {minutes < 10 ? `0${minutes}` : minutes}
      </span>
      <p className="text-2xl text-secondary font-semibold">:</p>
      <span className="InterFont font-bold lg:text-[32px] text-[28px]">
        {seconds < 10 ? `0${seconds}` : seconds}
      </span>
    </div>
  );

  return (
    <div className="Hours">
      <p className="PoppinsFont text-xs">Hours</p>
      <Countdown
        date={Date.now() + 24 * 60 * 60 * 1000} // Countdown for 24 hours from now
        renderer={renderer}
      />
    </div>
  );
};

export default CountdownTimer;
