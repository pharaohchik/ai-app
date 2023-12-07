import { UserButton } from "@clerk/nextjs";

const DashboardPage = () => {
  return (
    <div className="h-screen bg-black flex justify-center">
          <p className='text-3xl text-zinc-400'>
            Hello from my new ai app! 👋
            <UserButton afterSignOutUrl="/"/>
          </p>
    </div>
    );
}

export default DashboardPage;
