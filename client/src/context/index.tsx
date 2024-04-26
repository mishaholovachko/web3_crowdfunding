import React, { createContext, useContext } from 'react';
import { useAddress, useConnect, useContract, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

export interface Campaign {
  amountCollected: string;
  description: string;
  deadline: number;
  target: string;
  owner: string;
  title: string;
  image: string;
  pId: number;
}

export interface Donation {
  donation: string;
  donator: string;
}

interface StateContextType {
  address: string | undefined;
  contract?: any;
  connect: () => void;
  createCampaign: (form: any) => Promise<void> | undefined;
  getCampaigns: () => Promise<Campaign[]>;
  getUserCampaigns: () => Promise<Campaign[]>;
  donate: (pId: number, amount: string) => Promise<any>;
  getDonations: (pId: number) => Promise<Donation[]>;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

interface StateContextProviderProps {
  children: React.ReactNode;
}

export const StateContextProvider = ({ children }: StateContextProviderProps) => {
  const { contract } = useContract('0xFF83e9A8F4A94B6102fF0c5CbadD6f8E564B61C7') ?? {};
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

  const address = useAddress();
  const connect = useConnect();

  const publishCampaign = async (form: any) => {
    try {
      const data = await createCampaign({
        args: [
          address, // owner
          form.title, // title
          form.description, // description
          form.target,
          new Date(form.deadline).getTime(), // deadline,
          form.image,
        ],
      });

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getCampaigns = async () => {
    const campaigns = await contract?.call('getCampaigns') ?? [];

    const parsedCampaigns = campaigns.map((campaign: any, i: number) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      pId: i
    })) as Campaign[];

    return parsedCampaigns;
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

    return filteredCampaigns;
  };

  const donate = async (pId: number, amount: string) => {
    const data = await contract?.call('donateToCampaign', [pId], { value: ethers.utils.parseEther(amount) });

    return data;
  };

  const getDonations = async (pId: number) => {
    const donations = await contract?.call('getDonators', [pId]) ?? [];
    const numberOfDonations = donations[0]?.length || 0;

    const parsedDonations: Donation[] = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      });
    }

    return parsedDonations;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext)!;
