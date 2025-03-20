import { API_Providers } from "@/types/apiProviders";

export enum APIProviderIds {
    nameAPI = 'name-api',
    linkedinAPI = 'linkedin-api',
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
    }
]