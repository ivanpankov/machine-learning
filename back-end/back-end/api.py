import os
from flask import Flask, request, jsonify
import numpy as np
from utils import csv_file_to_json, get_file_path
from ml import compute_cost, gradient_descent, compute_hypothesis

app = Flask(__name__)


@app.route('/file', methods=['GET'])
def get_file():
    file_path = request.args.get('file')
    num_of_cols = int(request.args.get('num_of_cols'))
    data = np.loadtxt(get_file_path(
        '../data/{}'.format(file_path)), delimiter=',', unpack=True)

    if (num_of_cols < 3):
        x = data[1, :].reshape(-1, 1).tolist()
    x = data[0:num_of_cols - 1, :].T.tolist()
    y = data[num_of_cols - 1, :].reshape(-1, 1).tolist()

    return jsonify({'x': x, 'y': y})

# TODO: 
@app.route('/compute_cost', methods=['POST'])
def cost_func():
    # request_data = request.get_json()
    # x = np.array(request_data['x'])
    # y = np.array(request_data['y'])
    # theta = np.array(request_data['theta'])
    # ones = np.ones(data.shape[0])
    # x = np.array(data[:, 0])
    # X = np.column_stack((ones, x))
    # y = np.array(data[:, 1]).reshape((-1, 1))  # transpose vector
    # J = compute_cost(X, y, theta)

    return jsonify({})


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
    x = np.array(request_data['x'])
    ones = np.ones(x.shape[0]).reshape(-1, 1)
    X = np.column_stack((ones, x))
    y = np.array(request_data['y'])

    theta0_vals = np.linspace(-10, 10, num=100)
    theta1_vals = np.linspace(-1, 4, num=100)

    J_vals = np.zeros((theta0_vals.size, theta1_vals.size))

    for i in range(0, theta0_vals.size):
        for j in range(0, theta1_vals.size):
            theta = [[theta0_vals[i]], [theta1_vals[j]]]
            J_vals[i, j] = compute_cost(X, y, theta)

    return jsonify({'J': J_vals.T.tolist(), 'theta0': theta0_vals.tolist(), 'theta1': theta1_vals.tolist()})


@app.route('/normalize-features', methods=['POST'])
def normalize_features():
    request_data = request.get_json()
    x = np.array(request_data['x'])

    return jsonify(x.tolist())


if __name__ == '__main__':
    app.run(debug=True)
