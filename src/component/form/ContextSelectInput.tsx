import { Form, Select } from "antd";
import { Rule } from "antd/es/form";
import { Controller } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
  options: { label: string; value: string | number }[];
  rules?: Rule[] | undefined;
  placeholder?: string;
};

const ContextSelectInput = ({
  name,
  label,
  options,
  rules,
  placeholder,
}: TInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item
            labelCol={{ span: 24, style: { textAlign: "start" } }}
            wrapperCol={{ span: 24 }}
            label={label}
            rules={rules}
            name={name}
          >
            <Select
              {...field}
              style={{ width: "100%", borderRadius: "0" }}
              options={options}
              placeholder={placeholder}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default ContextSelectInput;
