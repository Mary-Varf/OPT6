<template>
    <div class="app">
        <h1 class="title">Проведение ТО&nbsp;и мелкий ремонт</h1>
        <AppNav />
        <AddBlock @add-new-row="addNewRow" />
        <AppTable ref="table" />
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
                    total: 0,
                    additional: true,
                    addedDelivery: true,
                    deliveryPrice: 0,
                    maxWeight: 100,
                }
            ]);

            this.$nextTick(() => {
                this.moveToNewRow(maxId);
            })
        },
        moveToNewRow (id) {
            const newItem = document.getElementById(id);

            newItem.scrollIntoView({block: "start", behavior: "smooth"});
        },
    }
}
</script>

<style scoped>
.app {
    background-color: var(--bg);
    padding: 20px 25px;
    margin-left: 229px;
    min-height: 100vh;
    max-width: 100%;
}
.title {
    margin-bottom: 22px;
}
.navbar {
    margin-bottom: 25px;
}

@media(max-width: 1025px) {
    .app {
        margin-left: 0;
        padding: 16px 10px;
    }
    .title {
        font-size: 30px;
        margin-bottom: 23px;
        line-height: 1.1;
        padding-right: 70px;
    }
}
</style>
