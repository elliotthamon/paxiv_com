import { useState } from "react";
import { toast } from "react-toastify";

import useAuth from "@/hooks/useAuth";
import useMember from "@/hooks/useMember";

import { APPROVED, DENIED, PENDING } from "@/libs/constants";
import { generatePassword } from "@/libs/utils";
import CancelIC from "@/components/icons/CancelIC";

interface CompanyUserEditModalProps {
  item: any;
  onCancel: () => void;
  setDBChanged: Function;
}

const CompanyUserEditModal = ({
  item,
  onCancel,
  setDBChanged,
}: CompanyUserEditModalProps) => {
  const auth = useAuth();
  const { changeJourneyMember } = useMember();

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [position, setPosition] = useState<string>(item.position);
  const [approval, setApproval] = useState<string>(item.approval);

  const handleSaveUserData = async () => {
    setIsSaving(true);
    if (approval === APPROVED) {
      try {
        const password = generatePassword();
        await auth.signUpWithEmail(item.email, password);
        await changeJourneyMember(item._id, { position, approval });
        setDBChanged(true);
        setIsSaving(false);
      } catch (err: any) {
        console.log("error", err);
        setIsSaving(false);
        if (err.message) {
          toast.error(err.message, { theme: "colored" });
        }
      }
    } else {
      try {
        await changeJourneyMember(item._id, { position, approval });
        setDBChanged(true);
        toast.success("Successfully saved", { theme: "colored" });
        setIsSaving(false);
      } catch (err: any) {
        console.log("error", err);
        setIsSaving(false);
        if (err.message) {
          toast.error(err.message, { theme: "colored" });
        }
      }
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 backdrop-blur-md z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className="relative w-full max-h-full mx-auto mt-4 md:mt-20 max-w-[600px]">
        <div className="relative bg-white rounded-lg shadow border-[1px] border-primary">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={onCancel}
          >
            <CancelIC className="w-5 h-5" fill="currentColor" />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-6">
            <div className="flex flex-col text-black space-y-3">
              <div className="w-full flex space-x-10">
                <div className="w-1/2 text-right">User Name:</div>
                <div className="w-1/2">
                  {item.firstname + " " + item.lastname}
                </div>
              </div>
              <div className="w-full flex space-x-10">
                <div className="w-1/2 text-right">Email:</div>
                <div className="w-1/2">{item.email}</div>
              </div>

              <div className="w-full flex space-x-10">
                <div className="w-1/2 text-right">Company Name:</div>
                <div className="w-1/2">{item.companyDetails[0].name}</div>
              </div>
              <div className="w-full flex space-x-10">
                <div className="w-1/2 text-right">Company Website:</div>
                <div className="w-1/2">{item.companyDetails[0].website}</div>
              </div>
              <div className="w-full flex space-x-10">
                <div className="w-1/2 text-right">Platinum Company:</div>
                <div className="w-1/2">{item.platinumCompany}</div>
              </div>
              <div className="w-full flex space-x-10">
                <div className="w-1/2 text-right">Payment Status:</div>
                <div className="w-1/2 flex items-center">
                  <div
                    className={`h-2.5 w-2.5 rounded-full ${
                      item.paymentStatus ? "bg-green-500" : "bg-yellow-500"
                    } mr-2`}
                  ></div>
                  {item.paymentStatus ? "Paid" : "No"}
                </div>
              </div>
              <div className="w-full flex space-x-10">
                <div className="w-1/2 text-right">Role:</div>
                <div className="w-1/2">{item.role}</div>
              </div>
              <div className="w-full flex space-x-10">
                <div className="w-1/2 text-right">Position:</div>
                <div className="w-1/2">
                  <input
                    type="text"
                    value={position}
                    className="py-1 w-full rounded-[6px] border-primary focus:border-primary focus:ring-0"
                    onChange={(e) => setPosition(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full flex space-x-10">
                <div className="w-1/2 text-right">Approval:</div>
                <select
                  className="w-1/2 border-primary text-center rounded-[6px] py-1 focus:border-primary focus:ring-0"
                  onChange={(e) => setApproval(e.target.value)}
                  value={approval}
                >
                  <option value={APPROVED}>Approaval</option>
                  <option value={PENDING}>Pending</option>
                  <option value={DENIED}>Denied</option>
                </select>
              </div>
            </div>
            <div className="mt-6 mb-2 flex justify-center space-x-4">
              <button
                type="button"
                disabled={isSaving}
                className="rounded-[30px] w-[200px] py-1 text-white btn-gradient disabled:cursor-not-allowed"
                onClick={handleSaveUserData}
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                className="bg-white border-2 border-primary rounded-[30px] w-[200px] py-1 text-primary btn-cancel"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyUserEditModal;
