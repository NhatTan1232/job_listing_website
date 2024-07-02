from elasticsearch import Elasticsearch
import os
from dotenv import load_dotenv

# Retrieve Elasticsearch credentials from environment variables
load_dotenv()
cloud_id = os.getenv('ELASTICSEARCH_URL')
api_key_id = os.getenv('ELASTIC_API_KEY_ID')
api_key = os.getenv('ELASTIC_API_KEY')

# Connect to Elasticsearch
client = Elasticsearch(
    cloud_id,
    api_key = (api_key_id, api_key)
)

# Define the index and mapping
index_body = {
    "mappings": {
        "properties": {
            "job_id": {"type": "keyword"},
            "job_name": {"type": "text"},
            "company": {
                "type": "object",
                "properties": {
                    "id": {"type": "keyword"},
                    "name": {"type": "text"},
                    "logo": {"type": "text"},
                    "industry": {"type": "text"},
                    "addresses": {"type": "text"}
                }
            },
            "job_description": {"type": "text"},
            "job_requirement": {"type": "text"},
            "benefits": {"type": "text"},
            "job_levels": {
                "type": "nested",
                "properties": {
                    "job_level": {"type": "text"}
                }
            },
            "skills": {
                "type": "nested",
                "properties": {
                    "skill": {"type": "text"}
                }
            },
            "salary": {"type": "text"},
            "url": {"type": "text"},
            "date_posted": {"type": "date"}
        }
    }
}

# Define the index name
index_name = "job_listings"

# Delete the existing index if it exists
if client.indices.exists(index=index_name):
    client.indices.delete(index=index_name)
    print(f"Deleted existing index: {index_name}")

# Create the new index
client.indices.create(index=index_name, body=index_body)
print(f"Created new index: {index_name}")

# Verify the connection
print(client.info())