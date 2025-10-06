"use client";

import { Hint } from "@/components/ui/easy-tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { useWorkspaces } from "@/modules/workspaces/hooks/workspaces";
import { useWorkspaceStore } from "../store";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { PlusCircle } from "lucide-react";
import CreateWorkspace from "./create-workspace";
import { useRouter, useSearchParams } from "next/navigation";

const WorkSpace = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: workspaces, isLoading } = useWorkspaces();
  const { selectedWorkspace, setSelectedWorkspace } = useWorkspaceStore();

  useEffect(() => {
    if (!workspaces || workspaces.length === 0) return;

    const wsIdFromUrl = searchParams.get("workspace");

    if (wsIdFromUrl) {
      const ws = workspaces.find((w) => w.id === wsIdFromUrl);
      if (ws && ws.id !== selectedWorkspace?.id) {
        setSelectedWorkspace(ws);
      }
    } else if (!selectedWorkspace) {
      const first = workspaces[0];
      setSelectedWorkspace(first);
      router.replace(`?workspace=${first.id}`);
    }
  }, [
    workspaces,
    searchParams,
    selectedWorkspace,
    setSelectedWorkspace,
    router,
  ]);

  const handleWorkspaceChange = (id: string) => {
    if (!workspaces) return;
    const ws = workspaces.find((w) => w.id === id);
    if (ws) {
      setSelectedWorkspace(ws);
      router.replace(`?workspace=${ws.id}`);
    }
  };

  if (isLoading) {
    return <Skeleton className="h-9 w-[181px] rounded-md" />;
  }

  if (!workspaces || workspaces.length === 0) {
    return (
      <div className="font-semibold text-indigo-400">No Workspace Found</div>
    );
  }

  return (
    <>
      <Hint label="Create Workspace">
        <Select
          value={selectedWorkspace?.id}
          onValueChange={handleWorkspaceChange}
        >
          <SelectTrigger className="border cursor-pointer border-indigo-400 bg-indigo-400/10 hover:bg-indigo-400/20 text-indigo-400 hover:text-indigo-300 flex flex-row items-center space-x-1">
            <span className="text-sm text-indigo-400 font-semibold">
              <SelectValue placeholder="Select workspace" />
            </span>
          </SelectTrigger>
          <SelectContent>
            {workspaces.map((ws) => (
              <SelectItem key={ws.id} value={ws.id}>
                {ws.name}
              </SelectItem>
            ))}
            <Separator className="my-1" />
            <div className="p-2 flex flex-row justify-between items-center">
              <span className="text-sm font-semibold text-zinc-300">
                Create Workspaces
              </span>
              <PlusCircle
                onClick={() => setIsModalOpen(true)}
                size={18}
                className="text-indigo-400 cursor-pointer hover:text-indigo-600 transition"
              />
            </div>
          </SelectContent>
        </Select>
      </Hint>

      <CreateWorkspace
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default WorkSpace;
