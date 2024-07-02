import scrapy
import re
from ..items import JobDataItem, CompanyDataItem
from bs4 import BeautifulSoup
import html
import logging

def Combine_values(value_list): # Combine all the values in a list into a string
        value = ", ".join(value_list).strip()
        value = value.replace(".,",".")
        value = value.replace(";,",".")
        return value

def Clean_string(s):    # Clear a string for easy reading
    return re.sub(r'\n+', '\n', s).strip()

class JobSpiderSpider(scrapy.Spider):
    name = "job_spider"
    start_urls = ["https://api.topdev.vn/td/v2/jobs?fields[job]=id,slug,title,salary,company,extra_skills,skills_str,skills_arr,skills_ids,job_types_str,job_levels_str,job_levels_arr,job_levels_ids,addresses,status_display,detail_url,job_url,salary,published,refreshed,applied,candidate,requirements_arr,packages,benefits,content,features,is_free,is_basic,is_basic_plus,is_distinction&fields[company]=slug,tagline,addresses,skills_arr,industries_arr,industries_str,image_cover,image_galleries,benefits&page=1&locale=vi_VN&ordering=jobs_new"]

    def parse(self, response):
        # Store the parsed json file
        data = response.json()
        
        for detail in data["data"]:
            item_company = CompanyDataItem()    # An item for storing data of a company

            # Get the id of the company
            item_company["company_id"] = detail["company"]["id"]

            # Get the name of the company
            item_company["company_name"] = detail["company"]["display_name"]

            # Get the logo url of the company
            item_company["company_logo"] = detail["company"]["image_logo"]

            # Get the addresses of the company
            item_company["company_addresses"] = Combine_values(detail["company"]["addresses"]["full_addresses"])

            # Get the industry of the company
            item_company["company_industry"] = detail["company"]["industries_str"]

            yield item_company

            item_job = JobDataItem()    # An item for storing data of a job

            # Get the id of the job
            item_job["job_id"] = detail["id"]

            # Get the name of the job
            item_job["job_name"] = detail["title"]

            # Get the id of the company
            item_job["company_id"] = detail["company"]["id"]

            # Get the job description if available
            if detail["content"] is not None:
                # Parse and extract text to a readable string
                unescaped_content_html = html.unescape(detail["content"])
                soup = BeautifulSoup(unescaped_content_html, 'html.parser')
                cleaned_content_html = soup.get_text()
                item_job["job_description"] = Clean_string(cleaned_content_html)
            else:
                # If no content is available, set job_description to None
                item_job["job_description"] = None

            # Get the levels of the job
            item_job["job_level"] = detail["job_levels_arr"]

            # Get the required technical skills
            item_job["technical_skills"] = detail["skills_arr"]

            # Get the url of the job
            item_job["detail_url"] = detail["detail_url"]

            # Get the salary
            item_job["salary"] = detail["salary"]["value"]

            # Get the benefits
            benefit_list = detail["benefits"]
            # Check if benefit_list is empty, use company benefits as fallback if necessary
            if benefit_list == []:
                benefit_list = detail["company"]["benefits"]
            item_job["benefits"] = Combine_values(benefit["value"] for benefit in benefit_list)  

            # Get the requirements
            job_requirement_list = [item for sublist in [req["value"] for req in detail["requirements_arr"]] for item in sublist]
            item_job["job_requirement"] = Combine_values(Clean_string(requirement) for requirement in job_requirement_list)

            yield item_job 

        current_page = data["meta"]["current_page"] # Get the scraped page number
        last_page = data["meta"]["last_page"]   # Get the last page numebr in the job listing list
        logging.info(f"Current page: {current_page}, Last page: {last_page}")
        
        # Check if there are more pages to scrape
        if current_page < last_page:
            next_page_url = f"https://api.topdev.vn/td/v2/jobs?fields[job]=id,slug,title,salary,company,extra_skills,skills_str,skills_arr,skills_ids,job_types_str,job_levels_str,job_levels_arr,job_levels_ids,addresses,status_display,detail_url,job_url,salary,published,refreshed,applied,candidate,requirements_arr,packages,benefits,content,features,is_free,is_basic,is_basic_plus,is_distinction&fields[company]=slug,tagline,addresses,skills_arr,industries_arr,industries_str,image_cover,image_galleries,benefits&page={current_page + 1}&locale=vi_VN&ordering=jobs_new"
            logging.info(f"Following next page URL: {next_page_url}")
            # Yield a request to follow the next page URL and continue parsing
            yield response.follow(next_page_url, callback=self.parse)