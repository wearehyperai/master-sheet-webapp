export enum SocketSendEvents {
    uploadProgress = 'upload_progress',
    uploadComplete = 'upload_complete',
    uploadFailed = 'upload_failed',
    parsedData = 'parsed_data',
    socketErrorCode = 'socket_error',
    nameAPIResponse = 'name_api_response',
    linkedInResponse = 'linkedin_api_response',
    parsedDataCompleted = 'parsed_data_completed',

}

export enum SocketReceiveEvents {
    uploadFile = 'upload_file',
    uploadComplete = 'upload_complete',
    nameAPICall = 'call_name_api',
    linkedInSearchAPICall = 'call_linkedin_api'
}

export enum ServerSocketSendEvents {
    runNameApi = 'run_name_api',
    runLinkedInApi = 'run_linkedin_api'

}

export enum ServerSocketReceiveEvents {
    handshake = 'handshake',
    nameAPIResponse = 'name_api_response',
    linkedInResponse = 'linkedin_api_response'
}
