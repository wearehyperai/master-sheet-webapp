export interface NameAPIResponse {
    results: NameAPIResult[];

}
export interface NameAPIResult {
    full_name: string;
    initials: string;
}