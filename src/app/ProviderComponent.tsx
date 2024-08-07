"use client";
import React, { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

interface Props {
  children: ReactNode;
}

const ProviderComponent: FC<Props> = ({ children }) => {
  return (
    <div>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      </Provider>
    </div>
  );
};

export default ProviderComponent;
