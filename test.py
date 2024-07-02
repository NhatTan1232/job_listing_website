# Run this file to check if ElasticSearch has enough documents 

from elasticsearch import Elasticsearch
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Retrieve Elasticsearch credentials from environment variables
cloud_id = os.getenv('ELASTICSEARCH_URL')
api_key_id = os.getenv('ELASTIC_API_KEY_ID')
api_key = os.getenv('ELASTIC_API_KEY')

# Connect to Elasticsearch
client = Elasticsearch(
    cloud_id,
    api_key=(api_key_id, api_key)
)

def count_documents(index_name):
    try:
        response = client.count(index=index_name)
        print(f"Total number of documents in index '{index_name}': {response['count']}")
    except Exception as e:
        print(f"Error occurred: {e}")

# Specify the index name
index_name = "job_listings"

# Run the function to count documents
count_documents(index_name)

