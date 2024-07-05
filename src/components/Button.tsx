type Props = {
  title: any;
  color?: string;
  onClick?: () => void;
  form?: string;
  type?: "button" | "submit";
};

const Button = (props: Props) => {
  return (
    <button
      onClick={props?.onClick}
      form={props.form}
      type={props.type}
      {...props}
      className={`${props.color} py-2 px-4 rounded-xl text-white`}
    >
      {props.title}
    </button>
  );
};

export default Button;
