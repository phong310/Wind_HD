import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchPhotos = (clientId, currentPage, currentTags) => {
    const [itemData, setItemData] = useState([]);
    const [searchTag, setSearchTag] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchPhotos = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get(`https://api.unsplash.com/photos?client_id=${clientId}&per_page=30&page=${currentPage}`);
                setTimeout(() => {
                    setItemData(res.data);
                    setIsLoading(false);
                }, 800);
            } catch (e) {
                console.log('Err:', e);
                setIsLoading(false);
            }
        };

        const searchPhotos = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get(`https://api.unsplash.com/search/photos?client_id=${clientId}&query=${currentTags}&per_page=30&page=${currentPage}`);
                setSearchTag(res.data.results);
                setIsLoading(false);
            } catch (e) {
                console.log('Err:', e);
                setIsLoading(false);
            }
        };

        if (currentTags) {
            searchPhotos();
        } else {
            fetchPhotos();
        }
    }, [clientId, currentPage, currentTags]);

    return { itemData, searchTag, isLoading, setSearchTag, setItemData, setIsLoading };
};
