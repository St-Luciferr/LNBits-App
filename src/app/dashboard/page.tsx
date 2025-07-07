import { DashboardProvider } from "@/context/DashboardContext";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardContent }from "@/components/DashboardContent";

export default async function Dashboard() {
    const activeSession = await getServerSession(authOptions);
    if (!activeSession) {
        console.log("No active session found, redirecting to login");
        redirect("/login");
    }

    return (
        <DashboardProvider>
            <DashboardContent />
        </DashboardProvider>
    );
}

