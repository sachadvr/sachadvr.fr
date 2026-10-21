import { useState, useEffect, useRef } from 'react';

const cache = new Map<string, any>();

const useFetch = (url: string, method: 'GET' | 'POST' = 'GET', params?: Record<string, any>) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const cacheRef = useRef(cache);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            let finalUrl = url;

            if (method === 'GET' && params) {
                const queryParams = new URLSearchParams(params).toString();
                finalUrl = `${url}?${queryParams}`;
            }

            if (method === 'GET' && cacheRef.current.has(finalUrl)) {
                setData(cacheRef.current.get(finalUrl));
                setLoading(false);
            } else {
                try {
                    const options: RequestInit = { method };
                    if (method === 'POST' && params) {
                        options.headers = { 'Content-Type': 'application/json' };
                        options.body = JSON.stringify(params);
                    }

                    const response = await fetch(finalUrl, options);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const result = await response.json();
                    if (method === 'GET') {
                        cacheRef.current.set(finalUrl, result);
                    }
                    setData(result);
                } catch (error) {
                    setError(error as Error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [url, method, params]);

    return { data, error, loading };
};

export default useFetch;