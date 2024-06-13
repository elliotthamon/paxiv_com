export type PickManyOptions = {
  value: undefined | (string | undefined)[];
  setValue: React.Dispatch<
    React.SetStateAction<undefined | (string | undefined)[]>
  >;
  options: (string | string[])[];
};
export const PickMany = ({ value, setValue, options }: PickManyOptions) => {
  return (
    <div className="flex flex-wrap justify-start gap-1.5 xs:gap-3 md:gap-6 kl:gap-12 mt-2 kl:mt-4">
      {options.map((k: string | string[]) => {
        const key = Array.isArray(k) ? k[0] : k;
        const label = Array.isArray(k) ? (k.length > 1 ? k[1] : k[0]) : k;
        return (
          <button
            key={key}
            type="button"
            className={`${
              value?.includes(key)
                ? "bg-primary text-white"
                : "bg-transparent hover:bg-primary text-primary hover:text-white"
            } border-2 border-primary text-xs xs:text-sm kl:text-2xl px-2 xs:px-4 kl:px-8 py-1 kl:py-2 rounded-full`}
            onClick={() => {
              value?.includes(key)
                ? setValue(value.filter((k) => k != key))
                : setValue([...(value ?? []), key]);
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};
