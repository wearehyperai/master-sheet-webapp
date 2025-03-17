import { Workflow } from "@/types/myWorkflows";

export const dummyWorkflows: Workflow[] = [
  {
    id: '1',
    name: 'LinkedIn Profile Enrichment',
    status: 'completed',
    createdAt: '2025-02-15T10:30:00Z',
    lastRunAt: '2025-03-15T09:45:00Z',
    apiCalls: [
      {
        id: 'api1',
        endpoint: '/api/linkedin/profile',
        method: 'GET',
        status: 'success',
        timestamp: '2025-03-15T09:45:02Z',
        duration: 245,
        creditsConsumed: 2
      },
      {
        id: 'api2',
        endpoint: '/api/enrich/contact',
        method: 'POST',
        status: 'success',
        timestamp: '2025-03-15T09:45:05Z',
        duration: 350,
        creditsConsumed: 3
      }
    ],
    successfulRuns: 12,
    failedRuns: 1,
    totalCreditsConsumed: 156,
    response: {
      id: 'resp1',
      timestamp: '2025-03-15T09:45:08Z',
      data: [
        {
          name: 'John Doe',
          position: 'Software Engineer',
          company: 'Tech Corp',
          location: 'San Francisco, CA',
          email: 'john.doe@example.com',
          phone: '+1 (555) 123-4567'
        }
      ]
    },
    description: 'Workflow to enrich LinkedIn profiles with contact information'
  },
  {
    id: '2',
    name: 'Google Maps Location Scraper',
    status: 'completed',
    createdAt: '2025-02-20T14:15:00Z',
    lastRunAt: '2025-03-16T11:30:00Z',
    apiCalls: [
      {
        id: 'api3',
        endpoint: '/api/google/maps/search',
        method: 'GET',
        status: 'success',
        timestamp: '2025-03-16T11:30:05Z',
        duration: 420,
        creditsConsumed: 5
      },
      {
        id: 'api4',
        endpoint: '/api/google/maps/details',
        method: 'GET',
        status: 'failed',
        timestamp: '2025-03-16T11:30:10Z',
        duration: 320,
        creditsConsumed: 4
      }
    ],
    successfulRuns: 8,
    failedRuns: 3,
    totalCreditsConsumed: 98,
    response: {
      id: 'resp2',
      timestamp: '2025-03-16T11:30:15Z',
      data: [
        {
          name: 'Coffee Shop A',
          address: '123 Main St, San Francisco, CA',
          phone: '+1 (555) 987-6543',
          website: 'https://example.com/coffeeshop',
          rating: 4.5,
          reviews: 125
        },
        {
          name: 'Coffee Shop B',
          address: '456 Market St, San Francisco, CA',
          phone: '+1 (555) 456-7890',
          website: 'https://example.com/coffeeshopb',
          rating: 4.2,
          reviews: 87
        }
      ]
    }
  },
  {
    id: '3',
    name: 'Email Verification Workflow',
    status: 'draft',
    createdAt: '2025-03-10T09:00:00Z',
    lastRunAt: null,
    apiCalls: [],
    successfulRuns: 0,
    failedRuns: 0,
    totalCreditsConsumed: 0,
    response: null,
    description: 'A draft workflow to verify email addresses'
  },
  {
    id: '4',
    name: 'Company Data Enrichment',
    status: 'completed',
    createdAt: '2025-02-28T16:20:00Z',
    lastRunAt: '2025-03-14T13:15:00Z',
    apiCalls: [
      {
        id: 'api5',
        endpoint: '/api/company/search',
        method: 'POST',
        status: 'success',
        timestamp: '2025-03-14T13:15:03Z',
        duration: 310,
        creditsConsumed: 3
      },
      {
        id: 'api6',
        endpoint: '/api/company/details',
        method: 'GET',
        status: 'success',
        timestamp: '2025-03-14T13:15:08Z',
        duration: 290,
        creditsConsumed: 2
      },
      {
        id: 'api7',
        endpoint: '/api/company/financials',
        method: 'GET',
        status: 'success',
        timestamp: '2025-03-14T13:15:12Z',
        duration: 405,
        creditsConsumed: 4
      }
    ],
    successfulRuns: 15,
    failedRuns: 2,
    totalCreditsConsumed: 225,
    response: {
      id: 'resp3',
      timestamp: '2025-03-14T13:15:18Z',
      data: [
        {
          name: 'Acme Corporation',
          website: 'https://acme.example.com',
          industry: 'Manufacturing',
          founded: 1985,
          employees: 2500,
          revenue: '$120M',
          headquarters: 'Chicago, IL',
          ceo: 'Jane Smith'
        }
      ]
    },
    description: 'Comprehensive company data enrichment workflow'
  },
  {
    id: '5',
    name: 'Social Media Profile Analyzer',
    status: 'draft',
    createdAt: '2025-03-12T10:45:00Z',
    lastRunAt: null,
    apiCalls: [],
    successfulRuns: 0,
    failedRuns: 0,
    totalCreditsConsumed: 0,
    response: null,
    description: 'Draft workflow to analyze social media profiles'
  }
];