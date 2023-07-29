<template>
    <div class="app">
        <h1 class="title">Проведение ТО&nbsp;и мелкий ремонт</h1>
        <AppNav />
        <AddBlock @add-new-row="addNewRow"/>

        <div v-if="dataIsLoaded" class="loading">
            <div class="lds-dual-ring"></div>
        </div>
        <AppTable ref="table"
                  v-else
        />
    </div>
</template>

<script>
import AppTable from '@/components/table/AppTable.vue'
import AppNav from '@/components/UI/AppNav.vue'
import AddBlock from '@/components/AddBlock.vue'
import {mapActions, mapState} from "vuex";

export default {
    components: { AddBlock, AppNav, AppTable },
    computed: {
        ...mapState({
            content: state=>state.content,
            isAddedNewItem: state=>state.isAddedNewItem,
            dataIsLoaded: state=> state.dataIsLoaded,
        }),
    },
    created() {
        this.getContent();
        this.getHeaders();
        this.getOptions();
    },
    methods: {
        ...mapActions({
            addEmptyRow: 'addEmptyRow',
            getContent: 'getContent',
            getHeaders: 'getHeaders',
            getOptions: 'getOptions',
        }),
        addNewRow() {
            let maxId = this.content.reduce((acc, curr) => (acc.b > curr.id.b ? acc : curr.id));

            this.addEmptyRow(++maxId);
            this.$nextTick(() => {
                this.moveToNewRow(maxId);
            })
        },
        moveToNewRow (id) {
            const newItem = document.getElementById(id);

            newItem?.scrollIntoView({block: "start", behavior: "smooth"});
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
.loading {
    display: flex;
    justify-content: center;
}
.lds-dual-ring {
    display: inline-block;
    width: 80px;
    height: 80px;
}
.lds-dual-ring:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid var(--ashblue);
    border-color: #fff transparent var(--ashblue) transparent;
    animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
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
