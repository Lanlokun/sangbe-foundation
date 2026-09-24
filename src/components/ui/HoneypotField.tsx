type HoneypotFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function HoneypotField({
  value,
  onChange,
}: HoneypotFieldProps) {
  return (
    <div
      aria-hidden="true"
      className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
    >
      <label htmlFor="website">
        Website
      </label>

      <input
        id="website"
        name="website"
        type="text"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}