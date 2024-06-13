export type PickOptions = {
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  options: string[][];
};
export const PickOne = ({ value, setValue, options }: PickOptions) => {
  return (
    <div className="flex flex-wrap justify-start gap-1.5 xs:gap-3 kl:gap-6 mt-2 kl:mt-4">
      {options.map((k: string[]) => (
        <button
          key={k[0]}
          type="button"
          className={`${
            value === k[0]
              ? "bg-primary text-white border-2 border-primary"
              : "bg-transparent hover:bg-primary text-primary hover:text-white border-2 border-primary"
          } text-xs xs:text-sm kl:text-2xl px-2 xs:px-3 kl:px-6 py-1 kl:py-2 rounded-full`}
          onClick={() => {
            value === k[0] ? setValue(undefined) : setValue(k[0]);
          }}
        >
          {k.length > 1 ? k[1] : k[0]}
        </button>
      ))}
    </div>
  );
};
