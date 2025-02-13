import os
from langchain.tools import tool
from langchain.utilities import AlphaVantageAPIWrapper

@tool
def fetch_stock_data(ticker: str):
    """
    Fetch daily stock market data for a given ticker using the AlphaVantage API.
    :param ticker: Stock ticker symbol (e.g., "AAPL").
    :return: Dictionary containing daily stock data.
    """
    api_key = os.getenv("ALPHAVANTAGE_API_KEY")
    if not api_key:
        return {"error": "AlphaVantage API key is missing. Set ALPHAVANTAGE_API_KEY in environment variables."}
    try:
        alpha_vantage = AlphaVantageAPIWrapper(alphavantage_api_key=api_key)
        data = alpha_vantage._get_time_series_daily(ticker)
        return data
    except Exception as e:
        return {"error": str(e)}

# New Tool Implementation
@tool
def calculate_financial_metrics(stock_data: dict) -> dict:
    """
    Calculates key financial metrics based on AlphaVantage stock data.
    Required keys (from AlphaVantage Overview):
    - 'RevenueTTM'
    - 'EPS'
    - 'MarketCapitalization'
    - 'SharesOutstanding'
    - 'DividendPerShare' (optional; defaults to 0 if missing)
    Optionally, if 'ReturnOnEquityTTM' is provided, it is also included.
    """
    try:
        # Convert key values from strings to floats
        revenue = float(stock_data.get('RevenueTTM'))
        eps = float(stock_data.get('EPS'))
        market_cap = float(stock_data.get('MarketCapitalization'))
        shares_outstanding = float(stock_data.get('SharesOutstanding'))
        dividends_per_share = float(stock_data.get('DividendPerShare', 0))

        # Validate critical values
        if shares_outstanding == 0:
            raise ValueError("Shares Outstanding cannot be zero.")
        if eps == 0:
            raise ValueError("EPS cannot be zero for P/E calculation.")

        # Estimate current price as market_cap / shares_outstanding
        current_price = market_cap / shares_outstanding

        # Calculate P/E Ratio (price-to-earnings): current_price / EPS
        pe_ratio = current_price / eps

        # Earnings Yield (%): (EPS / current_price) * 100
        earnings_yield = (eps / current_price) * 100

        # Dividend Payout Ratio (%): (DividendPerShare / EPS) * 100
        dividend_payout_ratio = (dividends_per_share / eps) * 100

        metrics = {
            'P/E Ratio': pe_ratio,
            'Earnings Yield (%)': earnings_yield,
            'Dividend Payout Ratio (%)': dividend_payout_ratio,
            'Current Price (approx.)': current_price,
            'Revenue (TTM)': revenue,
            'EPS': eps,
            'Market Capitalization': market_cap,
            'Shares Outstanding': shares_outstanding
        }

        # Optionally include Return on Equity (ROE) if provided by AlphaVantage
        roe = stock_data.get('ReturnOnEquityTTM')
        if roe is not None:
            # AlphaVantage typically returns ROE as a decimal (e.g., 0.23 for 23%)
            metrics['Return on Equity (%)'] = float(roe) * 100
        return metrics
    except (TypeError, ValueError) as ve:
        return {"error": f"Invalid financial data: {str(ve)}"}
    except Exception as e:
        return {"error": f"An error occurred while calculating metrics: {str(e)}"}
