from flask import Flask, request, jsonify, make_response
from flask_restplus import Api, Resource, fields
import joblib
import numpy as np
from flask_cors import CORS
import pandas as pd
import json

flask_app = Flask(__name__)
CORS(flask_app)
app = Api(app = flask_app, 
		  version = "1.0", 
		  title = "ML React App", 
		  description = "Predict results using a trained model")

name_space = app.namespace('prediction', description='Prediction APIs')

model = app.model('Prediction params', 
				  {'textField1': fields.String(required = True, 
				  							   description="Text Field 1", 
    					  				 	   help="Text Field 1 cannot be blank"),
				  'textField2': fields.String(required = True, 
				  							   description="Text Field 2", 
    					  				 	   help="Text Field 2 cannot be blank"),
				  'select1': fields.Integer(required = True, 
				  							description="Select 1", 
    					  				 	help="Select 1 cannot be blank"),
				  'select2': fields.Integer(required = True, 
				  							description="Select 2", 
    					  				 	help="Select 2 cannot be blank"),
				  'select3': fields.Integer(required = True, 
				  							description="Select 3", 
    					  				 	help="Select 3 cannot be blank")})

classifier = joblib.load('classifier.joblib')
fb_ad_classifier = joblib.load('fb_ad_classifier.joblib')

@name_space.route("/", methods=['GET', 'POST'])
class MainClass(Resource):

	def options(self):
		response = make_response()
		response.headers.add("Access-Control-Allow-Origin", "*")
		response.headers.add('Access-Control-Allow-Headers', "*")
		response.headers.add('Access-Control-Allow-Methods', "*")
		return response

	def get(self):
		data = pd.read_excel('./data/fb_ad_data.xlsx')
		json_data = data.to_json(orient="records")
		parsed = json.loads(json_data)
		json.dumps(parsed, indent=4)
		
		with open("model_stats.json", "r") as openfile:
			json_stats = json.load(openfile)

		response = jsonify({
				"statusCode": 200,
				"data": parsed,
				"stats": json_stats
				})
		response.headers.add('Access-Control-Allow-Origin', '*')
		response.headers.add('Access-Control-Allow-Headers', "*")
		response.headers.add('Access-Control-Allow-Methods', "*")
		return response

	@app.expect(model)		
	def post(self):
		try: 
			formData = request.json
			data = [val for val in formData.values()]
			prediction = classifier.predict(np.array(data).reshape(1, -1))
			types = { 0: "Iris Setosa", 1: "Iris Versicolour ", 2: "Iris Virginica"}
			response = jsonify({
				"statusCode": 200,
				"status": "Prediction made",
				"result": "The type of iris plant is: " + types[prediction[0]]
				})
			response.headers.add('Access-Control-Allow-Origin', '*')
			response.headers.add('Access-Control-Allow-Headers', "*")
			response.headers.add('Access-Control-Allow-Methods', "*")
			return response
		except Exception as error:
			return jsonify({
				"statusCode": 500,
				"status": "Could not make prediction",
				"error": str(error)
			})