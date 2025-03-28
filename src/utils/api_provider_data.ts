import { API_Providers } from "@/types/api_providers";

export enum APIProviderIds {
    nameAPI = 'name-api',
    linkedinAPI = 'linkedin-api',
    linkedinProfileScraper = 'linkedin-profile-scraper',
}

export const apiProviders: API_Providers[] = [
    {
        id: APIProviderIds.nameAPI,
        name: 'Name API',
        description: 'Process names to get full name',
        requestParams: ['first_name', 'last_name'],
        responseFields: ['full_name', 'initials']
    },
    {
        id: APIProviderIds.linkedinAPI,
        name: 'LinkedIn API',
        description: 'Extract professional information from profiles',
        requestParams: ['company', 'website'],
        responseFields: [
            'owner_name',
            'owner_linkedin',
            'founder_name',
            'founder_linkedin',
            'ceo_name',
            'ceo_linkedin',
            'president_name',
            'president_linkedin',
        ]
    },
    {
        id: APIProviderIds.linkedinProfileScraper,
        name: 'LinkedIn Profile Scraper',
        description: 'Extract Profile Information from LinkedIn',
        requestParams: ['linkedin_profile_url'],
        responseFields: [
            'firstName',
            'lastName',
            'fullName',
            'publicIdentifier',
            'headline',
            'connections',
            'followers',
            'emailRequired',
            'openConnection',
            'urn',
            'addressCountryOnly',
            'addressWithCountry',
            'addressWithoutCountry',
            'addressWithoutCountry',
            'latest_experiences_1_companyLink',
            'latest_experiences_1_title',
            'latest_experiences_1_caption',
            'latest_experiences_2_companyLink',
            'latest_experiences_2_title',
            'latest_experiences_2_caption',
            'latest_experiences_3_companyLink',
            'latest_experiences_3_title',
            'latest_experiences_3_caption',
            'latest_educations_1_companyLink',
            'latest_educations_1_title',
            'latest_educations_1_caption',
            'latest_educations_2_companyLink',
            'latest_educations_2_title',
            'latest_educations_2_caption',
            'licenseAndCenrtificates_1_companyLink',
            'licenseAndCenrtificates_1_title',
            'licenseAndCenrtificates_1_caption',
            'licenseAndCenrtificates_2_companyLink',
            'licenseAndCenrtificates_2_title',
            'licenseAndCenrtificates_2_caption',
            'skills_1_name',
            'skills_2_name',
            'skills_3_name',
        ]
    }
]