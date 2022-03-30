import {createRouter, createWebHistory} from 'vue-router'
import EventList from '../views/EventList.vue'
import About from '../views/About.vue'
import EventDetails from '../views/event/Details'
import EventEdit from '../views/event/Edit'
import EventRegister from '../views/event/Register'
import EventLayout from '../views/event/Layout'
import NotFound from '../views/NotFound'
import NetworkError from "../views/NetworkError";


const routes = [
    {
        path: '/',
        name: 'EventList',
        component: EventList,
        props: route => ({page: parseInt(route.query.page) || 1})
    },
    {
        path: '/events/:id',  //event -> events
        name: 'EventLayout',
        props: true,
        component: EventLayout,
        children: [
            {
                path: '',
                name: 'EventDetails',
                component: EventDetails,

            },
            {
                path: 'register',
                name: 'EventRegister',
                component: EventRegister,

            },
            {
                path: 'edit',
                name: 'EventEdit',
                component: EventEdit,

            },]

    },
    // {
    //     path: '/event/:id',
    //     redirect: () => { //to
    //         return {name: 'EventDetails'} //{name: 'EventDetails', params:{id:to.params.id}
    //     },
    //     children: [
    //         {path:'register', redirect:()=>({name:'EventRegister'})},
    //         {path:'edit',redirect:()=>({name:'EventEdit'})}
    //     ]
    // },
    {
        path:'/event/:afterEvent(.*)',
        redirect: to=>({path: '/events/'+to.params.afterEvent})
    },

    {
        path: '/about-us',
        name: 'About',
        component: About,
        // alias:'/about'

    },
    {
        path: '/about',
        redirect: {name: 'About'}
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound
    },
    {
        path:'/404/:resource',
        name:'404Resource',
        component: NotFound,
        props:true,
    },
    {
        path: '/network-error',
        name: 'NetworkError',
        component: NetworkError,
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
