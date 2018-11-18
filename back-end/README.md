# Resources
https://programminghistorian.org/en/lessons/creating-apis-with-python-and-flask#lesson-goals
https://www.tutorialspoint.com/python3/python3_whatisnew.htm
http://flask.pocoo.org/docs/1.0/tutorial/
https://packaging.python.org/tutorials/installing-packages/
https://docs.python-guide.org/writing/structure/
https://www.computerhope.com/issues/ch001721.htm

# Install python 3 on Python
- check python version
```
$ python3 -V
```

- Install pip
```
$ sudo apt-get install -y python3-pip
```

- Install a few more packages
```
$ sudo apt-get install build-essential libssl-dev libffi-dev python-dev
```

- Install python 3 environment tool
```
$ sudo apt-get install -y python3-venv
```

# Create Python project

- make directory
```
$ mkdir project_name
```

- navigate to projects directory
```
$ cd project_name
```

- create virtual environment with name `venv`
```
$ python3 -m venv venv
```

- Add virtual environment to .gitignore file
```
$ echo 'venv' > .gitignore
```

- activate environment
```
$ source ./venv/bin/activate
```

- Install necessary packages
```
$ pip install wheel
$ pip install flask
```

- Ensure pip, setuptools, and wheel are up to date
```
$ python -m pip install --upgrade pip setuptools wheel
```

- Create requirements file
```
$ pip freeze > requirements.txt
```


# Clone project

- Get project from repository
```
$ git clone path_to_repository
```
- Navigate to project's directory
```
$ cd project_mane
```

- Create virtual environment
```
$ python3 -m venv venv
```

- Activate virtual environment
```
$ source ./venv/bin/activate
```

- Install requirements
```
$ pip install -r requirements.txt
```


## Run server
```
$ cd back-end
$ python back-end/api.py
```