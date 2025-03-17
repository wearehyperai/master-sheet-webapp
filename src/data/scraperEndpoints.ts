import { ScraperEndpoint } from '@/types/workflow';

// Sample scraper endpoints for LinkedIn data enrichment
const scraperEndpoints: ScraperEndpoint[] = [
    {
      id: 1,
      tab: "personData",
      title: "Person Data",
      description:
        "Takes a LinkedIn URL and retrieves that person's details.",
      credits: 1,
      details: {
        usage:
          "This Scraper finds the details about the user based on the LinkedIn URL",
        inputParams: [
          {
            fieldName: "link",
            type: "string",
            required: true,
            description: "LinkedIn URL of the person",
            name: "Link",
          },
        ],
        endpoint:
          "https://linkedin-bulk-data-scraper.p.rapidapi.com/person",
        method: "POST",
        headers: {
          "x-rapidapi-key": "Sign Up for Key",
          "x-rapidapi-host": "linkedin-bulk-data-scraper.p.rapidapi.com",
          "Content-Type": "application/json",
        },
      },
    },
    {
      id: 2,
      tab: "personDataURN",
      title: "Person Data (using URN)",
      description: "Scrape profile data using LinkedIn URN identifier.",
      credits: 1,
      details: {
        usage:
          "This Scraper extracts profile information using LinkedIn's unique URN identifier instead of URL.",
        inputParams: [
          {
            fieldName: "link",
            type: "string",
            required: true,
            description: "LinkedIn URN identifier (format: ACoAA...)",
            name: "LinkedIn URN Link", // Changed from "URN" to "LinkedIn URN Link"
          },
        ],
        endpoint:
          "https://linkedin-bulk-data-scraper.p.rapidapi.com/person_urn",
        method: "POST",
        headers: {
          "x-rapidapi-key": "Sign Up for Key",
          "x-rapidapi-host": "linkedin-bulk-data-scraper.p.rapidapi.com",
          "Content-Type": "application/json",
        },
      },
    },
    {
      id: 3,
      tab: "companyData",
      title: "Company Data",
      description: "Scrape company profile data from LinkedIn.",
      credits: 2,
      details: {
        usage:
          "This Scraper extracts comprehensive company information from LinkedIn using the company URL.",
        inputParams: [
          {
            fieldName: "link",
            type: "string",
            required: true,
            description:
              "LinkedIn company URL (e.g., https://www.linkedin.com/company/company-name)",
            name: "LinkedIn Company URL",
          },
        ],
        endpoint:
          "https://linkedin-bulk-data-scraper.p.rapidapi.com/company",
        method: "POST",
        headers: {
          "x-rapidapi-key": "Sign Up for Key",
          "x-rapidapi-host": "linkedin-bulk-data-scraper.p.rapidapi.com",
          "Content-Type": "application/json",
        },
      },
    },
    {
      id: 4,
      tab: "searchPeopleWithFilters",
      title: "Search People with Filters",
      description: "Search for people on LinkedIn with various filters.",
      credits: 3,
      details: {
        usage:
          "This Scraper searches for people on LinkedIn based on specified filters.",
        inputParams: [
          {
            fieldName: "keyword",
            type: "string",
            required: true,
            description: "General search keyword",
            name: "Keyword",
          },
          {
            fieldName: "page",
            type: "number",
            required: false,
            description: "Page number for pagination (default: 1)",
            name: "Page Number",
          },
          {
            fieldName: "first_name",
            type: "string",
            required: false,
            description: "First name to filter by",
            name: "First Name",
          },
          {
            fieldName: "last_name",
            type: "string",
            required: false,
            description: "Last name to filter by",
            name: "Last Name",
          },
          {
            fieldName: "title_free_text",
            type: "string",
            required: false,
            description: "Job title to filter by",
            name: "Job Title",
          },
          {
            fieldName: "company_free_text",
            type: "string",
            required: false,
            description: "Company name to filter by",
            name: "Company Name",
          },
          {
            fieldName: "school_free_text",
            type: "string",
            required: false,
            description: "School or university name to filter by",
            name: "School Name",
          },
          {
            fieldName: "location_list",
            type: "string",
            required: false,
            description: "Comma-separated locations to filter by",
            name: "Locations",
          },
        ],
        endpoint:
          "https://linkedin-bulk-data-scraper.p.rapidapi.com/search_people_with_filters",
        method: "POST",
        headers: {
          "x-rapidapi-key": "Sign Up for Key",
          "x-rapidapi-host": "linkedin-bulk-data-scraper.p.rapidapi.com",
          "Content-Type": "application/json",
        },
      },
    },
    {
      id: 5,
      tab: "personUpdates",
      title: "Person Updates",
      description: "Retrieve recent updates/posts from a LinkedIn profile.",
      credits: 2,
      details: {
        usage:
          "This Scraper extracts recent posts and updates from a LinkedIn profile.",
        inputParams: [
          {
            fieldName: "profile_url",
            type: "string",
            required: true,
            description:
              "LinkedIn profile URL (e.g., https://www.linkedin.com/in/username)",
            name: "LinkedIn Profile URL",
          },
        ],
        endpoint:
          "https://linkedin-bulk-data-scraper.p.rapidapi.com/profile_updates",
        method: "GET",
        headers: {
          "x-rapidapi-key": "Sign Up for Key",
          "x-rapidapi-host": "linkedin-bulk-data-scraper.p.rapidapi.com",
        },
        queryParams: true, // Indicates that parameters should be sent as query params
        queryParamMap: {
          profile_url: "profile_url",
          page: "page",
        },
        pagination: true,
      },
    },
    {
      id: 6,
      tab: "postReactions",
      title: "Post Reactions",
      description: "Get reactions on a LinkedIn post.",
      credits: 2,
      details: {
        usage:
          "This Scraper retrieves reaction data for a specific LinkedIn post.",
        inputParams: [
          {
            fieldName: "reactionsUrn",
            type: "string",
            required: true,
            description:
              "URN of the LinkedIn post (format: urn:li:activity:1234567890)",
            name: "Post URN",
          },
        ],
        endpoint:
          "https://linkedin-bulk-data-scraper.p.rapidapi.com/post_reactions",
        method: "GET",
        headers: {
          "x-rapidapi-key": "Sign Up for Key",
          "x-rapidapi-host": "linkedin-bulk-data-scraper.p.rapidapi.com",
        },
        queryParams: true,
        queryParamMap: {
          reactionsUrn: "reactionsUrn",
          page: "page",
        },
        pagination: true,
      },
    },
    {
      id: 7,
      tab: "postComments",
      title: "Post Comments",
      description: "Retrieve comments on a LinkedIn post.",
      credits: 2,
      details: {
        usage:
          "This Scraper fetches comments from a specific LinkedIn post.",
        inputParams: [
          {
            fieldName: "commentsUrn",
            type: "string",
            required: true,
            description:
              "Comments URN of the LinkedIn post (complex format)",
            name: "Comments URN",
          },
        ],
        endpoint:
          "https://linkedin-bulk-data-scraper.p.rapidapi.com/post_comments",
        method: "GET",
        headers: {
          "x-rapidapi-key": "Sign Up for Key",
          "x-rapidapi-host": "linkedin-bulk-data-scraper.p.rapidapi.com",
        },
        queryParams: true,
        queryParamMap: {
          commentsUrn: "commentsUrn",
          page: "page",
        },
        pagination: true,
      },
    },
    {
      id: 8,
      tab: "companyUpdates",
      title: "Company Updates",
      description: "Get recent posts from a company LinkedIn page.",
      credits: 3,
      details: {
        usage:
          "This Scraper extracts recent posts and updates from a company LinkedIn page.",
        inputParams: [
          {
            fieldName: "company_url",
            type: "string",
            required: true,
            description:
              "LinkedIn company page URL (e.g., https://www.linkedin.com/company/google)",
            name: "Company URL",
          },
        ],
        endpoint:
          "https://linkedin-bulk-data-scraper.p.rapidapi.com/company_updates",
        method: "GET",
        headers: {
          "x-rapidapi-key": "Sign Up for Key",
          "x-rapidapi-host": "linkedin-bulk-data-scraper.p.rapidapi.com",
        },
        queryParams: true,
        queryParamMap: {
          company_url: "company_url",
          page: "page",
        },
        pagination: true,
      },
    },
    {
      id: 9,
      tab: "searchPosts",
      title: "Search Posts",
      description: "Search for posts on LinkedIn using keywords.",
      credits: 3,
      details: {
        usage:
          "This Scraper searches for posts on LinkedIn based on keywords and filters.",
        inputParams: [
          {
            fieldName: "query",
            type: "string",
            required: true,
            description: "Search query for LinkedIn posts",
            name: "Search Query",
          },
        ],
        endpoint:
          "https://linkedin-bulk-data-scraper.p.rapidapi.com/search_posts_with_filters",
        method: "GET",
        headers: {
          "x-rapidapi-key": "Sign Up for Key",
          "x-rapidapi-host": "linkedin-bulk-data-scraper.p.rapidapi.com",
        },
        queryParams: true,
        queryParamMap: {
          query: "query",
          page: "page",
        },
        pagination: true,
      },
    },
    {
      id: 10,
      tab: "searchJobs",
      title: "Search Jobs",
      description: "Search for job listings on LinkedIn.",
      credits: 3,
      details: {
        usage:
          "This Scraper searches for job listings on LinkedIn based on keywords and filters.",
        inputParams: [
          {
            fieldName: "query",
            type: "string",
            required: true,
            description: "Job search keywords (e.g., 'software engineer')",
            name: "Search Query",
          },
          {
            fieldName: "searchLocationId",
            type: "string",
            required: false,
            description:
              "Location ID for job search (e.g., 'Europe', 'United States')",
            name: "Location",
          },
        ],
        endpoint:
          "https://linkedin-bulk-data-scraper.p.rapidapi.com/search_jobs",
        method: "GET",
        headers: {
          "x-rapidapi-key": "Sign Up for Key",
          "x-rapidapi-host": "linkedin-bulk-data-scraper.p.rapidapi.com",
        },
        queryParams: true,
        queryParamMap: {
          query: "query",
          searchLocationId: "searchLocationId",
          page: "page",
        },
        pagination: true,
      },
    },
    {
      id: 11,
      tab: "locateAndSearch",
      title: "Locate and Search (Google Maps)",
      description: "Search Google Maps based on location and keywords.",
      credits: 3,
      details: {
        usage:
          "This Scraper searches Google Maps based on location and keywords.",
        inputParams: [
          {
            fieldName: "query",
            type: "string",
            required: true,
            description:
              "Search query including location (e.g., 'attorney in Philadelphia, PA, USA')",
            name: "Search Query",
          },
          {
            fieldName: "limit",
            type: "number",
            required: false,
            description: "Number of results to return (default: 20)",
            name: "Result Limit",
          },
          {
            fieldName: "country",
            type: "string",
            required: false,
            description: "Country code (e.g., 'us', 'uk')",
            name: "Country",
          },
          {
            fieldName: "language",
            type: "string",
            required: false,
            description: "Language code (e.g., 'en')",
            name: "Language",
          },
        ],
        endpoint:
          "https://google-maps-extractor2.p.rapidapi.com/locate_and_search",
        method: "GET",
        headers: {
          "x-rapidapi-key": "Sign Up for Key",
          "x-rapidapi-host": "google-maps-extractor2.p.rapidapi.com",
        },
        queryParams: true,
        queryParamMap: {
          query: "query",
          limit: "limit",
          country: "country",
          language: "language",
          offset: "offset",
        },
        pagination: true,
        paginationParam: "offset", // Specifies that this endpoint uses offset-based pagination
      },
    },
    {
      id: 12,
      tab: "searchPeopleViaURL",
      title: "Search People via URL (Sales Navigator)",
      description: "Search people using a LinkedIn Sales Navigator URL.",
      credits: 3,
      details: {
        usage:
          "This Scraper extracts search results from a LinkedIn Sales Navigator URL.",
        inputParams: [
          {
            fieldName: "url",
            type: "string",
            required: true,
            description: "LinkedIn Sales Navigator search URL",
            name: "Sales Navigator URL",
          },
          {
            fieldName: "account_number",
            type: "number",
            required: false,
            description: "Account number (default: 1)",
            name: "Account Number",
          },
        ],
        endpoint:
          "https://linkedin-sales-navigator-no-cookies-required.p.rapidapi.com/premium_search_person_via_url",
        method: "POST",
        headers: {
          "x-rapidapi-key": "Sign Up for Key",
          "x-rapidapi-host":
            "linkedin-sales-navigator-no-cookies-required.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        bodyParams: true,
        pagination: true,
        paginationParam: "page",
        defaultParams: {
          account_number: 1,
        },
      },
    },
    {
      id: 13,
      tab: "searchCompanyViaURL",
      title: "Search Company via URL (Sales Navigator)",
      description: "Search companies using a LinkedIn Sales Navigator URL.",
      credits: 3,
      details: {
        usage:
          "This Scraper extracts company search results from a LinkedIn Sales Navigator URL.",
        inputParams: [
          {
            fieldName: "url",
            type: "string",
            required: true,
            description: "LinkedIn Sales Navigator company search URL",
            name: "Sales Navigator URL",
          },
          {
            fieldName: "account_number",
            type: "number",
            required: false,
            description: "Account number (default: 1)",
            name: "Account Number",
          },
        ],
        endpoint:
          "https://linkedin-sales-navigator-no-cookies-required.p.rapidapi.com/premium_search_company_via_url",
        method: "POST",
        headers: {
          "x-rapidapi-key": "Sign Up for Key",
          "x-rapidapi-host":
            "linkedin-sales-navigator-no-cookies-required.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        bodyParams: true,
        pagination: true,
        paginationParam: "page",
        defaultParams: {
          account_number: 1,
        },
      },
    },
  ];

export default scraperEndpoints;