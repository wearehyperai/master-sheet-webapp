// components/ProgressIndicator.jsx

const ProgressIndicator = ({ processed = 2000, total = 7000 }) => {
    // Calculate percentage
    const percentage = ((processed / total) * 100).toFixed(1);

    return (
        <div className="fixed bottom-10 right-4 z-50">
            <div className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 opacity-90">
                <span className="text-sm font-medium">
                    {processed.toLocaleString()}/{total.toLocaleString()} processed
                </span>
                <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                    {percentage}%
                </span>
            </div>
        </div>
    );
};

export default ProgressIndicator;