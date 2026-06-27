import { useState } from 'react';
import { useRepairShopsContext } from '../RepairShop/useRepairShopContext';

export const useRepairShop = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); 

    // destructuring function dispatch from Repair shop context
    const { dispatch } = useRepairShopsContext();

    const getRepairShops = async (identifier) => {
        setIsLoading(true);
        setError(null);

        const govList = ["Alexandria", "Cairo"];
        const queryKey = govList.includes(identifier) ? "gov" : "area";

        try {
            const response = await fetch(`/api/serviceShops?${queryKey}=${encodeURIComponent(identifier)}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error || 'Something went wrong');
                setIsLoading(false)
                return false;
            }
            // save the user to local storage in key value pairs
            dispatch({ type: 'GET_REPAIR_SHOPS', payload: json.data});
            return json.data;

        } catch (err) {
            setError(err.message);
            return false;
            
        } finally {
            setIsLoading(false); 
        }
    };

    return { isLoading, error, getRepairShops};
};