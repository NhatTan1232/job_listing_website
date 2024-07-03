## Table of Contents
* [About The Project](#about-the-project)
* [Getting Started](#getting-started)
* [Installation](#installation)
* [Contributing](#contributing)


## About The Project
### Job Listing Website
This project involces crawling job data from the internet, storing it in MySQL, setting up an Elasticsearch database for the search service, and building a job searchinng website.

### Project Structure
* Data Crawling: Crawl job listing data and store it in a MySQL database.
* Elasticsearch Setup: Create a dedicated Elasticsearch database for the search service.
* Website Development: Build a website that allows users to search for job listings.

## Getting Started
### Prerequisites
* Python 3.x
* MySQL
* Elasticsearch Cloud (And an API key)
* Node.js (for frontend development)

### Packages (Make sure these are installed in your computer or enviroment)
* bs4
* elasticsearch
* mysql-connector-python
* PyMySQL
* Scrapy
* scrapy-user-agents
* npm

## Installation
1. Create a MySQL database (I used MySQL Workbench 8.0 CE).
2. Set up your Elastic Cloud deployment and generate an API key.
3. Clone the repository
```sh
    git clone https://github.com/NhatTan1232/job_listing_website.git
    cd job_listing_website
```
4. Create an .env file like this:
  > ELASTICSEARCH_URL='YOUR _ELASTIC_CLOUD_URL'
> 
  > ELASTIC_API_KEY_ID='YOUR_ELASTIC_CLOUD_API_KEY_ID'
> 
  > ELASTIC_API_KEY='YOUR_ELASTIC_CLOUD_API_KEY'
> 
  > ELASTICSEARCH_API_ENCODED='YOUR_ELASTIC_CLOUD_ENCODED_API_KEY'
> 
  > DB_HOST='YOUR_MYSQL_HOST'
> 
  > DB_USER='YOUR_MYSQL_USER'
> 
  > DB_PASS='YOUR_MYSQL_PASSWORD'
> 
  > DB_NAME='YOUR_MYSQL_DATABASE_NAME'
> 
  > PORT=5000
5. Copy that .env to job_listing_website\backend\
```sh
  cp .env job_listing_website\backend\
```
6. Crawl data
```sh
  cd job_data\
  scrapy crawl job_spider
```
7. Run 'create_elasticsearch_index.py' and 'data_population_script.py' in setup_elasticsearch\ to set up Elastic Cloud index
8. (Optional) Run 'test.py' to see if elasticsearch has indexed all your data from MySQL
9. Run website
```sh
  cd ..\job_listing_website\
  npm start
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes.
(I may forget to include some prerequisites so if there are any error, let me know)
