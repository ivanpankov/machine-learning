import numpy as np


def compute_hypothesis(X, theta):
    return (X@theta).tolist()


def compute_cost(X, y, theta):
    m = len(y)
    prediction = compute_hypothesis(X, theta)
    sqrErrors = np.power(prediction - y, 2)
    return np.sum(sqrErrors) / (2 * m)


def gradient_descent_uni(X, y, theta, alpha, num_iters):
    m = y.size
    x = np.array(X[:, 1]).reshape((-1, 1))
    # J_history = np.zeros(num_iters).reshape((-1, 1))

    for i in range(0, num_iters):
        h = theta[0, 0] + (theta[1, 0] * x)
        h = h.reshape((-1, 1))  # transpose vector (make it vertical)
        theta_zero = theta[0, 0] - alpha * (1/m) * np.sum(h-y)
        theta_one = theta[1, 0] - alpha * (1/m) * np.sum((h-y)*x)
        theta = np.array([[theta_zero], [theta_one]])
        # J_history[i, 0] = compute_cost(X, y, theta)

    return theta.tolist()


def mean_by_columns(x):
    return (x.sum(axis=0) / np.size(x, axis=0))

# # https://en.wikipedia.org/wiki/Standard_deviation
# ddof=1 (Delta Degrees of Freedom) for simple standard deviation
# otherwise numpy will calculate population std


def std_by_columns(x):
    return np.std(x, ddof=1, axis=0)


def feature_normalization(x):
    mean = mean_by_columns(x)
    sigma = std_by_columns(x)
    n = np.size(x, axis=1)
    x_norm = np.empty_like(x, dtype=float)

    for i in range(0, n):
        x_norm[:, i] = (x[:, i] - mean[i]) / sigma[i]

    return x_norm


def gradient_descent_multi(X, y, theta, alpha, num_iters):
    m = y.size
    # x = np.array(X[:, 1]).reshape((-1, 1))
    theta = np.array(X)
    h = theta.T@X

    # theta = 0.5/m
    print(h.T @ h)


    return theta.tolist()