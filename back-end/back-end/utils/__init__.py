import os
import csv
from flask import jsonify
from definitions import ROOT_DIR


def csv_file_to_json(file_path):

    file_name = os.path.join(ROOT_DIR, file_path)

    result = []

    with open(file_name, "r") as file_handler:
        reader = csv.reader(file_handler, quoting=csv.QUOTE_NONNUMERIC)

        for row in reader:
            result.append(row)

    return jsonify(result)


def test_function():
    name = 'blah'

    return name;
