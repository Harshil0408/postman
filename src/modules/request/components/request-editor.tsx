import React from "react";
import { useRequestPlaygroundStore } from "../store/use-request-store";
import RequestBar from "./request-bar";
import RequestEditorArea from "./request-editor-area";

const RequestEditor = () => {
  const { tabs, activeTabId, updateTab } = useRequestPlaygroundStore();
  const activeTab = tabs.find((tab) => tab.id === activeTabId) || tabs[0];

  if (!activeTabId) return null;

  return (
    <div className="flex flex-col items-center justify-start py-4 px-4">
      <RequestBar tab={activeTab} updateTab={updateTab} />
      <div className="flex flex-1 flex-col w-full justify-start mt-4 items-center">
        <RequestEditorArea tab={activeTab} updateTab={updateTab} />
      </div>
    </div>
  );
};

export default RequestEditor;
