import Modal from "@/components/ui/modal";
import { useState } from "react";
import { useCreateCollections } from "../hooks/collection";
import { toast } from "sonner";

interface Props {
  workspaceId: string;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

const CreateCollection = ({
  isModalOpen,
  setIsModalOpen,
  workspaceId,
}: Props) => {
  const [name, setName] = useState("");

  const { mutateAsync, isPending } = useCreateCollections(workspaceId);

  const handleSubmit = async () => {
    if (!name.trim()) return;
    try {
      await mutateAsync(name);
      toast.success("Collection created successfully");
      setName("");
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to create collection");
    }
  };

  return (
    <Modal
      title="Add New Collection"
      description="Create a new collection to organize your requests"
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSubmit={handleSubmit}
      submitText={isPending ? "Creating..." : "Create"}
      submitVariant="default"
    >
      <div className="space-y-4">
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Collection name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          name=""
          id=""
        />
      </div>
    </Modal>
  );
};

export default CreateCollection;
