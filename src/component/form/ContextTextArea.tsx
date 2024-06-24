import { Form } from "antd";
import { Rule } from "antd/es/form";
import TextArea from "antd/es/input/TextArea";
import { Controller } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
  rules?: Rule[] | undefined;
  placeholder?: string;
  style?: React.CSSProperties;
};

const ContextTextArea = ({
  name,
  label,
  rules,
  placeholder,
  style,
}: TInputProps) => {
  return (
    <div>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item
            labelCol={{ span: 24, style: { textAlign: "start" } }}
            wrapperCol={{ span: 24 }}
            name={name}
            rules={rules}
            label={label}
          >
            <TextArea
              placeholder={placeholder}
              {...field}
              id={name}
              style={{ borderRadius: "0", height: "300px", ...style }}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default ContextTextArea;
