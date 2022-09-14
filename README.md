[conda-install]: https://docs.conda.io/projects/conda/en/latest/user-guide/install/macos.html

# ML-React-App

It's a template on which we can build a React app and call endpoints to make predictions.

# Running UI locally

1. Change directories to UI and run `npm install` or `yarn install`
2. To run the UI use `npm start`

# Running Flask locally

1. Change directories to service and set up a python virtual environment
   - [Conda][conda-install] is a popular choice
   - create a new virtual environment with python 3.7
   - `conda create -n ml-react-template python=3.7`
2. Install all required dependencies with pip
   - `pip install -r requirements.txt`
3. Run the flask service locally with
   - `flask run`

# Training Models

1. Once you have all python dependencies installed you may need to train or re-train your models
2. Run `python model_generator.py`
3. This will train the iris dataset and print out the training and testing accuracy metrics from `Sklearn`
