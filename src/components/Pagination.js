// components/Pagination.js
'use client'; // Mark this as a client component

import { useRouter } from 'next/router';
import React from 'react';

export const Pagination = ({ currentPage, totalPages }) => {
  const router = useRouter();

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      router.push(`/?page=${currentPage + 1}`);
    }
  };

  return (
    <div>
      {currentPage < totalPages && (
        <button onClick={handleNextPage}>Next Page</button>
      )}
    </div>
  );
};
