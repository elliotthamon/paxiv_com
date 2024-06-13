import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

import { AuthContext } from "@/contexts/AuthContext";
import useAISearch from "@/hooks/useAISearch";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  cost: yup.string().required("Cost Allocation and Budget field is required."),
  property: yup.string().required("Type of property field is required."),
  subType: yup.string().required("Property Sub-type field is required."),
  locations: yup.string().required("Market Locations field is required."),
  characteristics: yup
    .string()
    .required("Physical Characteristics field is required."),
  requirements: yup.string().required("Market Requirements field is required."),
  other: yup.string().required("Other Considerations field is required."),
});

const DEFAULT_VALUE = {
  cost: "",
  property: "",
  subType: "",
  locations: "",
  characteristics: "",
  requirements: "",
  other: "",
};

type Props = {
  aiSearchRef: any;
};

const AISearchForm = ({ aiSearchRef }: Props) => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  authContext.handleLoading(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [data] = useState<any>(null);
  const { createAISearch } = useAISearch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    values: data,
    defaultValues: DEFAULT_VALUE,
  });

  const onSubmitHandler = async (data: any) => {
    try {
      setIsSaving(true);
      const res = await createAISearch(data);
      if (res.status) {
        toast.success("Successfully submitted!", {
          theme: "colored",
        });
        setValue("cost", "");
        setValue("property", "");
        setValue("subType", "");
        setValue("locations", "");
        setValue("characteristics", "");
        setValue("requirements", "");
        setValue("other", "");
      } else {
        toast.error("Something went wrong! Please try again.", {
          theme: "colored",
        });
      }
      setIsSaving(false);
    } catch (e: any) {
      setIsSaving(false);
      toast.error("Something went wrong! Please try again.", {
        theme: "colored",
      });
    }
  };
  return (
    <div className="rounded-lg admin-box" ref={aiSearchRef}>
      <div className="pt-8 text-base font-bold text-center text-white">
        *Enter N/A if field is Not Applicable*
      </div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="flex flex-col justify-center mt-1 text-left lg:flex-row">
          <div className="flex flex-col mt-2 ml-0">
            <div className="flex flex-col items-center justify-center w-full mt-4 space-y-6">
              <div className="flex flex-col justify-center w-[300px] md:w-[500px] xl:w-[700px]">
                <label
                  className={`text-base font-bold ${
                    errors.cost ? "text-red-600" : "text-white"
                  }`}
                >
                  Cost Allocation and Budget:
                </label>
                <input
                  type="text"
                  {...register("cost")}
                  className={`mt-2 px-3 py-2 border-2 transition rounded-[8px] bg-transparent text-gray-300 focus:bg-gray-50 focus:text-black ${
                    errors.cost
                      ? "border-red-600 focus:border-red-600 focus:ring-0"
                      : "border-primary focus:outline-none focus:ring-0 focus:border-primary"
                  }`}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                    }
                  }}
                  disabled={isSaving}
                />
                {errors.cost && (
                  <p className="text-red-600 error-text">
                    {errors.cost.message?.toString()}
                  </p>
                )}
              </div>
              <div className="flex flex-col justify-center w-[300px] md:w-[500px] xl:w-[700px]">
                <label
                  className={`text-base font-bold ${
                    errors.property ? "text-red-600" : "text-white"
                  }`}
                >
                  Type of Property: (Commercial, Residential, Agricultural,
                  Industrial)
                </label>
                <input
                  type="text"
                  {...register("property")}
                  className={`mt-2 px-3 py-2 border-2 transition rounded-[8px] bg-transparent text-gray-300 focus:bg-gray-50 focus:text-black ${
                    errors.property
                      ? "border-red-600 focus:border-red-600 focus:ring-0"
                      : "border-primary focus:outline-none focus:ring-0 focus:border-primary"
                  }`}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                    }
                  }}
                  disabled={isSaving}
                />
                {errors.property && (
                  <p className="text-red-600 error-text">
                    {errors.property.message?.toString()}
                  </p>
                )}
              </div>
              <div className="flex flex-col justify-center w-[300px] md:w-[500px] xl:w-[700px]">
                <label
                  className={`text-base font-bold ${
                    errors.subType ? "text-red-600" : "text-white"
                  }`}
                >
                  Property Sub-type: (Retail, Office, Fast Food, Multi-family,
                  Estate Lot Resi)
                </label>
                <input
                  type="text"
                  {...register("subType")}
                  className={`mt-2 px-3 py-2 border-2 transition rounded-[8px] bg-transparent text-gray-300 focus:bg-gray-50 focus:text-black ${
                    errors.subType
                      ? "border-red-600 focus:border-red-600 focus:ring-0"
                      : "border-primary focus:outline-none focus:ring-0 focus:border-primary"
                  }`}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                    }
                  }}
                  disabled={isSaving}
                />
                {errors.subType && (
                  <p className="text-red-600 error-text">
                    {errors.subType.message?.toString()}
                  </p>
                )}
              </div>
              <div className="flex flex-col w-[300px] md:w-[500px] xl:w-[700px]">
                <h3
                  className={`text-base font-bold ${
                    errors.locations ? "text-red-600" : "text-white"
                  }`}
                >
                  Market Locations: (Specific City, County or State(s))
                </h3>
                <textarea
                  {...register("locations")}
                  className={`mt-2 border-2 border-primary px-2 py-2 transition rounded-[8px] bg-transparent text-gray-300 focus:bg-gray-50 focus:text-black ${
                    errors.locations
                      ? "border-red-600 focus:border-red-600 focus:ring-0"
                      : "border-primary focus:outline-none focus:ring-0 focus:border-primary"
                  }`}
                  rows={5}
                  placeholder=""
                  disabled={isSaving}
                ></textarea>
                {errors.locations && (
                  <p className="text-red-600 error-text">
                    {errors.locations.message?.toString()}
                  </p>
                )}
              </div>
              <div className="flex flex-col w-[300px] md:w-[500px] xl:w-[700px]">
                <h3
                  className={`text-base font-bold ${
                    errors.characteristics ? "text-red-600" : "text-white"
                  }`}
                >
                  Physical Characteristics Needed: (Acreage min / max, road
                  frontage, road type etc)
                </h3>
                <textarea
                  {...register("characteristics")}
                  className={`mt-2 border-2 border-primary px-2 py-2 transition rounded-[8px] bg-transparent text-gray-300 focus:bg-gray-50 focus:text-black ${
                    errors.characteristics
                      ? "border-red-600 focus:border-red-600 focus:ring-0"
                      : "border-primary focus:outline-none focus:ring-0 focus:border-primary"
                  }`}
                  rows={5}
                  placeholder=""
                  disabled={isSaving}
                ></textarea>
                {errors.characteristics && (
                  <p className="text-red-600 error-text">
                    {errors.characteristics.message?.toString()}
                  </p>
                )}
              </div>
              <div className="flex flex-col w-[300px] md:w-[500px] xl:w-[700px]">
                <h3
                  className={`text-base font-bold ${
                    errors.requirements ? "text-red-600" : "text-white"
                  }`}
                >
                  Market Requirements: (High income demographics, High traffic
                  counts, Visibility, Multipoint access, Zoning requirements,
                  entitlement concers etc)
                </h3>
                <textarea
                  {...register("requirements")}
                  className={`mt-2 border-2 border-primary px-2 py-2 transition rounded-[8px] bg-transparent text-gray-300 focus:bg-gray-50 focus:text-black ${
                    errors.requirements
                      ? "border-red-600 focus:border-red-600 focus:ring-0"
                      : "border-primary focus:outline-none focus:ring-0 focus:border-primary"
                  }`}
                  rows={5}
                  placeholder=""
                  disabled={isSaving}
                ></textarea>
                {errors.requirements && (
                  <p className="text-red-600 error-text">
                    {errors.requirements.message?.toString()}
                  </p>
                )}
              </div>
              <div className="flex flex-col w-[300px] md:w-[500px] xl:w-[700px]">
                <h3
                  className={`text-base font-bold ${
                    errors.other ? "text-red-600" : "text-white"
                  }`}
                >
                  Other Considerations:
                </h3>
                <textarea
                  {...register("other")}
                  className={`mt-2 border-2 border-primary px-2 py-2 transition rounded-[8px] bg-transparent text-gray-300 focus:bg-gray-50 focus:text-black ${
                    errors.other
                      ? "border-red-600 focus:border-red-600 focus:ring-0"
                      : "border-primary focus:outline-none focus:ring-0 focus:border-primary"
                  }`}
                  rows={5}
                  placeholder=""
                  disabled={isSaving}
                ></textarea>
                {errors.other && (
                  <p className="text-red-600 error-text">
                    {errors.other.message?.toString()}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-row justify-center my-8 space-x-5">
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center px-8 py-2 text-base font-semibold text-white transition rounded-lg cursor-pointer bg-primary hover:bg-gray-100 hover:text-primary border-primary disabled:cursor-not-allowed"
              >
                {isSaving ? "Submitting..." : "Submit"}
              </button>
              <button
                type="button"
                className="flex items-center px-6 py-2 text-base font-semibold transition bg-transparent border rounded-lg cursor-pointer text-primary hover:bg-gray-100 hover:text-primary hover:border-white border-primary"
                onClick={() => router.push("/admin/dashboard")}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AISearchForm;
