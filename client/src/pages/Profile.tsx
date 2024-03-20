import { useState, useEffect } from 'react';

import { DisplayCampaigns } from '../components';

import { Campaign, useStateContext } from '../context';

const Profile = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);

    const { address, contract, getUserCampaigns } = useStateContext();

    const fetchCampaigns = async () => {
        setIsLoading(true);
        const data = await getUserCampaigns();
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

export default Profile;
