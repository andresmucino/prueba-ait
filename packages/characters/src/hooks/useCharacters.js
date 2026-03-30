import { useState, useEffect } from 'react';

export const useCharacters = () => {
    const [allCharacters, setAllCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetchingMore, setFetchingMore] = useState(false);
    const [error, setError] = useState('');
    const [totalCount, setTotalCount] = useState(0);
    const [nextApiUrl, setNextApiUrl] = useState(null);

    const fetchPage = async (url, isFirst) => {
        if (isFirst) setLoading(true);
        else setFetchingMore(true);
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
            const data = await response.json();
            setAllCharacters(prev => [...prev, ...(data.results || [])]);
            setTotalCount(data.info?.count || 0);
            setNextApiUrl(data.info?.next || null);
        } catch (e) {
            setError(e.message || 'Failed to fetch characters');
        } finally {
            if (isFirst) setLoading(false);
            else setFetchingMore(false);
        }
    };

    useEffect(() => {
        const apiBaseUrl = process.env.API_URL;
        if (!apiBaseUrl) {
            setError('API_URL is not defined in environment variables.');
            setLoading(false);
            return;
        }
        fetchPage(`${apiBaseUrl}/character`, true);
    }, []);

    return { allCharacters, loading, fetchingMore, error, totalCount, nextApiUrl, fetchPage };
};
