import * as React from "react";
import classNames from "classnames";

export const IconButton = (props: { children: any } & any) => {
  const { children, className, ...rest } = props;
  return (
    <button
      type="button"
      className={classNames("btn btn-icon", className)}
      {...rest}
    >
      {children}
    </button>
  );
};
