import numpy as np

def compute_hypothesis(X, theta):
    return (X@theta).tolist()

def compute_cost(X, y, theta):
    m = len(y)
    prediction = compute_hypothesis(X, theta)
    sqrErrors = np.power(prediction - y, 2)
    return np.sum(sqrErrors) / (2 * m)


def gradient_descent(X, y, theta, alpha, num_iters):
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
