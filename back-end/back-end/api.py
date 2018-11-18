import os
from flask import Flask
from utils import csv_file_to_json

app = Flask(__name__)

@app.route('/housing_prices', methods=['GET'])
def index():
    return csv_file_to_json('../data/ex1data1.txt')

if __name__ == '__main__':
    app.run(debug=True)
