import { forwardRef } from "react";
import { InputProps } from "../types/type";

//ref 를 다른 component에서도 전달 할 수 있게 forwardRef를 사용
//ref 값전달
const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  function Input({ label, isTextarea, ...props }, ref) {
    const classes =
      "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";
    return (
      <p className="flex flex-col gap-1 my-4">
        <label className="text-sm font-bold uppercase text-stone-500">
          {label}
        </label>
        {isTextarea ? (
          <textarea
            ref={ref as React.RefObject<HTMLTextAreaElement>}
            className={classes}
            {...props}
          />
        ) : (
          <input
            ref={ref as React.RefObject<HTMLInputElement>}
            className={classes}
            {...props}
          />
        )}
      </p>
    );
  }
);

export default Input;
