import scrapy

class JobDataItem(scrapy.Item):
    job_id = scrapy.Field()
    job_name = scrapy.Field()
    company_id = scrapy.Field()
    job_description = scrapy.Field()
    job_requirement = scrapy.Field()
    job_level = scrapy.Field()
    benefits = scrapy.Field()
    technical_skills = scrapy.Field()
    detail_url = scrapy.Field()
    salary = scrapy.Field()

class CompanyDataItem(scrapy.Item):
    company_id = scrapy.Field()
    company_name = scrapy.Field()
    company_logo = scrapy.Field()
    company_industry = scrapy.Field()
    company_addresses = scrapy.Field()