'use client';
import { client } from "@/app/client";
import TierCard from "@/app/components/TierCard";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  getContract,
  prepareContractCall,
  ThirdwebContract,
} from "thirdweb";
import { sepolia } from "thirdweb/chains";
import {
  TransactionButton,
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";

export default function CampaignPage() {
  const account = useActiveAccount();
  const { campaignAddress } = useParams();

  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const contract = getContract({
    client: client,
    chain: sepolia,
    address: campaignAddress as string,
  });

  const { data: name, isPending: isLoadingName } = useReadContract({
    contract: contract,
    method: "function name() view returns (string)",
    params: [],
  });

  const { data: description } = useReadContract({
    contract,
    method: "function description() view returns (string)",
    params: [],
  });

  const { data: deadline, isPending: isLoadingDeadline } = useReadContract({
    contract: contract,
    method: "function deadline() view returns (uint256)",
    params: [],
  });

  const deadlineDate = new Date(parseInt(deadline?.toString() as string) * 1000);
  const hasDeadlinePassed = deadlineDate < new Date();

  const { data: goal, isPending: isLoadingGoal } = useReadContract({
    contract: contract,
    method: "function goal() view returns (uint256)",
    params: [],
  });

  const { data: balance, isPending: isLoadingBalance } = useReadContract({
    contract: contract,
    method: "function getContractBalance() view returns (uint256)",
    params: [],
  });

  const totalBalance = balance?.toString();
  const totalGoal = goal?.toString();
  let balancePercentage =
    (parseInt(totalBalance as string) / parseInt(totalGoal as string)) * 100;
  if (balancePercentage >= 100) balancePercentage = 100;

  const { data: tiers, isPending: isLoadingTiers } = useReadContract({
    contract: contract,
    method:
      "function getTiers() view returns ((string name, uint256 amount, uint256 backers)[])",
    params: [],
  });

  const { data: owner, isPending: isLoadingOwner } = useReadContract({
    contract: contract,
    method: "function owner() view returns (address)",
    params: [],
  });

  const { data: status } = useReadContract({
    contract,
    method: "function state() view returns (uint8)",
    params: [],
  });

  return (
    <div className="mx-auto max-w-7xl px-4 mt-6 text-white space-y-8">

      {/* Title & Edit */}
      <div className="flex justify-between items-center">
        {!isLoadingName && (
          <h1 className="text-4xl font-bold tracking-tight">{name}</h1>
        )}
        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded-md text-white"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Done" : "Edit"}
        </button>
      </div>

      {/* Description */}
      <div className="bg-gray-800 rounded-lg p-4 shadow">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-300">{description}</p>
      </div>

      {/* Deadline */}
      <div className="bg-gray-800 rounded-lg p-4 shadow">
        <h2 className="text-xl font-semibold mb-2">Deadline</h2>
        {!isLoadingDeadline && (
          <p className="text-gray-300">{deadlineDate.toDateString()}</p>
        )}
      </div>

      {/* Campaign Goal */}
      {!isLoadingBalance && !isLoadingGoal && (
        <div className="bg-gray-800 rounded-lg p-4 shadow">
          <h2 className="text-xl font-semibold mb-2">Campaign Goal</h2>
          <p className="text-gray-300 mb-2">Goal: ${totalGoal}</p>
          <div className="relative w-full h-6 bg-gray-700 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-green-400 transition-all duration-500 ease-in-out"
              style={{ width: `${balancePercentage}%` }}
            >
              <p className="text-xs text-white p-1 text-right pr-2">
                ${balance?.toString()}
              </p>
            </div>
            {balancePercentage < 100 && (
              <p className="absolute top-0 right-2 text-xs text-white">
                {balancePercentage.toFixed(1)}%
              </p>
            )}
          </div>
        </div>
      )}

      {/* Tiers */}
      <div className="bg-gray-800 rounded-lg p-4 shadow">
        <h2 className="text-xl font-semibold mb-4">Tiers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {isLoadingTiers ? (
            <p>Loading...</p>
          ) : tiers && tiers.length > 0 ? (
            tiers.map((tier, index) => (
              <div
                key={index}
                className="transition transform hover:scale-105 hover:shadow-lg duration-300"
              >
                <TierCard tier={tier} index={index} contract={contract} />
              </div>
            ))
          ) : (
            <p>No Tiers Found</p>
          )}

          {isEditing && (
            <button
              className="flex flex-col justify-center items-center p-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold border border-blue-300 rounded-lg shadow transition-all duration-300"
              onClick={() => setIsModalOpen(true)}
            >
              + Add Tier
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <CreateTierModal
          setIsModalOpen={setIsModalOpen}
          contract={contract}
        />
      )}
    </div>
  );
}

type CreateTierModalProps = {
  setIsModalOpen: (value: boolean) => void;
  contract: ThirdwebContract;
};

const CreateTierModal = ({
  setIsModalOpen,
  contract,
}: CreateTierModalProps) => {
  const [tierName, setTierName] = useState<string>("");
  const [tierAmount, setTierAmount] = useState<bigint>(1n);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center backdrop-blur-md">
      <div className="w-1/2 bg-slate-100 p-6 rounded-md">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold text-gray-900">
            Create a Funding Tier
          </p>
          <button
            className="text-sm px-4 py-2 bg-slate-600 text-white rounded-md"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </button>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-gray-800">Tier Name:</label>
          <input
            type="text"
            value={tierName}
            onChange={(e) => setTierName(e.target.value)}
            placeholder="Tier Name"
            className="mb-4 px-4 py-2 bg-slate-200 rounded-md text-black"
          />

          <label className="font-semibold text-gray-800">Tier Cost:</label>
          <input
            type="number"
            value={parseInt(tierAmount.toString())}
            onChange={(e) => setTierAmount(BigInt(e.target.value))}
            className="mb-4 px-4 py-2 bg-slate-200 rounded-md text-black"
          />

          <TransactionButton
            transaction={() =>
              prepareContractCall({
                contract,
                method: "function addTier(string _name, uint256 _amount)",
                params: [tierName, tierAmount],
              })
            }
            onTransactionConfirmed={async () => {
              alert("Tier added successfully!");
              setIsModalOpen(false);
            }}
          >
            Add Tier
          </TransactionButton>
        </div>
      </div>
    </div>
  );
};
