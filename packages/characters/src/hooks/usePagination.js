import { useState, useEffect } from 'react';

const PAGE_SIZE = 12;

export const usePagination = ({ allCharacters, totalCount, nextApiUrl, fetchingMore, loading, fetchPage }) => {
    const [displayPage, setDisplayPage] = useState(1);

    useEffect(() => {
        const needed = displayPage * PAGE_SIZE;
        if (needed > allCharacters.length && nextApiUrl && !fetchingMore && !loading) {
            fetchPage(nextApiUrl, false);
        }
    }, [displayPage, allCharacters.length, nextApiUrl]);

    const totalDisplayPages = Math.ceil(totalCount / PAGE_SIZE);
    const visibleCharacters = allCharacters.slice((displayPage - 1) * PAGE_SIZE, displayPage * PAGE_SIZE);

    const goToPage = (page) => {
        if (page < 1 || page > totalDisplayPages) return;
        setDisplayPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getPageNumbers = () => {
        const delta = 2;
        const range = [];
        for (let i = Math.max(1, displayPage - delta); i <= Math.min(totalDisplayPages, displayPage + delta); i++) {
            range.push(i);
        }
        if (range[0] > 1) {
            if (range[0] > 2) range.unshift('...');
            range.unshift(1);
        }
        if (range[range.length - 1] < totalDisplayPages) {
            if (range[range.length - 1] < totalDisplayPages - 1) range.push('...');
            range.push(totalDisplayPages);
        }
        return range;
    };

    return { displayPage, totalDisplayPages, visibleCharacters, goToPage, getPageNumbers };
};
