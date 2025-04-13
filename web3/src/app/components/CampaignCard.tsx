import { client } from "../client";
import Link from "next/link";
import { getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { useReadContract } from "thirdweb/react";

const campaignImages: { [key: string]: string } = {
  "0x4060AA615c60982d033767B24092862C4C6A1f5A": "https://i.postimg.cc/NFmRWH1c/bkc1.jpg", 
  "0xA8d042472569d8C756eD07D95861A9e2761699A0": "https://i.postimg.cc/CK9BSKML/bkc2.jpg",
  "0x9A71a13C34cf0190C996859e5baB9C1c74B14A7D" : "https://i.postimg.cc/TYCNYzzW/bkc3.jpg",
  "0x35e8884e9C0267376b58676B9d3258DB8bFB822C" : "https://i.postimg.cc/D0gWKdY1/bck4.jpg",
  "0x214E365aA1166887c6cAD3180199E6f4f4AB6207" : "https://i.postimg.cc/qM73j3gW/bck5.jpg"
};
//added by me above images
type CampaignCardProps = {
 campaignAddress:string;
};

export default function campaignCard({ campaignAddress}: CampaignCardProps){
  const contract = getContract({
    client:client,
    chain: sepolia,
    address:campaignAddress,
  });

  const { data: campaignName} = useReadContract({
    contract,
    method: "function name() view returns (string)",
    params: [],
  });

  const { data: campaignDescription } = useReadContract({
    contract,
    method: "function description() view returns (string)",
    params: [],
  });

  const { data : goal , isPending : isLoadingGoal } = useReadContract({
    contract,
    method: "function goal() view returns (uint256)",
    params: [],
  });

  const { data :balance, isPending : isLoadingBalance} = useReadContract({
    contract,
    method:
      "function getContractBalance() view returns (uint256)",
    params: [],
  });
  const totalBalance = balance?.toString();
  const totalGoal = goal?.toString();
  let balancePercentage = (parseInt(totalBalance as string)/parseInt(totalGoal as string))*100;

  if(balancePercentage >= 100){
     balancePercentage = 100;
  }
   
  const image = campaignImages[campaignAddress] || "https://i.postimg.cc/yYBvHZHL/bck6.png"; // added by me

  return (
    <div className="flex flex-col justify-between max-w-xs p-4 bg-white border border-slate-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      {/* Using the imageUrl constant */}
      <div className="mb-4">
        <img
          src={image}
          alt={campaignName}
          className="w-full h-40 object-cover rounded-t-lg"
        />
      </div>

      <div>
        {!isLoadingBalance && !isLoadingGoal && (
          <div className="mb-4">
            <div className="relative w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
              <div
                className="h-6 bg-blue-600 rounded-full dark:bg-blue-500 text-right"
                style={{ width: `${balancePercentage?.toString()}%` }}
              >
                <p className="text-white dark:text-white text-xs p-1">${balance?.toString()}</p>
              </div>

              <p className="absolute top-0 right-0 text-white dark:text-white text-xs p-1">
                {balancePercentage >= 100 ? "" : `${balancePercentage?.toString()}%`}
              </p>
            </div>
          </div>
        )}

        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-black">{campaignName}</h5>

        {/* Styled Description Section with Hover Transition */}
        <p className="mb-3 font-normal text-black hover:text-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
          {campaignDescription}
        </p>
      </div>

      <Link
        href={`/campaign/${campaignAddress}`}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        View Campaign
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </Link>
    </div>
  );
}