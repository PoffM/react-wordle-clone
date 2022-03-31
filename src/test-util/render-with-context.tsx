import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MotionConfig } from "framer-motion";
import { ReactElement } from "react";

export function renderWithContext(jsx: ReactElement) {
  const ui = render(jsx, {
    wrapper: ({ children }) => (
      <MotionConfig reducedMotion="always">{children}</MotionConfig>
    ),
  });
  const user = userEvent.setup();

  return { ui, user };
}
