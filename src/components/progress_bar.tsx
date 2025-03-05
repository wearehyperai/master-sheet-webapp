import { useEffect, useState } from 'react';

interface ProgressBarProps {
    progress: number;
    received: number;
    totalSize: number;
    showPercentage?: boolean;
    animate?: boolean;
}

export default function ProgressBar({
    progress,
    received,
    totalSize,
    showPercentage = true,
    animate = false,
}: ProgressBarProps) {
    const [displayProgress, setDisplayProgress] = useState(0);

    useEffect(() => {
        if (animate) {
            const animationDuration = 300;
            const startTime = Date.now();
            const startProgress = displayProgress;

            const animateProgress = () => {
                const currentTime = Date.now();
                const elapsed = currentTime - startTime;

                if (elapsed < animationDuration) {
                    const nextProgress = startProgress +
                        (progress - startProgress) * (elapsed / animationDuration);
                    setDisplayProgress(nextProgress);
                    requestAnimationFrame(animateProgress);
                } else {
                    setDisplayProgress(progress);
                }
            };

            requestAnimationFrame(animateProgress);
        } else {
            setDisplayProgress(progress);
        }
    }, [progress, animate]);

    const receivedMB = getSizeAnnonation(received);
    const totalSizeMB = getSizeAnnonation(totalSize);

    function getSizeAnnonation(size: number) {
        let annonated = '';
        if (size > 1024 * 1024) {
            annonated = `${(size / (1024 * 1024)).toFixed(2)} MB`;
        }
        else if (size > 1024) {
            annonated = `${(size / (1024)).toFixed(2)} KB`;
        } else {
            annonated = `${(size).toFixed(2)} B`;
        }
        return annonated;
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-1/2">
                <div className="relative w-full bg-gray-200 rounded-full overflow-hidden"
                    style={{ height: 6 }}>
                    <div
                        className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-300"
                        style={{
                            width: `${Math.min(Math.max(displayProgress, 0), 100)}%`,
                            transition: animate ? 'width 0.3s ease-in-out' : 'none'
                        }}
                    />
                </div>
                {showPercentage && (
                    <div className="mt-2 text-sm text-gray-600 text-right">
                        {Math.round(displayProgress)}%
                    </div>
                )}
                {showPercentage && (
                    <div className="mt-2 text-sm text-gray-600 text-left">
                        {receivedMB} / {totalSizeMB}
                    </div>
                )}
            </div>
        </div>
    );
}