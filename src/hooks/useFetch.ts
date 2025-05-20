import { useEffect, useState } from 'react';

const useFetch = (url: string, skip: number = 1, limit: number = 10) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [totalItems, setTotalItems] = useState<number>(0); 

    useEffect(() => {
        setLoading(true);
        fetch(`${url}?skip=${skip}&limit=${limit}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setData(data.products); 
                setTotalItems(data.total); 
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [url, skip, limit]);

    return { data, loading, error, totalItems };
};

export default useFetch;
