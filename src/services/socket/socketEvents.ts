export enum SocketReceiveEvents {
    uploadProgress = 'upload_progress',
    uploadComplete = 'upload_complete',
    uploadFailed = 'upload_failed',
    parsedData = 'parsed_data',
    parsedDataCompleted = 'parsed_data_completed',
    socketErrorCode = 'socket_error',
    nameAPIResponse = 'name_api_response',
    linkedInResponse = 'linkedin_api_response'
}

export enum SocketSendEvents {
    uploadFile = 'upload_file',
    uploadComplete = 'upload_complete',
    nameAPICall = 'call_name_api',
    linkedInSearchAPICall = 'call_linkedin_api'
}
