import { RecordData } from '@/models/csv_data';
import { CSSProperties, ReactNode } from 'react';
import { AutoSizer, Grid, GridCellProps } from 'react-virtualized';

export interface DataTableProps {
    recordData: RecordData[];
}
/* 
const DataTable: React.FC<DataTableProps> = ({
    recordData,
}) => {
    const headers = recordData.length > 0
        ? Object.keys(recordData[0].keyValuePairs)
        : ['No Data'];
    console.log(`DataTable :  ${recordData.length}`);
    return (
        <div className="flex flex-col w-full h-full">
            <div
                className="w-full flex-grow overflow-auto border border-gray-200 rounded"
                style={{ height: 'calc(100vh - 120px)' }}
            >
                <table className="w-full min-w-full">
                    <thead className="bg-gray-100 sticky top-0 ">
                        <tr>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Sr.No.
                            </th>
                            {headers.map((header, index) => (
                                <th
                                    key={index}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {recordData.length > 0 ? (
                            recordData.map((record, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className="hover:bg-gray-50"
                                >

                                    <td
                                        key={rowIndex}
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                    >
                                        {rowIndex + 1}
                                    </td>
                                    {Object.values(record.keyValuePairs).map((value, cellIndex) => (
                                        <td
                                            key={cellIndex}
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                        >
                                            {value}
                                        </td>
                                    ))}
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">

                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={headers.length + 1}
                                    className="px-6 py-4 text-center text-sm text-gray-500"
                                >
                                    Data Loading...
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}; */

const DataTable: React.FC<DataTableProps> = ({
    recordData,
}) => {
    if (recordData.length == 0) {
        return (<div>No Data</div>)
    }
    const headers = ['SrNo.', ...Object.keys(recordData[0].keyValuePairs)];

    const list: string[][] = [
        headers,
        ...recordData.map((t) => [(recordData.indexOf(t) + 1).toString(), ...Object.values(t.keyValuePairs)])
    ];

    function cellRenderer(props: GridCellProps): ReactNode {
        const style: CSSProperties = {
            ...props.style,
            overflow: "hidden",
            border: '1px solid grey',
            textAlign: 'center',
            padding: props.columnIndex == 0 ? '10px 0px' : '10px 20px'
        };
        return <div key={props.key} style={style}>{list[props.rowIndex][props.columnIndex]}</div>;
    }

    return (
        <div className="flex flex-col w-full h-80">
            <AutoSizer disableHeight>
                {({ width }) => {
                    return (
                        <Grid
                            cellRenderer={cellRenderer}
                            columnCount={headers.length}
                            columnWidth={(index) => index.index == 0 ? 80 : 200}
                            height={700}
                            rowCount={recordData.length}
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

export default DataTable;