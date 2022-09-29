import { FC } from "react";
import { Triangle } from "react-loader-spinner";
import "./loader.scss";

const Loader: FC = () => {
  return (
    <div className="loader" data-testid="loader">
      <Triangle height="80" width="80" ariaLabel="loading" />
    </div>
  );
};

export default Loader;
