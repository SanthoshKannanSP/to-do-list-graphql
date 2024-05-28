from flask import Flask
from flask_cors import CORS
from flask_graphql import GraphQLView
from schema import schema

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def index():
    return {"Hello": "World"}


app.add_url_rule(
    "/api/graphql",
    view_func=GraphQLView.as_view("graphql", schema=schema, graphiql=True),
)

if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=8000)
