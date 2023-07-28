<template>
    <div class="app">
        <RouterView>
            <h1 class="title">Проведение ТО и мелкий ремонт</h1>
            <AppNav />
            <AddBlock @add-new-row="addNewRow" />
            <AppTable ref="table" />
        </RouterView>
    </div>
</template>

<script>
import AppTable from '@/components/table/AppTable.vue'
import AppNav from '@/components/UI/AppNav.vue'
import AddBlock from '@/components/AddBlock.vue'
import {mapMutations, mapState} from "vuex";
export default {
    components: { AddBlock, AppNav, AppTable },
    computed: {
        ...mapState({
            content: state=>state.content,
        }),
    },
    methods: {
        ...mapMutations({
            setContent: 'setContent',
        }),
        addNewRow() {
            let maxId = this.content.reduce((acc, curr) => (acc.b > curr.id.b ? acc : curr.id));

            this.setContent([
                ...this.content,
                {
                    id: ++maxId,
                    rowPosition: ++this.content.length,
                    name: undefined,
                    price: 0,
                    quantity: 1,
                    itemName: '',
                    total: 1231,
                    additional: true,
                    addedDelivery: true,
                    deliveryPrice: '52',
                    maxWeight: 100,
                }
            ])
        }
    }
}
</script>

<style scoped>
.app {
    background-color: var(--bg);
    padding: 25px;
    margin-left: 50px;
    min-height: 100vh;
    max-width: 1450px;
}
.title {
    margin-bottom: 22px;
}
.navbar {
    margin-bottom: 25px;
}
</style>
