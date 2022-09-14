# Import libraries
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
import joblib
from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn import linear_model
import json

onehotencoder = OneHotEncoder()

data = pd.read_excel('./data/fb_ad_data.xlsx')
categorical_cols = ['qualityRanking', 'type', 'painpoint', 'termNote', 'tone', 'voice', 'readerEase', 'recession', 'mutinyPersonalization']

class MultiColumnLabelEncoder:
    def __init__(self,columns = None):
        self.columns = columns # array of column names to encode

    def fit(self,X,y=None):
        return self # not relevant here

    def transform(self,X):
        '''
        Transforms columns of X specified in self.columns using
        LabelEncoder(). If no columns specified, transforms all
        columns in X.
        '''
        output = X.copy()
        if self.columns is not None:
            for col in self.columns:
                output[col] = LabelEncoder().fit_transform(output[col])
        else:
            for colname,col in output.iteritems():
                output[colname] = LabelEncoder().fit_transform(col)
        return output

    def fit_transform(self,X,y=None):
        return self.fit(X,y).transform(X)


encoding_pipeline = Pipeline([
    ('encoding',MultiColumnLabelEncoder(columns=categorical_cols))
    # add more pipeline steps as needed
])
df = encoding_pipeline.fit_transform(data)

regr = linear_model.LinearRegression()
x_cols = ['qualityRanking', 'type', 'painpoint', 'tone', 'voice', 'readerEase']
x = np.asanyarray(df[x_cols])
y = np.asanyarray(df[['resultRate']])

X_train, X_test, y_train, y_test = train_test_split(x, y, test_size = 0.2, random_state = 0, shuffle = True)
regr.fit(X_train, y_train)

# Explained variance score: 1 is perfect prediction
print('Variance score: %.2f' % regr.score(x, y))

print("Score: ", regr.score(X_train, y_train))

joblib.dump(regr, 'fb_ad_classifier.joblib')

# Data to be written
dictionary = {
    "coefficients": regr.coef_.tolist(),
    "typeValues": df.type.unique().tolist(),
    "paintPointValues": df.painpoint.unique().tolist(),
    "qualityRankingValues": df.qualityRanking.unique().tolist(),
    "termNoteValues": df.termNote.unique().tolist(),
    "toneValues": df.tone.unique().tolist(),
    "voiceValues": df.voice.unique().tolist(),
    "readerEaseValues": df.readerEase.unique().tolist(),
    "recessionEaseValues": df.recession.unique().tolist(),
    "mutinyPersonalizationValues": df.mutinyPersonalization.unique().tolist(),
    "regressionScore": regr.score(X_train, y_train)
}
 
# Serializing json
json_object = json.dumps(dictionary, indent=4)
 
# Writing to sample.json
with open("model_stats.json", "w") as outfile:
    outfile.write(json_object)