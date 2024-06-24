import { Form, Input, InputNumber } from "antd";
import { Rule } from "antd/es/form";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: "text" | "number";
  name: string;
  label?: string;
  rules?: Rule[] | undefined;
  placeholder?: string;
};

const ContextInput = ({
  type,
  name,
  label,
  rules,
  placeholder,
}: TInputProps) => {
  return (
    <div>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item
            labelCol={{ span: 24, style: { textAlign: "start" } }}
            wrapperCol={{ span: 24 }}
            label={label}
            name={name}
            rules={rules}
          >
            {type === "text" && (
              <Input
                placeholder={placeholder}
                {...field}
                type={type}
                id={name}
                style={{ borderRadius: "0" }}
              />
            )}
            {type === "number" && (
              <InputNumber
                style={{ width: "100%", borderRadius: "0" }}
                {...field}
                type={type}
                id={name}
              />
            )}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default ContextInput;
