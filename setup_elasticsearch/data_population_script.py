import pymysql
import os
import logging
from dotenv import load_dotenv
from elasticsearch import Elasticsearch, helpers

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Retrieve Elasticsearch credentials from environment variables
load_dotenv()
cloud_id = os.getenv('ELASTICSEARCH_URL')
api_key_id = os.getenv('ELASTIC_API_KEY_ID')
api_key = os.getenv('ELASTIC_API_KEY')
db_host = os.getenv('DB_HOST')
db_user = os.getenv('DB_USER')
db_pass = os.getenv('DB_PASS')
db_name = os.getenv('DB_NAME')

if not cloud_id or not api_key_id or not api_key:
    logging.error("Elasticsearch credentials are not set in environment variables.")
    exit(1) 

# Connect to MySQL
def get_mysql_connection():
    return pymysql.connect(
        host=db_host,
        user=db_user,
        password=db_pass,
        database=db_name
    )

# Connect to Elasticsearch
try:
    client = Elasticsearch(
        cloud_id,
        api_key=(api_key_id, api_key)
    )
    logging.info("Connected to Elasticsearch")
except Exception as e:
    logging.error(f"Error connecting to Elasticsearch: {e}")
    exit(1)

def fetch_and_index_data():
    try:
        connection = get_mysql_connection()
        with connection.cursor(pymysql.cursors.DictCursor) as cursor:
            cursor.execute("""
                SELECT 
                    job.id AS job_id, 
                    job.job_name, 
                    job.job_description, 
                    job.job_requirement, 
                    job.benefits,
                    job.url,
                    job.salary, 
                    company.id AS company_id, 
                    company.name AS company_name, 
                    company.logo AS company_logo, 
                    company.industry AS company_industry, 
                    company.addresses AS company_addresses,
                    GROUP_CONCAT(DISTINCT job_level.job_level) AS job_levels,
                    GROUP_CONCAT(DISTINCT skills.skill) AS skills
                FROM job
                LEFT JOIN company ON job.company_id = company.id
                LEFT JOIN job_level ON job.id = job_level.job_id
                LEFT JOIN skills ON job.id = skills.job_id
                GROUP BY job.id
            """)
            jobs = cursor.fetchall()

            actions = [
                {
                    "_index": "job_listings",
                    "_id": job["job_id"],
                    "_source": {
                        "job_id": job["job_id"],
                        "job_name": job["job_name"],
                        "job_description": job["job_description"],
                        "job_requirement": job["job_requirement"],
                        "benefits": job["benefits"],
                        "company": {
                            "id": job["company_id"],
                            "name": job["company_name"],
                            "logo": job["company_logo"],
                            "industry": job["company_industry"],
                            "addresses": job["company_addresses"]
                        },
                        "job_levels": [{"job_level": level} for level in job["job_levels"].split(',')] if job["job_levels"] else [],
                        "skills": [{"skill": skill} for skill in job["skills"].split(',')] if job["skills"] else [],
                        "salary": job["salary"],
                        "url": job["url"],
                    }
                }
                for job in jobs
            ]

            helpers.bulk(client, actions)
            logging.info("Data indexed successfully in Elasticsearch")

    except Exception as e:
        logging.error(f"Error occurred: {e}")
        
    finally:
        connection.close()
        logging.info("MySQL connection closed")

# Run the function to fetch data from MySQL and index it in Elasticsearch
fetch_and_index_data()
