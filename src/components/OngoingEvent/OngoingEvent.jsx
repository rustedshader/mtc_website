import React from "react";
import "./onevent.css";
import Countdown from "react-countdown";

const OngoingEvent = () => {
  return (
    <div className="one-event">
      <div className="one-wrapper">
        <h1 className="one-counter">
          <Countdown date={new Date("Thu 6 February 2025 10:00:00").getTime()}></Countdown>
        </h1>
        <h1 className="one-heading">Logic Maze</h1>
        <div className="one-content-wrapper">
          <img src="/Assets/logicmaze.jpeg" alt="" className="one-img" style={{ marginRight: '2rem' }} />
          <div>
            <p className="one-content">
              <h1>Logic Maze: </h1>
              <p style={{ fontSize: "20px" }}><b>Get ready to put your coding and technical skills to the ultimate test!</b></p>
              <p>Join the thrilling two-stage competition for a chance to win exciting cash prizes and prove your problem-solving prowess.</p>
              
              <p style={{ fontSize: "20px" }}><b>About Event</b></p>
              <p style={{ fontSize: "18px" }}><b>Round 1: Coding Challenge, Debugging, & Automata Fix</b></p>
              <p>Participants will tackle a series of challenging coding problems, debugging tasks, and automata-related fixes. Each task is weighted based on its difficulty, so be strategic to maximize your score! Whether you're a coding prodigy or a debugging master, this round will push your skills to the limit.</p>
              
              <p style={{ fontSize: "18px" }}><b>Round 2: Technical Quiz</b></p>
              <p>The top eight contestants from Round 1 will advance to an intense technical quiz. This round combines in-depth technical questions and stimulating trivia, designed to challenge both your knowledge and your quick thinking. Only the sharpest minds will secure a spot at the top!</p>
              
              <p style={{ fontSize: "20px" }}><b>Prizes:</b></p>
              <p>🏆 Winner: Rs. 2500 Cash Prize</p>
              <p>🥈 1st Runner-Up: Rs. 1500 Cash Prize</p>
              
              <p style={{ fontSize: "20px" }}><b>Event Dates & Timings:</b></p>
              <p>🕒 Round 1: 6th February 2025 | 10:00 AM - 12:00 PM</p>
              <p>🕒 Round 2: 7th February 2025 | 3:00 PM - 5:00 PM</p>
              
              <p style={{ fontSize: "20px" }}><b>For more details, contact:</b></p>
              <p>📞 Hardik Raj Kapoor (IO): 9076698002</p>
              <p>📞 Vedanshi Samant (JS): 6394888851</p>
            </p>
            <button className="one-button">
              <a>Register Now</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default OngoingEvent;
