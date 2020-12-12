import VueRouter from "vue-router";
import InstallationList from "@/pages/InstallationList";
import NewInstallation from "@/pages/NewInstallation";

const routes = [
    {
        path: '/',
        component: InstallationList
    },
    {
        path: '/new-installation',
        component: NewInstallation
    }
]

const router = new VueRouter({
    routes
});

export default router;