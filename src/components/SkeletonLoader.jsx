import React from 'react';

export const SkeletonCard = () => (
  <div className="bg-white rounded-xl p-6 space-y-4 animate-pulse">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gray-200 rounded-lg skeleton"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded skeleton"></div>
        <div className="h-3 bg-gray-200 rounded w-3/4 skeleton"></div>
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-gray-200 rounded skeleton"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2 skeleton"></div>
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 8 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, index) => (
      <SkeletonCard key={index} />
    ))}
  </div>
);

export const SkeletonList = ({ count = 5 }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-lg animate-pulse">
        <div className="w-12 h-12 bg-gray-200 rounded-lg skeleton"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded skeleton"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4 skeleton"></div>
        </div>
        <div className="w-6 h-6 bg-gray-200 rounded skeleton"></div>
      </div>
    ))}
  </div>
);

const SkeletonLoader = { SkeletonCard, SkeletonGrid, SkeletonList };

export default SkeletonLoader;