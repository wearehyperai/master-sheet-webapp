export enum SocketReceiveEvents {
    userData = 'user_data',
    uploadProgress = 'upload_progress',
    uploadComplete = 'upload_complete',
    uploadFailed = 'upload_failed',
    parsedData = 'parsed_data',
    parsedDataCompleted = 'parsed_data_completed',
    socketErrorCode = 'socket_error',
    nameAPIResponse = 'name_api_response',
    linkedInResponse = 'linkedin_api_response',
    linkedInPersonDataResponse = 'linkedin_person_data_api_response',
    linkedInPersonDataUrnResponse = 'linkedin_person_data_urn_api_response',
    linkedInSearchScraperResponse = 'linkedin_search_scraper_api_response',
    linkedInCompanyDataResponse = 'linkedin_company_data_api_response',
    linkedInSearchPostResponse = 'linkedin_search_post_api_response',
    linkedInPostDataResponse = 'linkedin_post_data_api_response',
    linkedInProfileScraperResponse = 'linkedin_profile_scraper_api_response',
}

export enum SocketSendEvents {
    uploadFile = 'upload_file',
    uploadComplete = 'upload_complete',
    nameAPICall = 'call_name_api',
    linkedInSearchAPICall = 'call_linkedin_api',
    askForData = 'ask_for_data',
    linkedInPersonDataAPICall = 'call_linkedin_person_data_api',
    linkedInPersonDataUrnAPICall = 'call_linkedin_person_data_urn_api',
    linkedInSearchScraperAPICall = 'call_linkedin_search_scraper_api',
    linkedInCompanyDataAPICall = 'call_linkedin_company_data_api',
    linkedInProfileScraperAPICall = 'call_linkedin_profile_scraper_api',
    linkedInSearchPostAPICall = 'call_linkedin_search_post_api',
    linkedInPostDataAPICall = 'call_linkedin_post_data_api',
}
