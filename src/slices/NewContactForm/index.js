import { Bounded } from "@/components/Bounded";

const Field = ({ label, children }) => {
  return (
    <label>
      <span className="text-sm text-slate-500">{label}</span>
      {children}
    </label>
  );
};

const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
}) => {
  return (
    <Field label={label}>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-none border-b border-slate-200 py-3 pl-3 pr-7 text-slate-800 placeholder-slate-400"
      />
    </Field>
  );
};

const RadioField = ({ label, name, options, required = true }) => {
  return (
    <Field label={label}>
      <div className="flex space-x-4">
        {options.map((option) => (
          <label key={option} className="flex items-center">
            <input
              type="radio"
              name={name}
              value={option.toLowerCase()}
              required={required}
              className="form-radio"
            />
            <span className="ml-2">{option}</span>
          </label>
        ))}
      </div>
    </Field>
  );
};

const SelectField = ({ label, name, options, required = true }) => {
  return (
    <Field label={label}>
      <select
        name={name}
        required={required}
        className="w-full rounded-none border-b border-slate-200 py-3 pl-3 pr-7 text-slate-800"
      >
        <option value="">-- Select Age --</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Field>
  );
};

const TextareaField = ({ label, name, placeholder, required = true }) => {
  return (
    <Field label={label}>
      <textarea
        name={name}
        required={required}
        placeholder={placeholder}
        className="h-40 w-full rounded-none border-b border-slate-200 py-3 pl-3 pr-7 text-slate-800 placeholder-slate-400"
      />
    </Field>
  );
};

const NewContactForm = ({ slice }) => {
  const ageOptions = ["10s", "20s", "30s", "40s", "50s", "60s"];

  return (
    <Bounded as="section" size="small" data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <form
        action="/api/contact"
        method="post"
        className="grid grid-cols-1 gap-6"
      >
        <InputField label="Name" name="name" placeholder="Jane Doe" />
        <RadioField label="Gender" name="gender" options={["Male", "Female", "Others"]} />
        <SelectField label="Age" name="age" options={ageOptions} />
        <InputField
          label="Email Address"
          name="email"
          type="email"
          placeholder="jane.doe@example.com"
        />
        <TextareaField
          label="Message"
          name="message"
          placeholder="Write your message here…"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-gray-800 text-white rounded-md"
          >
            Send
          </button>
        </div>
      </form>
    </Bounded>
  );
};

export default NewContactForm;
