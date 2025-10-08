import React from "react";
import { RequestTab } from "../store/use-request-store";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface Props {
  tab: RequestTab;
  updateTab: (id: string, data: Partial<RequestTab>) => void;
}

const RequestBar = ({ tab, updateTab }: Props) => {
  const onSendRequest = () => {};

  const requestColorMap: Record<string, string> = {
    GET: "text-green-500",
    POST: "text-blue-500",
    PUT: "text-yellow-500",
    DELETE: "text-red-500",
  };

  return (
    <div className="flex flex-row items-center justify-between bg-zinc-900 rounded-md px-2 py-2 w-full">
      <div className="flex flex-row items-center gap-2 flex-1">
        <Select
          value={tab.method}
          onValueChange={(value) => updateTab(tab.id, { method: value })}
        >
          <SelectTrigger
            className={`w-24 py-6 px-4 ${
              requestColorMap[tab.method] || "text-gray-500"
            }`}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="GET" className="text-green-500">
                GET
              </SelectItem>
              <SelectItem value="POST" className="text-blue-500">
                POST
              </SelectItem>
              <SelectItem value="PUT" className="text-yellow-500">
                PUT
              </SelectItem>
              <SelectItem value="DELETE" className="text-red-500">
                DELETE
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          value={tab.url ?? ""}
          onChange={(e) => updateTab(tab.id, { url: e.target.value })}
          placeholder="www://google.com"
          className="flex-1 py-6"
        />
      </div>
      <Button
        type="submit"
        onClick={onSendRequest}
        disabled={!tab.url} 
        className="ml-2 text-white py-6 px-2 font-bold bg-indigo-500 hover:bg-indigo-600"
      >
        <Send className="mr-2" /> Send
      </Button>
    </div>
  );
};

export default RequestBar;
