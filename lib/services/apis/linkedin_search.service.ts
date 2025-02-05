import axios from "axios";
import { CSVData } from "../../model/csv_data";

const RATE_LIMIT: number = 50;
const API_ENDPOINT: string = 'http://api.hyperpersonalization.ai/linkedin_search_dynamic';

export const runLinkedInApi = async (data: CSVData[]) => {
    if (data.length < RATE_LIMIT) {
        const response = await axios.post(API_ENDPOINT, {
            headers: {
                "Content-Type": 'application/json'
            }
        });
        if (response.status == 200) {

        }
    }
}