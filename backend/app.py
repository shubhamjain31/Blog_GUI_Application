from flask import Flask, request
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import datetime

_date = datetime.datetime.now()

app = Flask(__name__)

# database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:Shubham31!@localhost/blog'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)


# models
class Articles(db.Model):
	id 			= db.Column(db.Integer, primary_key=True)
	title 		= db.Column(db.String(100), nullable=False)
	description = db.Column(db.Text())
	date 		= db.Column(db.DateTime, default=_date)

	def __repr__(self):
	    return '<Title %r>' % self.title

	def __init__(self, title, description):
		self.title = title
		self.description = description

class ArticleSchema(ma.Schema):
	class Meta:
		fields = ('id', 'title', 'description', 'date')

article_schema  = ArticleSchema()
articles_schema = ArticleSchema(many=True)


@app.route('/get', methods = ['GET'])
def get_articles():
	all_articles  = Articles.query.all()
	results  	  =	articles_schema.dump(all_articles)
	return jsonify(results)

@app.route('/get/<id>/', methods = ['GET'])
def post_details(id):
	article  	  = Articles.query.get(id)
	result  	  =	article_schema.jsonify(article)
	return result

@app.route('/add', methods = ['POST', 'GET'])
def add_article():
	# data			= request.get_json(force=True)
	data 			= request.json

	title 			= data['title']
	description		= data['description']

	articles = Articles(title, description)
	db.session.add(articles)
	db.session.commit()

	return article_schema.jsonify(articles)

@app.route('/update/<id>/', methods = ['PUT', 'GET'])
def update_article(id):
	article  	  = Articles.query.get(id)

	data 			= request.json
	title 			= data['title']
	description		= data['description']

	article.title 			= title
	article.description 	= description

	db.session.commit()

	result  	  =	article_schema.jsonify(article)
	return result


if __name__ == "__main__":
	app.run(debug=True)