import React, { useState, useEffect } from 'react';
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';
import Confetti from 'react-confetti';
import ss from '../assets/stockguy.png';
import crewailogo from '../assets/crewailogo.png';
import langchainlogo from '../assets/langchainlogo.png';
import geminilogo from '../assets/geminilogo.png';

const WorkspaceLanding = () => {
  const [ticker, setTicker] = useState('');
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showChart, setShowChart] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // Update window size when window is resized
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle confetti timeout
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 8000); // Run confetti for 5 seconds

      return () => clearTimeout(timer);
    }
  }, [showConfetti]);
 
  const handleAnalyze = async () => {
    if (!ticker.trim()) {
      setError('Please enter a stock ticker');
      return;
    }

    setLoading(true);
    setError('');
    setReport('');
    setShowChart(true);
    setShowConfetti(false);
 
    try {
      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ticker: ticker.trim().toUpperCase() }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      setReport(data.report);
      setShowConfetti(true); // Trigger confetti when report is received
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to clean markdown text
  const cleanMarkdown = (text) => {
    return text
      .replace(/\n/g, '<br />')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/#{3} (.*?)\n/g, '<h3>$1</h3>')
      .replace(/#{2} (.*?)\n/g, '<h2>$1</h2>')
      .replace(/# (.*?)\n/g, '<h1>$1</h1>')
      .replace(/- (.*?)(?:\n|$)/g, '<li>$1</li>')
      .replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>');
  };

  return (
<div className="max-w-6xl mx-auto px-4 py-12 relative bg-white dark:bg-[#212121]  text-black dark:text-white">
{/* Confetti overlay */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={true}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}

      {/* Rest of your component stays exactly the same */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
        {/* ... Hero Section (same as before) ... */}
        <div className="flex-1">
          <h1 className="text-5xl font-bold  mb-4">
            The Best Investment Guide!
          </h1>
          <p className="text-xl   mb-2">
            Analyze. Predict. Invest. With a little help from AI.
          </p>
          <p className="text-0.5xl   mb-8">
            A Multi-Agentic Crew to get the best Results!
          </p>
          <div className="flex gap-2 w-full max-w-xl">
            <input 
              type="text" 
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              placeholder="Enter stock ticker (e.g., AAPL)"
              className="flex-1 px-4 py-2 border rounded-md bg-white dark:bg-[#212121]  text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-200 hover:text-black  whitespace-nowrap disabled:opacity-50"
              onClick={handleAnalyze}
              disabled={loading}
            >
              {loading ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>
          
          {/* Made with Section */}
          <div className="mt-12">
            <p className="text-gray-500 mb-4">Made with</p>
            <div className="flex items-center gap-8">
              {/* CrewAI Icon */}
              <div className="flex items-center">
                <img 
                  src={crewailogo}
                  alt="CrewAI"
                  className="w-12 h-5"
                />
                <span className="ml-2 font-bold">CrewAI</span>
              </div>
              
              {/* LangChain Icon */}
              <div className="flex items-center">
                <img 
                  src={langchainlogo} 
                  alt="LangChain"
                  className="w-8 h-8"
                />
                <span className="ml-2 font-bold">LangChain</span>
              </div>
              
              {/* Gemini Icon */}
              <div className="flex items-center">
                <img 
                  src={geminilogo}
                  alt="Gemini"
                  className="w-8 h-8"
                />
                <span className="ml-2 font-bold">Gemini</span>
              </div>
              
              {/* Pixelated Heart */}
              <div className="flex items-center">
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                  {/* ... Heart SVG content (same as before) ... */}
                  <rect x="8" y="6" width="2" height="2" fill="#FF4081"/>
                  <rect x="10" y="6" width="2" height="2" fill="#FF4081"/>
                  <rect x="14" y="6" width="2" height="2" fill="#FF4081"/>
                  <rect x="16" y="6" width="2" height="2" fill="#FF4081"/>
                  <rect x="6" y="8" width="2" height="2" fill="#FF4081"/>
                  <rect x="8" y="8" width="2" height="2" fill="#FF4081"/>
                  <rect x="10" y="8" width="2" height="2" fill="#FF4081"/>
                  <rect x="12" y="8" width="2" height="2" fill="#FF4081"/>
                  <rect x="14" y="8" width="2" height="2" fill="#FF4081"/>
                  <rect x="16" y="8" width="2" height="2" fill="#FF4081"/>
                  <rect x="18" y="8" width="2" height="2" fill="#FF4081"/>
                  <rect x="8" y="10" width="2" height="2" fill="#FF4081"/>
                  <rect x="10" y="10" width="2" height="2" fill="#FF4081"/>
                  <rect x="12" y="10" width="2" height="2" fill="#FF4081"/>
                  <rect x="14" y="10" width="2" height="2" fill="#FF4081"/>
                  <rect x="16" y="10" width="2" height="2" fill="#FF4081"/>
                  <rect x="10" y="12" width="2" height="2" fill="#FF4081"/>
                  <rect x="12" y="12" width="2" height="2" fill="#FF4081"/>
                  <rect x="14" y="12" width="2" height="2" fill="#FF4081"/>
                  <rect x="12" y="14" width="2" height="2" fill="#FF4081"/>
                </svg>
                <span className="ml-2 font-bold">Love</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={ss}
            alt="Investment Analysis"
            className="rounded-lg max-w-full h-auto dark:invert"
            />
        </div>
      </div>

      {/* Stock Chart Section */}
      {showChart && (
        <div className="mb-8 bg-white rounded-lg shadow-lg">
          <div className="flex items-center bg-white dark:bg-[#313131]  text-black dark:text-white justify-between p-4 border-b">
            <h2 className="text-xl  font-bold">{ticker} Stock Chart</h2>
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin  rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                <span >Analyzing... Check out the live chart while you wait!</span>
              </div>
            ) : (
              <div className='text-black' >Live Chart</div>
            )}
          </div>
          <div className="h-[400px] w-full">
            <AdvancedRealTimeChart
              symbol={ticker}
              theme="light"
              autosize
              hide_side_toolbar={false}
              allow_symbol_change={true}
              container_id="tradingview_chart"
            />
          </div>
        </div>
      )}

      {/* Report Display Section */}
      <div className="rounded-lg overflow-hidden shadow-xl bg-white dark:bg-gray-800">
  <div className="bg-gray-100 dark:bg-[#313131] p-2 border-b dark:border-gray-600">

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="flex-1 px-4">
              <div className="bg-white rounded-full py-1 px-4 text-center text-sm text-gray-500">
                Your Complete Analysis
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-[#313131] p-4 text-black dark:text-white">
        {error && (
            <div className="text-red-500 mb-4">
              {error}
            </div>
          )}
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4  ">Analyzing {ticker}...</p>
            </div>
          )}
          {report && (
            <div className="prose max-w-none text-black dark:text-white">
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: cleanMarkdown(report) 
                }}  
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceLanding;