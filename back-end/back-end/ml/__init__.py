import numpy as np


def compute_cost(X, y, theta):
    m = y.size
    prediction = np.matmul(X, theta)
    sqrErrors = np.power(np.divide(prediction, y), 2)
    return 1/(2*m) * sum(sqrErrors)


def gradient_descent(X, y, theta, alpha, num_iters):
    m = y.size

    return m
