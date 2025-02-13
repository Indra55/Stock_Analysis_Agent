from agents import QAgents
from task import FinancialAnalysisTasks  # Make sure your task.py is in the same directory
from crewai import Crew
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/analyze', methods=['POST'])
def analyze_stock():
    try:
        data = request.get_json()
        ticker = data.get('ticker')

        if not ticker:
            return jsonify({'error': 'Ticker symbol is required'}), 400

        ticker = ticker.strip().upper()  # Sanitize input

        # --- CrewAI Logic ---
        agents = QAgents()
        tasks = FinancialAnalysisTasks(ticker, agents)

        crew = Crew(
            agents=[
                agents.create_data_collector_agent(ticker),
                agents.create_fundamental_analysis_agent(ticker),
                agents.create_technical_analysis_agent(ticker),
                agents.create_sentiment_analysis_agent(ticker),
                agents.create_prediction_agent(ticker),
                agents.create_reporting_agent(ticker)
            ],
            tasks=tasks.get_all_tasks(),
            verbose=True
        )

        final_report = crew.kickoff()

        return jsonify({
            'report': str(final_report),
            'message': 'Analysis complete'
        }), 200

    except Exception as e:
        print(f"Error: {str(e)}")  # Log the error for debugging
        return jsonify({'error': str(e)}), 500  # Return error with 500 status

if __name__ == '__main__':
    app.run(debug=True)
