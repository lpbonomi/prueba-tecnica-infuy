import { HeaderComponent } from "./HeaderComponent";
export const LayoutComponent = ({ children }) => {
  return (
    <div>
      <HeaderComponent />
      <main>{children}</main>
    </div>
  );
};
