import { FieldValues, UseFormReset } from "react-hook-form";
import Form from "./components/form/Form";
import FormInput from "./components/form/FormInput";
import FormTextarea from "./components/form/FormTextarea";
import FormSelect from "./components/form/FormSelect";

const App = () => {
  const handleSubmit = async (
    data: FieldValues,
    reset: UseFormReset<FieldValues>,
  ) => {};
  return (
    <div className="max-w-[500px] mx-auto my-10">
      <Form onSubmit={handleSubmit}>
        <div className="space-y-3">
          <FormInput label="Name" name="email" />
          <FormSelect
            label="Category"
            name="category"
            required
            options={[
              { value: "", label: "Select a category…" },
              { value: "fruit", label: "Fruit" },
              { value: "veg", label: "Vegetable" },
              { value: "dairy", label: "Dairy" },
            ]}
          />

          <FormInput label="Name" type="date" name="email" />
          <FormTextarea name="text" />
        </div>
      </Form>
    </div>
  );
};

export default App;
