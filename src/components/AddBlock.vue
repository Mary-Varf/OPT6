<template>
    <div class="add-block container">
        <AppButton @click="postContent"
                   v-if="isAddedNewItem">
            <span class="btn--save btn__icon"></span>
            Сохранить
        </AppButton>

        <AppButton @click="addNewRow" v-else>
            <span class="btn--add btn__icon"></span>
            Добавить строку
        </AppButton>
    </div>
</template>

<script>
import AppButton from '@/components/UI/AppButton.vue'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
    name: 'AddBlock',
    components: { AppButton },
    computed: {
        ...mapState({
            isAddedNewItem: (state) => state.isAddedNewItem,
            areFieldsValid: (state) => state.areFieldsValid
        })
    },
    methods: {
        ...mapMutations({
            setStateIsAddedNewItem: 'setStateIsAddedNewItem'
        }),
        ...mapActions({
            postContent: 'postContent'
        }),
        addNewRow() {
            this.toggleStateIsAddedNewItem()
            this.$emit('add-new-row')
        },
        toggleStateIsAddedNewItem() {
            this.setStateIsAddedNewItem(!this.isAddedNewItem)
        },
    }
}
</script>

<style scoped>
.btn {
    cursor: pointer;
}
.btn--add,
.btn--save {
    display: inline-block;
    width: 11px;
    height: 11px;
    background-image: url('../assets/icons/add.svg');
    background-size: 11px 11px;
    background-repeat: no-repeat;
    margin-right: 4px;
}
.btn--add {
    background-image: url('../assets/icons/add.svg');
}
.btn--save {
    background-image: url('../assets/icons/save.svg');
}
.add-block {
    padding: 19px 24px;
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.07);
}
button:disabled {
    cursor: not-allowed;
    background-color: #8f8f8f;
}
@media (max-width: 1023px) {
    .add-block {
        padding: 20px 24px;
    }
}
</style>
