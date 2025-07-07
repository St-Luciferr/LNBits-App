
"use client";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import WalletCard from "@/components/WalletCard";
import Transactions from "@/components/Transactions";
import Statement from "@/components/Statement";
import { useSession } from "next-auth/react";
import { useDashboard } from "@/context/DashboardContext";
export function DashboardContent() {
    const { activeComponent } = useDashboard();
    const { data: session } = useSession();
    return (
        <div className="flex min-h-screen h-full overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex flex-col p-6 pt-2.5 bg-gray-100 w-full">
                {/* Header */}

                {session?.user && (
                    <Header username={session.user.email ?? "User"} />
                )}


                {/* <div className="h-10" /> */}
                {
                    activeComponent === "dashboard" ? (
                        <div className="mt-6">
                            <WalletCard />
                        </div>
                    ) : null
                }


                {/* Transactions */}
                <div className="mt-6">
                    {activeComponent === "dashboard" ? <Transactions /> : <Statement />}
                </div>
            </div>
        </div>
    );
}
