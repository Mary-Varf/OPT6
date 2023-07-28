import { createRouter, createWebHistory } from 'vue-router'
import WriteOffGoods from '@/components/WriteOffGoods.vue'
import AdditionalExpenses from '@/components/AdditionalExpenses.vue'
import CommonPage from '@/components/CommonPage.vue'

const routes = [
    {
        path: '/',
        component: WriteOffGoods
    },
    {
        path: '/additional_expenses',
        component: AdditionalExpenses
    },
    {
        path: '/common',
        component: CommonPage
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router
