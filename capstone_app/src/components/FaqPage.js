// FaqPage.js
import React, { useState } from 'react';
import "../FaqPage.css";

const FaqPage = () => {
  const Question = ({ question, answer }) => {
    const [showAnswer, setShowAnswer] = useState(false);
  
    const toggleAnswer = () => {
      setShowAnswer(prevShowAnswer => !prevShowAnswer);
      console.log('showAnswer:', !showAnswer); 
    }
  
    console.log('Rendering Question component, showAnswer:', showAnswer); 
  
    return (
      <div className="question">
        <div className="question-header" onClick={toggleAnswer}>
          <h3>{question}</h3>
          <span>{showAnswer ? '-' : '+'}</span>
        </div>
        {showAnswer && (
          <div className="answer">
            <p>{answer}</p>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="faq-page">
      <a href="/" className="home-button">Home</a>
      <h1>Frequently Asked Questions</h1>
      <Question
        question="What gardening services do you offer?"
        answer="We offer a range of gardening services including planting, landscaping, lawn care, flower bed maintenance, pruning, and garden cleanup."
      />
      <Question
        question="How often should I mow my lawn?"
        answer="The frequency of lawn mowing depends on various factors such as grass type, weather conditions, and growth rate. Generally, mowing once a week during the growing season is recommended."
      />
      <Question
        question="Do you provide snow shoveling services?"
        answer="Yes, we offer snow shoveling services to ensure safe and accessible pathways, driveways, and entrances during the winter months."
      />
      <Question
        question="What is driveway sealing, and why is it important?"
        answer="Driveway sealing involves applying a protective coating to asphalt or concrete driveways to protect them from damage caused by moisture, UV rays, and harsh weather conditions. It helps prolong the lifespan of the driveway and enhances its appearance."
      />
      <Question
        question="How can I schedule your services?"
        answer="You can schedule our services by contacting us through our website, phone, or email. We will work with you to find a convenient time for service delivery."
      />
      <Question
        question="Do you offer maintenance packages for ongoing lawn care and gardening?"
        answer="Yes, we offer maintenance packages tailored to your specific needs, including weekly or bi-weekly lawn mowing, seasonal garden cleanup, and regular maintenance services to keep your outdoor space looking its best."
      />
      <Question
        question="What types of plants are suitable for my garden?"
        answer="The suitability of plants depends on factors such as your location, soil type, sunlight exposure, and climate conditions. Our expert gardeners can help you choose the right plants for your garden based on these factors."
      />
      <Question
        question="How soon can I expect my driveway to be sealed after scheduling the service?"
        answer="The timing of driveway sealing depends on factors such as weather conditions and our current schedule. We will work with you to find a suitable time for the service and provide you with an estimated timeframe for completion."
      />
      <Question
        question="Do you offer organic lawn care options?"
        answer="Yes, we offer organic lawn care options for customers who prefer environmentally friendly and chemical-free solutions for their outdoor spaces. Our organic lawn care services include natural fertilization, weed control, and pest management."
      />
      <Question
        question="What measures do you take to ensure safety during snow shoveling?"
        answer="Our snow shoveling team follows safety protocols to minimize risks during snow removal activities. We use proper equipment, wear protective gear, and prioritize safety precautions to ensure a safe and efficient snow removal process."
      />
      
    </div>
  );
}

export default FaqPage;

