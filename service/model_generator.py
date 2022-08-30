# Import libraries
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix
from sklearn.tree import DecisionTreeClassifier
import joblib
from sklearn import datasets, preprocessing
from sklearn.metrics import accuracy_score
from sklearn.compose import make_column_transformer

# Get the dataset
dataset = datasets.load_iris()

# Split the dataset into features and labels
X = dataset.data
y = dataset.target

# Split the dataset into training (80%) and testing (20%) data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 0, shuffle = True)

# Build the classifier and make prediction
classifier = DecisionTreeClassifier()
classifier.fit(X_train, y_train)
prediction = classifier.predict(X_test)

print(prediction)

# Print the confusion matrix
print("Confusion Matrix:")
print(confusion_matrix(y_test, prediction))

# Print the accuracy of the model
predictions = classifier.predict(X_test)
print(accuracy_score(y_test, predictions))
print("Train data accuracy:",accuracy_score(y_true = y_train, y_pred=classifier.predict(X_train)))
print("Test data accuracy:",accuracy_score(y_true = y_test, y_pred=predictions))

# Save the model to disk
joblib.dump(classifier, 'classifier.joblib')





