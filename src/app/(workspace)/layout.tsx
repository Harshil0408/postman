import { currentUser } from "@/modules/authentication/actions";
import Header from "@/modules/layout/components/header";
import { initializeWorkspace } from "@/modules/workspaces/actions";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const workspace = await initializeWorkspace();
  const user = await currentUser();

  console.log(workspace)

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <>
      <Header user={user} />
      <main className="max-h-[calc(100vh-4rem)] h-[calc(100vh-4rem)] flex flex-1 overflow-hidden">
        <div className="flex h-full w-full">
          <div className="flex-1 bg-zinc-900">{children}</div>
        </div>
      </main>
    </>
  );
};

export default RootLayout;
