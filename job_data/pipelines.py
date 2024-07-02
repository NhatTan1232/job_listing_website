from itemadapter import ItemAdapter
from .items import JobDataItem, CompanyDataItem
import mysql.connector
import os
from dotenv import load_dotenv

class JobDataPipeline:
    def __init__(self):
        # Initialize connection and create necessary tables
        self.create_connection()
        self.create_table()

    def create_connection(self):
        load_dotenv()
        self.conn = mysql.connector.connect(
            host = os.getenv('DB_HOST'),
            user = os.getenv('DB_USER'),
            passwd = os.getenv('DB_PASS'),
            database = os.getenv('DB_NAME')
        )
        self.curr = self.conn.cursor()

    def create_table(self):
        # Create necessary tables if they don't exist, drop them first if they do
        self.curr.execute(
            """DROP TABLE IF EXISTS company, job, job_level, skills"""
        )

        # Create 'company' table to store company information
        self.curr.execute(
            """CREATE TABLE company (
            id VARCHAR(255) PRIMARY KEY,
            name TEXT,
            logo TEXT,
            industry TEXT,
            addresses TEXT
            )"""
        )

        # Create 'job' table to store job information
        self.curr.execute(
            """CREATE TABLE job (
            id VARCHAR(255) PRIMARY KEY,
            job_name TEXT,
            company_id VARCHAR(255),
            job_description TEXT,
            job_requirement TEXT,
            benefits TEXT,
            url TEXT,
            salary TEXT,
            FOREIGN KEY (company_id) REFERENCES company(id)
            )"""
        )

        # Create 'job_level' table to store job levels associated with jobs
        self.curr.execute(
            """CREATE TABLE job_level (
            job_id VARCHAR(255),
            job_level VARCHAR(255),
            PRIMARY KEY (job_id, job_level),
            FOREIGN KEY (job_id) REFERENCES job(id)
            )"""
        )

        # Create 'skills' table to store technical skills associated with jobs
        self.curr.execute(
            """CREATE TABLE skills (
            job_id VARCHAR(255),
            skill VARCHAR(255),
            PRIMARY KEY (job_id, skill),
            FOREIGN KEY (job_id) REFERENCES job(id)
            )"""
        )

    def process_item(self, item, spider):
        # Process each item depending on its type (JobDataItem or CompanyDataItem)
        if isinstance(item, JobDataItem):
            # Process job
            self.store_job_db(item)
        elif isinstance(item, CompanyDataItem):
            # Process company
            if not self.company_exists(item["company_id"]):
                # Only store company data if it isn't in the 'company' table already
                self.store_company_db(item)
        return item
    
    def store_job_db(self, item):
        # Store job data in 'job' table
        self.curr.execute(
            """INSERT INTO job VALUES(%s, %s, %s, %s, %s, %s, %s, %s)""",(
                item["job_id"],
                item["job_name"],
                item["company_id"],
                item["job_description"],
                item["job_requirement"],
                item["benefits"],
                item["detail_url"],
                item["salary"]
        ))
        self.conn.commit()

        # Store job data in 'job_level' table
        for level in item["job_level"]:
            self.curr.execute(
                """INSERT INTO job_level VALUES(%s, %s)""",(
                    item["job_id"],
                    level
            ))
            self.conn.commit()
        
        # Store job data in 'skills' table
        for skill in item["technical_skills"]:
            self.curr.execute(
                """INSERT INTO skills VALUES(%s, %s)""",(
                    item["job_id"],
                    skill
            ))
            self.conn.commit()

    def store_company_db(self, item):
        # Store company data in 'company' table
        self.curr.execute(
            """INSERT INTO company VALUES (%s, %s, %s, %s, %s)""",
            (
                item["company_id"],
                item["company_name"],
                item["company_logo"],
                item["company_industry"],
                item["company_addresses"]
            )
        )

    def company_exists(self, company_id):
        # Check if company with given ID exists in 'company' table
        self.curr.execute("SELECT id FROM company WHERE id = %s", (company_id,))
        result = self.curr.fetchone()
        return result is not None