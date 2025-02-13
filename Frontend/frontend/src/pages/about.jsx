import React from 'react';
import me from '../assets/hitanshu.png'; // Ensure this is a properly optimized image

const About = () => {
  return (
    <div className="container bg-white dark:bg-[#212121]  text-black dark:text-white mx-auto py-12 px-4">
      {/* About Me */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold mb-8 text-center md:text-left">About Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <img
              src={me} // Replace with your optimized image
              alt="Hitanshu Gala"
              className="rounded-full shadow-md w-64 h-64 object-cover" // Adjust size as needed
              loading="lazy" // Enables lazy loading
            />
          </div>
          <div>
            <p className="text-lg  mb-4">
              Hi, I'm Hitanshu Gala, a passionate and driven individual with a keen interest in artificial intelligence and technology. I'm an IT undergad at DJSCE and a strong desire to leverage technology to solve complex problems.
            </p>
            
            <div className="mt-6">
              <a
                href="https://hitanshu-gala.vercel.app/" // Replace with your portfolio link
                className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-700 mr-4 transition-colors duration-300"
                target='blank'
              >
                Portfolio
              </a>
              <a
                href="https://www.linkedin.com/in/hitanshugala/" // Replace with your LinkedIn link
                className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-700 mr-4 transition-colors duration-300"
                target='blank'
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/indra55" // Replace with your GitHub link
                className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors duration-300"
                target='blank'
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About the Project */}
      <section>
        <h2 className="text-4xl font-bold mb-8 text-center md:text-left">
          About the Project: QuantMosaic
        </h2>

        {/* Project Overview */}
        <h3 className="text-2xl font-semibold mb-4">Project Overview</h3>
        <p className="text-lg   mb-4">
          QuantMosaic is a multi-agent system designed to analyze financial
          markets and provide insightful investment recommendations. It leverages
          the CrewAI framework to orchestrate a team of specialized agents, each
          with a distinct role in the analysis process. These agents collaborate
          to gather data, perform fundamental and technical analysis, assess
          market sentiment, and generate price predictions. The ultimate goal is
          to provide users with data-driven investment insights.
        </p>

        {/* Core Technologies */}
        <h3 className="text-2xl font-semibold mb-4">Core Technologies</h3>
        <ul className="list-disc list-inside text-lg  mb-4">
          <li>
            <span className="font-semibold">CrewAI:</span> The core framework
            for building and managing the multi-agent system. CrewAI enables the
            agents to work together seamlessly, coordinating their efforts to
            achieve a common goal.
          </li>
          <li>
            <span className="font-semibold">Gemini (via LLM):</span> A powerful
            LLM used by agents for reasoning, data analysis, and report
            generation.
          </li>
          <li>
            <span className="font-semibold">Langchain:</span> Used for various
            natural language processing tasks.
          </li>
          <li>
            <span className="font-semibold">Alpha Vantage:</span> A provider of
            financial data used to fetch stock prices and market data.
          </li>
        </ul>

        {/* Agents */}
        <h3 className="text-2xl font-semibold mb-4">
          Key Agents and Their Roles in QuantMosaic
        </h3>
        <p className="text-lg  mb-4">
          QuantMosaic employs a diverse team of agents, each specializing in a
          specific aspect of financial analysis. These agents work together to
          provide a comprehensive and well-rounded investment analysis. The
          agents include:
        </p>
        <ul className="list-disc list-inside text-lg   mb-4">
          <li>
            <span className="font-semibold">Financial Data Collector:</span> This
            agent gathers data from various sources, including Alpha Vantage. The
            goal is to provide other agents with comprehensive financial data.
          </li>
          <li>
            <span className="font-semibold">Fundamental Analysis Expert:</span>
            This agent conducts in-depth fundamental analysis.
          </li>
          <li>
            <span className="font-semibold">Technical Analyst:</span> Performs
            technical analysis of the stock.
          </li>
          <li>
            <span className="font-semibold">Sentiment Analysis Specialist:</span>
            Analyzes market sentiment and public opinion towards the stock.
          </li>
          <li>
            <span className="font-semibold">Financial Forecasting Specialist:</span>
            Generates data-driven price predictions for the stock.
          </li>
          <li>
            <span className="font-semibold">Investment Research Director:</span>
            Creates a comprehensive investment analysis report.
          </li>
        </ul>

        {/* Workflow */}
        <h3 className="text-2xl font-semibold mb-4">Analysis Workflow</h3>
        <p className="text-lg  00 mb-4">
          The agents in QuantMosaic follow a structured workflow to ensure a
          thorough and efficient analysis:
        </p>
        <ol className="list-decimal list-inside text-lg   mb-4">
          <li>
            The <span className="font-semibold">Data Collector</span> gathers
            financial data.
          </li>
          <li>
            The <span className="font-semibold">Fundamental Analysis Expert</span>{' '}
            analyzes the company's financial health.
          </li>
          <li>
            The <span className="font-semibold">Technical Analyst</span> identifies
            trading opportunities and risks.
          </li>
          <li>
            The <span className="font-semibold">Sentiment Analysis Specialist</span>{' '}
            gauges market sentiment.
          </li>
          <li>
            The <span className="font-semibold">Forecasting Specialist</span>{' '}
            generates price predictions.
          </li>
          <li>
            Finally, the <span className="font-semibold">Reporting Agent</span>{' '}
            creates a comprehensive investment analysis report.
          </li>
        </ol>

        {/* Conclusion */}
        <h3 className="text-2xl font-semibold mb-4">Conclusion</h3>
        <p className="text-lg  ">
          QuantMosaic is a powerful tool that demonstrates the potential of
          multi-agent systems and AI to revolutionize financial analysis. By
          integrating diverse data sources, analytical techniques, and expert
          knowledge, QuantMosaic provides users with valuable insights to make
          informed investment decisions.
        </p>
      </section>
    </div>
  );
};

export default About;
