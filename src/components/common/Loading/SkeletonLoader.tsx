import React from 'react';

interface SkeletonLoaderProps {
    height?: string;
    width?: string;
    className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
    height = '200px',
    width = '100%',
    className = ''
}) => {
    return (
        <div
            className={`animate-pulse bg-gray-200 rounded-lg ${className}`}
            style={{ height, width }}
        ></div>
    );
};

export default SkeletonLoader;
