import os
from flask import Flask, request, jsonify
import numpy as np
from utils import csv_file_to_json
from ml import compute_cost, gradient_descent

app = Flask(__name__)

@app.route('/housing_prices', methods=['GET'])
def housing_prices():
    return csv_file_to_json('../data/ex1data1.txt')

@app.route('/housing_prices/compute_cost', methods=['POST'])
def cost_func():
    request_data = request.get_json()
    data = np.array(request_data['data'])
    theta = np.array(request_data['theta'])
    ones = np.ones(data.shape[0])
    x = np.array(data[:, 0])
    X = np.column_stack((ones, x))
    y = np.array(data[:, 1])
    J = compute_cost(X, y, theta)

    return jsonify({'cost': J.tolist()})

@app.route('/housing_prices/gradient_descent', methods=['POST'])
def grad_desc():
    request_data = request.get_json()
    data = np.array(request_data['data'])
    theta = np.array(request_data['theta'])
    ones = np.ones(data.shape[0])
    x = np.array(data[:, 0])
    X = np.column_stack((ones, x))
    y = np.array(data[:, 1])
    # J_history = gradient_descent(X, y, theta, alpha, num_iters)

    return jsonify({'grad_desc': X.tolist()})



if __name__ == '__main__':
    app.run(debug=True)
