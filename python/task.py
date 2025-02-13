# tasks.py
from crewai import Task
from textwrap import dedent

class FinancialAnalysisTasks:
    def __init__(self, stock: str, agents):
        self.stock = stock
        self.agents = agents
        self.report_sections = {}

    def data_collection_task(self):
        return Task(
            description=dedent(f"""
                Collect and organize all necessary financial data for {self.stock}.
                
                1.  Use the `fetch_stock_data` tool to retrieve the following:
                    *   Current price
                    *   Trading volume 
                    *   Market capitalization
                    *   Revenue (historical and projected)
                    *   Net income (historical and projected)
                    *   Balance sheet items (assets, liabilities, equity)
                    *   Key financial ratios (P/E, ROE, Debt-to-Equity)
                2.  Use the `SerperDevTool` to search for recent news articles, financial reports, and analyst ratings related to {self.stock}.
                3.  If necessary, use the `ScrapeWebsiteTool` to extract data from relevant websites found via search.
                4.  List the specific data points required by the Fundamental Analysis, Technical Analysis, and Sentiment Analysis agents.
                
                Your output MUST be a well-organized data package with all the requested information in a clear and structured format.
                Do NOT perform any analysis in this task.  Focus SOLELY on data collection.
                If you cannot find a specific data point, indicate that in your report.
            """),
            agent=self.agents.create_data_collector_agent(self.stock),
            expected_output="A comprehensive data package with all the requested financial data and a clear list of data requirements for the other agents."
        )

    def fundamental_analysis_task(self):
        return Task(
            description=dedent(f"""
                Conduct a fundamental analysis of {self.stock} based ONLY on the data provided by the Data Collector.
                
                1.  Calculate and interpret the following financial ratios:
                    *   P/E ratio
                    *   ROE (Return on Equity)
                    *   Debt-to-Equity ratio
                    *   Profit Margin
                2.  Analyze growth trends using historical data and future projections (if available).
                3.  Assess the company's competitive advantages, using specific examples and data points.
                4.  Identify and quantify any notable risks, such as high debt levels or declining revenue.
                5.  Use competitor data for benchmark analysis, comparing key ratios and metrics.
                
                Your analysis MUST be based on the data collected and organized by the Data Collector. Provide specific numerical values and comparisons in your analysis.
                Format as a 'Fundamental Analysis' section for the report. Include a summary of the company's financial health and a clear assessment of its intrinsic value.
            """),
            agent=self.agents.create_fundamental_analysis_agent(self.stock),
            context=[self.data_collection_task()],
            expected_output="An in-depth fundamental analysis based on the provided data, including calculated ratios, growth trends, competitive advantages, quantified risks, and a clear assessment of intrinsic value."
        )

    def technical_analysis_task(self):
        return Task(
            description=dedent(f"""
                Perform a technical analysis of {self.stock} using the data provided by the Data Collector.
                
                1.  Identify key technical indicators, such as:
                    *   RSI (Relative Strength Index) - provide the current value and interpretation
                    *   MACD (Moving Average Convergence Divergence) - provide the current value and interpretation
                    *   Moving averages (e.g., 50-day, 200-day) - provide the current values and interpretation
                2.  Present risk metrics, such as Beta and volatility.
                3.  Analyze price trends with historical data, identifying support and resistance levels.
                4.  Include volume analysis, looking for patterns and trends.
                
                Your analysis MUST be based on the data collected and organized by the Data Collector. Provide specific chart patterns and indicator values in your analysis.
                Format as a 'Technical Analysis' section for the report. Include a summary of the technical outlook for the stock.
            """),
            agent=self.agents.create_technical_analysis_agent(self.stock),
            context=[self.data_collection_task()],
            expected_output="A detailed technical analysis based on the provided data, including specific indicator values, risk metrics, price trends, volume analysis, and a summary of the technical outlook."
        )

    def sentiment_analysis_task(self):
        return Task(
            description=dedent(f"""
                Analyze market sentiment and public opinion towards {self.stock}.
                
                1.  Monitor news articles, social media, and investor forums using the `SerperDevTool` and `ScrapeWebsiteTool`.
                2.  Gauge the overall sentiment (positive, negative, neutral) and its potential impact on the stock price.
                3.  Identify any irrational market movements or sentiment-driven anomalies.
                4.  Quantify sentiment where possible (e.g., percentage of positive articles vs. negative articles, sentiment scores from financial news websites).
                
                Format as a 'Sentiment Analysis' section for the report. Include specific examples of news headlines or social media posts that reflect the overall sentiment. Also, quantify sentiment using any available metrics.
            """),
            agent=self.agents.create_sentiment_analysis_agent(self.stock),
            context=[self.data_collection_task()],
            expected_output="A sentiment analysis report that gauges overall market sentiment, identifies potential impacts on the stock price, and quantifies sentiment where possible, including specific examples."
        )

    def prediction_task(self):
        return Task(
            description=dedent(f"""
                Generate well-reasoned and data-driven price predictions and outlook for {self.stock}.
                
                1.  Provide a short-term outlook (1-3 months) with specific price targets.
                2.  Develop a medium-term outlook (6-12 months) using historical data trends.
                3.  Identify key catalysts and potential risks that could impact the stock price.
                4.  Integrate insights from the Fundamental Analysis, Technical Analysis, and Sentiment Analysis.
                5.  Use the `SerperDevTool` to research analyst ratings and price targets.
                
                Format as a 'Future Outlook' section for the report. Justify your predictions with data and analysis from the other agents. Provide a confidence level for your predictions.
            """),
            agent=self.agents.create_prediction_agent(self.stock),
            context=[
                self.data_collection_task(),
                self.fundamental_analysis_task(),
                self.technical_analysis_task(),
                self.sentiment_analysis_task()
            ],
            expected_output="A future outlook with short-term and medium-term predictions, including price targets, catalysts, risks, a confidence level, and justification based on the other analyses."
        )

    def final_report_task(self):
        return Task(
            description=dedent(f"""
                Create a comprehensive and actionable investment analysis report for {self.stock}.
                
                1.  Compile and synthesize all previous analyses into a single cohesive report.
                2.  Write an Executive Summary that highlights key findings and provides a clear investment recommendation.
                3.  Present the Market Position, Financial Analysis, Technical Analysis, Sentiment Analysis, and Future Outlook sections using the information provided by the other agents.
                4.  Provide a clear buy/hold/sell recommendation based on the collective findings.  Include a target price and a time horizon for achieving that price.
                
                Ensure all claims are supported by data from previous analyses. The report should be data-driven and include as many concrete numerical details as possible.  The report MUST be well-formatted and easy to read.
            """),
            agent=self.agents.create_reporting_agent(self.stock),
            context=[
                self.data_collection_task(),
                self.fundamental_analysis_task(),
                self.technical_analysis_task(),
                self.sentiment_analysis_task(),
                self.prediction_task()
            ],
            expected_output="A well-structured, data-driven, and actionable investment analysis report with a clear investment recommendation, target price, and time horizon."
        )

    def get_all_tasks(self):
        """Returns all tasks in the correct execution order"""
        return [
            self.data_collection_task(),
            self.fundamental_analysis_task(),
            self.technical_analysis_task(),
            self.sentiment_analysis_task(),
            self.prediction_task(),
            self.final_report_task()
        ]
