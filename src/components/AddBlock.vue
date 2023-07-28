<template>
    <div class="add-block container">
        <AppButton @click="addNewRow">
            <span class="btn--add btn__icon"></span>
            Добавить строку
        </AppButton>
    </div>
</template>

<script>
import AppButton from '@/components/UI/AppButton.vue'

export default {
    name: 'AddBlock',
    components: { AppButton },
    methods: {
        addNewRow() {
            this.$emit('addNewRow')
        }
    }
}
</script>

<style scoped>
.btn--add {
    display: inline-block;
    width: 11px;
    height: 11px;
    background-image: url('../assets/icons/add.svg');
    background-size: 11px 11px;
    background-repeat: no-repeat;
    margin-right: 4px;
}
.add-block {
    padding: 19px 26px;
}
</style>
