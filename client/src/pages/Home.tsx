import { useState, useEffect } from 'react';
import { Campaign, useStateContext } from '../context';
import { DisplayCampaigns } from '../components';

const Home = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);

    const { address, contract, getCampaigns } = useStateContext();

    const fetchCampaigns = async () => {
        setIsLoading(true);
        const data = await getCampaigns();
        console.log('data:', data)
        setCampaigns(data);
        setIsLoading(false);
    };

    useEffect(() => {
        if (contract) fetchCampaigns();
    }, [address, contract]);

    return (
        <DisplayCampaigns
            title="All Campaigns"
            isLoading={isLoading}
            campaigns={campaigns}
        />
    );
};

export default Home;
