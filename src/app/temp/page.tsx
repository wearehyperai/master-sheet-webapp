'use client';

import { RecordData } from "@/models/csv_data";
import { ReactNode } from "react";
import { AutoSizer, Grid, GridCellProps } from "react-virtualized";
import "react-virtualized/styles.css";

function getRandomString(): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = Math.floor(Math.random() * 3) + 3; // Random length between 3 and 5
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function generateData() {
    const data: RecordData[] = [];
    for (let i = 0; i < 7000; i++) {
        data.push({
            keyValuePairs: {
                'Sr': (i + 1).toString(),
                'First Name': getRandomString(),
                'Last Name': getRandomString(),
                'Title': getRandomString(),
                'Company': getRandomString(),
                'Company Name for Emails': getRandomString(),
                'Email': getRandomString(),
                'Email Status': getRandomString(),
                'Seniority': getRandomString(),
                'Departments': getRandomString(),
                'Work Direct Phone': getRandomString(),
                'Home Phone': getRandomString(),
                'Mobile Phone': getRandomString(),
                'Corporate Phone': getRandomString(),
                'Other Phone': getRandomString(),
                'Stage': getRandomString(),
                '# Employees': getRandomString(),
                'Industry': getRandomString(),
                'Keywords': getRandomString(),
                'Person Linkedin Url': getRandomString(),
                'Website': getRandomString(),
                'Company Linkedin Url': getRandomString(),
                'Facebook Url': getRandomString(),
            }
        });
    }
    return data;
}

const App: React.FC = ({
}) => {
    const recordData = generateData();
    const headers = [
        'Sr',
        'First Name',
        'Last Name',
        'Title',
        'Company',
        'Company Name for Emails',
        'Email',
        'Email Status',
        'Seniority',
        'Departments',
        'Work Direct Phone',
        'Home Phone',
        'Mobile Phone',
        'Corporate Phone',
        'Other Phone',
        'Stage',
        '# Employees',
        'Industry',
        'Keywords',
        'Person Linkedin Url',
        'Website',
        'Company Linkedin Url',
        'Facebook Url',
    ];

    if (recordData.length === 0) {
        return <div>No Data</div>;
    }

    const list = [
        headers,
        ...recordData.map((t) => Object.values(t.keyValuePairs))
    ];

    function cellRenderer(props: GridCellProps): ReactNode {
        return <div key={props.key} style={props.style}>{list[props.rowIndex][props.columnIndex]}</div>;
    }

    return (
        <div style={{ height: "900px", width: "100%" }}>
            <AutoSizer disableHeight>
                {({ width }) => {
                    console.log(width);
                    return (
                        <Grid
                            cellRenderer={cellRenderer}
                            columnCount={list[0].length}
                            columnWidth={200}
                            height={900}
                            rowCount={list.length}
                            rowHeight={60}
                            overscanColumnCount={0}
                            overscanRowCount={2}
                            width={width} />
                    );
                }}
            </AutoSizer>
        </div>
    );
}
export default App;
