import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import useAuth from "@/hooks/useAuth";
import useMember from "@/hooks/useMember";

import SendEmailModal from "@/components/modals/SendEmailModal.tsx";
import CancelIC from "@/components/icons/CancelIC";
import ListSearchIC from "@/components/icons/ListSearchIC";
import CloseIC from "@/components/icons/CloseIC";
import { generatePassword } from "lambdas/shared/utils";

import {
  FIRST_STEP,
  THIRD_STEP,
  FIFTH_STEP,
  SECOND_STEP,
  FOURTH_STEP,
  APPROVAL_STATUES,
  RoleStringByType,
  ApprovalStatusStringByType,
  ROLES,
  PENDING,
  DENIED,
  APPROVED,
  ROLE_USER,
} from "@/libs/constants";

const JourneyMemberDetailModal = (props: {
  setIsOpenDetailModal: Function;
  selectedMember: any;
  allCompanies: Array<any>;
  setBlockUI: Function;
  user: any;
}) => {
  const { modifyJourneyMember, changeJourneyMemberApproval } = useMember();

  const auth = useAuth();

  const [loading, setLoading] = useState<boolean>(false);

  const [payStatus, setPaystatus] = useState<boolean>(
    props.selectedMember.paymentStatus
  );
  const [approval, setApproval] = useState<string>(
    props.selectedMember.approval
  );
  const [roleType, setRoleType] = useState<string>(ROLE_USER);
  const [journeyStep, setJourneyStep] = useState<string>(
    props.selectedMember.journeyStep
  );
  const [companyID, setCompanyID] = useState<string | null>(
    props.selectedMember.companyID
  );
  const [companyName, setCompanyName] = useState<string>(
    props.selectedMember.companyName ? props.selectedMember.companyName : ""
  );
  const [companySite, setCompanySite] = useState<string>(
    props.selectedMember.companyWebsite
      ? props.selectedMember.companyWebsite
      : ""
  );

  const [companySearching, setCompanySearching] = useState<boolean>(false);
  const [curCompanyComboID, setCurCompanyComboID] = useState<string>("");

  const [isSaving, setSaving] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedEmail, setSelectedEmail] = useState<string>("");
  const [selectedID, setSelectedID] = useState<string>("");
  const [showToast, setShowToast] = useState(true);

  const handleApproval = async () => {
    if (approval == DENIED) {
      setSelectedEmail(props.selectedMember.email);
      setSelectedID(companyID == null ? "" : companyID);
      toast.success("Successfully denied", { theme: "colored" });
      props.setIsOpenDetailModal(false);
      setIsOpen(true);
      props.setBlockUI(true);
    } else if (approval === APPROVED) {
      toast.success("Successfully approved", { theme: "colored" });
      props.setIsOpenDetailModal(false);
      props.setBlockUI(true);
    } else {
      props.setIsOpenDetailModal(false);
      toast.success("Successfully submitted", { theme: "colored" });
      props.setBlockUI(true);
    }
  };

  const onSaveHandler = async () => {
    setSaving(true);
    let data;
    try {
      const password = generatePassword();
      if (approval == APPROVED) {
        await auth.signUpWithEmail(props.selectedMember.email, password);

        data = {
          companyName: companyName,
          companyWebsite: companySite,
          companyID: companyID,

          role: roleType,
          paymentStatus: payStatus,
          approval: approval,
          journeyStep: journeyStep,
          password: password,
        };
      } else {
        data = {
          companyName: companyName,
          companyWebsite: companySite,
          companyID: companyID,

          paymentStatus: payStatus,
          approval: approval,
          journeyStep: journeyStep,
        };
      }
      await modifyJourneyMember(props.selectedMember._id, data)
        .then((res) => {
          if (res?.status) {
            handleApproval();
          } else if (res === null) {
            throw "Error";
          } else {
            toast.error(res?.data.message, { theme: "colored" });
          }
        })
        .catch((e: any) => {
          toast.error("Try again.", { theme: "colored" });
        });
    } catch (e: any) {
      toast.error("Try again.", { theme: "colored" });
    }

    setSaving(false);
  };

  const changeApproval = async (id: string, approval: string) => {
    await changeJourneyMemberApproval(id, approval)
      .then((res) => {
        if (res?.status == true) {
          //props.filterMembers(props.user, res?.data.data);
          toast.success("Successfully changed.", { theme: "colored" });
        } else {
          toast.error(res?.data.message, { theme: "colored" });
        }
      })
      .catch((e) => {
        console.log("e");
        toast.error(e.messsage, { theme: "colored" });
      });
  };

  useEffect(() => {
    if (Object.keys(props.selectedMember).length > 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setShowToast(false);
    if (curCompanyComboID === "" || !curCompanyComboID) {
      const companyInfo = props.allCompanies.find((item) => {
        return item.name === companyName && item.website === companySite;
      });
      if (!!companyInfo) {
        setCompanyName(companyInfo.name);
        setCompanySite(companyInfo.website);
        setCompanyID(companyInfo._id);
        if (!showToast) {
          toast.success("Linked with existing company", { theme: "colored" });
          setShowToast(true);
        }
      } else {
        setCompanyID(null);
        setShowToast(false);
      }
    } else {
      const companyInfo = props.allCompanies.find((item) => {
        return item._id === curCompanyComboID;
      });
      if (!!companyInfo) {
        setCompanyName(companyInfo.name);
        setCompanySite(companyInfo.website);
        setCompanyID(companyInfo._id);

        if (!showToast) {
          toast.success("Linked with existing company", { theme: "colored" });
          setShowToast(true);
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curCompanyComboID, companyName, companySite]);

  return loading ? (
    <div className="fixed top-0 left-0 right-0 backdrop-blur-md z-50 px-1 xs:px-4 py-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative w-full max-h-full mx-auto mt-4 text-sm md:mt-20 xs:text-base">
        <div className="relative bg-white rounded-lg shadow border-[1px] border-primary">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={() => props.setIsOpenDetailModal(false)}
          >
            <CancelIC className="w-5 h-5" fill="currentColor" />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-2 py-6 xs:px-6">
            <div className="flex flex-col space-y-3 text-black">
              <div className="flex w-full space-x-2 xs:space-x-10">
                <div className="w-1/4 text-right">User Name:</div>
                <div className="w-3/4">
                  {props.selectedMember.firstname +
                    " " +
                    props.selectedMember.lastname}
                </div>
              </div>
              <div className="flex w-full space-x-2 xs:space-x-10">
                <div className="w-1/4 text-right">Email:</div>
                <div className="w-3/4">{props.selectedMember.email}</div>
              </div>

              <div className="flex w-full mt-2 space-x-2 xs:space-x-10">
                <div className="w-1/4 text-right"></div>
                <div className="w-3/4">
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center space-x-2">
                      {props.selectedMember?.acquisition && (
                        <span className="text-[#010F07] text-xs">
                          - Seeking Exclusive Acquisition Opportunities
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      {props.selectedMember?.disposition && (
                        <span className="text-[#010F07] text-xs">
                          - Seeking Disposition Opportunities
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      {props.selectedMember?.jointventure && (
                        <span className="text-[#010F07] text-xs">
                          - Seeking Joint Venture Opportunities
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      {props.selectedMember?.network && (
                        <span className="text-[#010F07] text-xs">
                          - Seeking To Grow My Network
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center w-full space-x-2 xs:space-x-10">
                <div className="w-1/4 text-right">Company Name:</div>
                <div className="flex items-center w-3/4 space-x-1">
                  {companySearching == true ? (
                    <Dropdown
                      className="w-[250px]"
                      options={props.allCompanies.map(
                        (item: any, key: number) => {
                          return { label: item.name, value: item._id };
                        }
                      )}
                      value={curCompanyComboID}
                      onChange={(e) => {
                        setCurCompanyComboID(e.value);
                      }}
                      placeholder="Select an option"
                    />
                  ) : (
                    <input
                      type="text"
                      className="w-full xs:w-auto p-2 bg-transparent border-2 ring-0 outline-none border-primary text-black rounded-[25px]"
                      onChange={(e) => {
                        setCompanyName(e.target.value);
                      }}
                      value={companyName}
                      disabled={isSaving}
                    />
                  )}
                  <button
                    type="button"
                    className={`w-[40px] h-[40px] bg-white border-[2px] flex justify-center items-center btn-cancel border-primary rounded-[25px] px-3 py-2 text-xs ${
                      isSaving && "pointer-events-none"
                    }`}
                    onClick={(e) => {
                      setCompanySearching(!companySearching);
                      if (companySearching === true) {
                        setCompanyID(null);
                        setCompanyName("");
                        setCompanySite("");
                      }
                    }}
                  >
                    {companySearching ? (
                      <CloseIC
                        fill="currentColor"
                        className="w-[20px] h-[20px] bi bi-x-lg"
                      />
                    ) : (
                      <ListSearchIC
                        fill="currentColor"
                        className="bi bi-search"
                      />
                    )}
                  </button>
                  {companyID === null ? (
                    <span style={{ color: "#fb7185" }}>
                      <small>
                        <i>(search to link company)</i>
                      </small>
                    </span>
                  ) : (
                    <span style={{ color: "#9ca3af" }}>
                      <small>
                        <i>(company linked)</i>
                      </small>
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center w-full space-x-2 xs:space-x-10">
                <div className="w-1/4 text-right">Company Website:</div>
                <div className="w-3/4">
                  <input
                    type="text"
                    className="w-full xs:w-auto p-2 bg-transparent border-2 ring-0 outline-none border-primary text-black rounded-[25px]"
                    onChange={(e) => {
                      setCompanySite(e.target.value);
                    }}
                    value={companySite}
                    disabled={companySearching || isSaving}
                  />
                </div>
              </div>

              <div className="flex items-baseline w-full space-x-2 xs:space-x-10">
                <div className="w-1/4 text-right">Asset Type:</div>
                <div className="w-3/4">
                  <div className="flex flex-wrap justify-start w-full gap-3 mt-2">
                    <button
                      type="button"
                      className={`${
                        props.selectedMember.assetType?.includes("MultiFamily")
                          ? "bg-primary text-white border-2 border-white"
                          : "bg-white text-primary border-2 border-primary"
                      }  text-xs px-3 py-2 rounded-[25px] cursor-not-allowed`}
                    >
                      MultiFamily
                    </button>
                    <button
                      type="button"
                      className={`${
                        props.selectedMember.assetType?.includes("Retail")
                          ? "bg-primary text-white border-2 border-white"
                          : "bg-white text-primary border-2 border-primary"
                      }  text-xs px-3 py-2 rounded-[25px] cursor-not-allowed`}
                    >
                      Retail
                    </button>
                    <button
                      type="button"
                      className={`${
                        props.selectedMember.assetType?.includes("Industrial")
                          ? "bg-primary text-white border-2 border-white"
                          : "bg-white text-primary border-2 border-primary"
                      }  text-xs px-3 py-2 rounded-[25px] cursor-not-allowed`}
                    >
                      Industrial
                    </button>
                    <button
                      type="button"
                      className={`${
                        props.selectedMember.assetType?.includes("Office")
                          ? "bg-primary text-white border-2 border-white"
                          : "bg-white text-primary border-2 border-primary"
                      }  text-xs px-3 py-2 rounded-[25px] cursor-not-allowed`}
                    >
                      Office
                    </button>
                    <button
                      type="button"
                      className={`${
                        props.selectedMember.assetType?.includes("Other")
                          ? "bg-primary text-white border-2 border-white"
                          : "bg-white text-primary border-2 border-primary"
                      }  text-xs px-3 py-2 rounded-[25px] cursor-not-allowed`}
                    >
                      Other
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-baseline w-full space-x-2 xs:space-x-10">
                <div className="w-1/4 text-right">Total Asset:</div>
                <div className="w-3/4">
                  <div className="flex flex-wrap justify-start w-full gap-3 mt-2">
                    <button
                      type="button"
                      className={`${
                        props.selectedMember.totalAsset === "250"
                          ? "bg-primary text-white border-2 border-white"
                          : "bg-white text-primary border-2 border-primary"
                      }  text-xs px-3 py-2 rounded-[25px] cursor-not-allowed`}
                    >
                      $25 Bn+
                    </button>
                    <button
                      type="button"
                      className={`${
                        props.selectedMember.totalAsset === "240"
                          ? "bg-primary text-white border-2 border-white"
                          : "bg-white text-primary border-2 border-primary"
                      }  text-xs px-3 py-2 rounded-[25px] cursor-not-allowed`}
                    >
                      $1 Bn to $24 Bn
                    </button>
                    <button
                      type="button"
                      className={`${
                        props.selectedMember.totalAsset === "999"
                          ? "bg-primary text-white border-2 border-white"
                          : "bg-white text-primary border-2 border-primary"
                      }  text-xs px-3 py-2 rounded-[25px] cursor-not-allowed`}
                    >
                      $500 MM to $999 MM
                    </button>
                    <button
                      type="button"
                      className={`${
                        props.selectedMember.totalAsset === "499"
                          ? "bg-primary text-white border-2 border-white"
                          : "bg-white text-primary border-2 border-primary"
                      }  text-xs px-3 py-2 rounded-[25px] cursor-not-allowed`}
                    >
                      $100MM to $499MM
                    </button>
                    <button
                      type="button"
                      className={`${
                        props.selectedMember.totalAsset === "100"
                          ? "bg-primary text-white border-2 border-white"
                          : "bg-white text-primary border-2 border-primary"
                      }  text-xs px-3 py-2 rounded-[25px] cursor-not-allowed`}
                    >
                      less than $100MM
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex w-full space-x-2 xs:space-x-10">
                <div className="w-1/4 text-right">Payment Status:</div>
                <div className="flex items-center w-3/4">
                  <select
                    className="border-primary text-center md:rounded-[25px] focus:border-primary focus:ring-0 text-xs px-3 py-2 rounded-[25px] cursor-pointer"
                    onChange={(e) => {
                      setPaystatus(parseInt(e.target.value) === 1);
                    }}
                    value={payStatus === true ? 1 : 0}
                    disabled={isSaving}
                  >
                    <option value={0}>None</option>
                    <option value={1}>Paid</option>
                  </select>
                </div>
              </div>
              <div className="flex w-full space-x-2 xs:space-x-10">
                <div className="w-1/4 text-right">Role:</div>
                <div className="w-3/4">
                  <select
                    className={`border-primary text-center md:rounded-[25px] focus:border-primary focus:ring-0 text-xs px-3 py-2 rounded-[25px] ${
                      approval != APPROVED
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                    onChange={(e) => {
                      setRoleType(e.target.value);
                    }}
                    value={roleType}
                    disabled={isSaving || approval != APPROVED}
                  >
                    {ROLES.map((roleType: string, index: number) => (
                      <option key={index} value={roleType}>
                        {RoleStringByType(roleType)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex w-full space-x-2 xs:space-x-10">
                <div className="w-1/4 text-right">Approval:</div>
                <div className="w-3/4">
                  <select
                    className="border-primary text-center md:rounded-[25px] focus:border-primary focus:ring-0 text-xs px-3 py-2 rounded-[25px] cursor-pointer"
                    onChange={(e) => {
                      setApproval(e.target.value);
                    }}
                    value={approval}
                    disabled={isSaving}
                  >
                    {(companyID === null
                      ? [PENDING, DENIED]
                      : APPROVAL_STATUES
                    ).map((status: string, index: number) => (
                      <option key={index} value={status}>
                        {ApprovalStatusStringByType(status)}
                      </option>
                    ))}
                  </select>
                  &nbsp; &nbsp;
                  {companyID === null && (
                    <span style={{ color: "#fb7185" }}>
                      <small>
                        <i>(Company ID required to forward or approve.)</i>
                      </small>
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center w-full space-x-2 xs:space-x-10">
                <div className="w-1/4 text-right">Journey Step:</div>
                <div className="w-3/4">
                  <select
                    className="border-primary text-center md:rounded-[25px] focus:border-primary focus:ring-0 text-xs px-3 py-2 rounded-[25px] cursor-pointer"
                    onChange={(e) => {
                      setJourneyStep(e.target.value);
                    }}
                    value={journeyStep}
                    disabled={isSaving}
                  >
                    <option value={FIRST_STEP}>Step 1</option>
                    <option value={SECOND_STEP}>Step 2</option>
                    <option value={THIRD_STEP}>Step 3</option>
                    <option value={FOURTH_STEP}>Step 4</option>
                    <option value={FIFTH_STEP}>Step 5</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center w-full space-x-2 xs:space-x-10">
                <div className="w-1/4 text-right">IsCompleted:</div>
                <div className="w-3/4 px-2">
                  {props.selectedMember?.isCompleted ? (
                    <p>Complete</p>
                  ) : (
                    <p>In Progress</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center w-full pt-4 space-x-4 space-y-1 md:flex md:w-full">
              <div className="w-1/2 text-right">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-12 py-2 text-base font-semibold text-white transition border rounded-lg cursor-pointer hover:text-primary border-primary bg-primary hover:bg-white disabled:cursor-not-allowed"
                  onClick={() => {
                    onSaveHandler();
                  }}
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
              </div>
              <div className="w-1/2 text-left">
                <button
                  type="button"
                  disabled={isSaving}
                  className={`px-12 py-2 text-white transition-all rounded-lg cursor-pointer admin-box hover:bg-primary ${
                    isSaving && "cursor-not-allowed"
                  }`}
                  onClick={() => props.setIsOpenDetailModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SendEmailModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedID={selectedID}
        selectedEmail={selectedEmail}
        changeApproval={changeApproval}
      />
    </div>
  ) : (
    <div></div>
  );
};

export default JourneyMemberDetailModal;
