import VueRouter from "vue-router";
import InstallationList from "@/pages/InstallationList";
import NewInstallation from "@/pages/NewInstallation";
import UpdateInstallation from "@/pages/UpdateInstallation";

const routes = [
    {
        path: '/',
        component: InstallationList
    },
    {
        path: '/new-installation',
        component: NewInstallation
    },
    {
        path: '/installations/:id',
        component: UpdateInstallation
    }
]

const router = new VueRouter({
    routes
});

export default router;