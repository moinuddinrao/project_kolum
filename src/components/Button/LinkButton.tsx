import React, { MouseEvent } from "react";

interface LinkButtonProps {
  href?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: (event: MouseEvent<HTMLSpanElement>) => void;
}

/**
 * A button that navigates to a specified URL when clicked.
 * @param {string} href - The URL to navigate to when the button is clicked.
 * @param {React.ReactNode} children - The content of the button.
 * @param {React.CSSProperties} style - The style of the button.
 * @param {function} onClick - The function to call when the button is clicked.
 *
 * ❗️Warning❗️: If both `href` and `onClick` are specified, `onClick` will be ignored.
 *
 * @example <LinkButton href="https://www.google.com">Google</LinkButton>
 *
 * */
export const LinkButton: React.FC<LinkButtonProps> = ({
  href,
  children,
  style,
  onClick,
}) => {
  const linkStyle: React.CSSProperties = {
    cursor: "pointer",
    ...style,
  };

  const handleLinkClick = (event: MouseEvent<HTMLSpanElement>) => {
    if (href) {
      window.location.href = href;
      return;
    }

    onClick?.(event);
  };

  return (
    <span style={linkStyle} onClick={handleLinkClick}>
      {children}
    </span>
  );
};
