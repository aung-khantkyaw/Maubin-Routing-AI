import * as React from "react"
import {
    Frame,
    Map,
    User,
} from "lucide-react"

import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { Header } from "./Header"

// This is sample data.
const data = {
    user: {
        name: "admin",
        email: "admin@example.com",
        avatar: "https://github.com/shadcn.png",
    },
    navbars: [
        {
            name: "Dashboard",
            url: "/admin",
            icon: Frame,
        },
        {
            name: "Routes",
            url: "/admin/routes",
            icon: Map,
        },
        {
            name: "Users",
            url: "/admin/users",
            icon: User,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <Header />
            </SidebarHeader>
            <SidebarContent>
                <NavProjects projects={data.navbars} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
