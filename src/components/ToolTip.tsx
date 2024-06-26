import { ReactNode } from "react";

function Tooltip({
  message,
  children,
  style,
  visible
}: {
  message: string;
  children: ReactNode;
  style?: string;
  visible?: boolean;
}) {
  return (
    <div className={`relative flex flex-col items-center group  ${style}`}>
      {children}
      <div className="absolute bottom-0 hidden flex-col items-center mb-6 group-hover:flex">
        <span className={"relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-800 shadow-lg rounded-md" }>
          {message}
        </span>
        <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-600" />
      </div>
    </div>
  );
}

export default Tooltip;
