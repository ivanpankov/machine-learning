import os
from flask import Flask, request, jsonify
import numpy as np
from utils import csv_file_to_json, get_file_path
from ml import compute_cost, gradient_descent, compute_hypothesis

app = Flask(__name__)


@app.route('/file', methods=['GET'])
def get_file():
    file_path = request.args.get('file')
    x, y = np.loadtxt(get_file_path('../data/{}'.format(file_path)), delimiter=',', unpack=True)
    x = x.reshape(-1,1).tolist()
    y = y.reshape(-1,1).tolist()
    return jsonify({'x': x, 'y': y})


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
    y = np.array(data[:, 1]).reshape((-1, 1))  # transpose vector
    J = compute_cost(X, y, theta)

    return jsonify({'cost': J.tolist()})


@app.route('/gradient-descent-uni', methods=['POST'])
def grad_desc_uni():
    request_data = request.get_json()
    initial_theta = np.array(request_data['initial_theta'])
    alpha = request_data['alpha']
    num_iters = request_data['num_iters']
    x = np.array(request_data['x'])
    ones = np.ones(x.shape[0]).reshape(-1, 1)
    X = np.column_stack((ones, x))
    y = np.array(request_data['y'])
    theta = gradient_descent(X, y, initial_theta, alpha, num_iters)

    return jsonify(theta)


@app.route('/hypothesis', methods=['POST'])
def hypothesis():
    request_data = request.get_json()
    theta = np.array(request_data['theta'])
    x = np.array(request_data['x'])
    ones = np.ones(x.shape[0]).reshape(-1, 1)
    X = np.column_stack((ones, x))
    hypo = compute_hypothesis(X, theta)
    return jsonify(hypo)

@app.route('/cost-surface', methods=['POST'])
def const_surface():
    request_data = request.get_json()
    # theta = np.array(request_data['theta'])
    # x = np.array(request_data['x'])
    # ones = np.ones(x.shape[0]).reshape(-1, 1)
    # X = np.column_stack((ones, x))
    # hypo = compute_hypothesis(X, theta)
    return jsonify({'blah': 23})


if __name__ == '__main__':
    app.run(debug=True)
