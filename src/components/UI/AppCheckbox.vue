<template>
    <input type="checkbox" :checked="checked" @change="onToggle" ref="checkbox" />
    <label class="checkbox__label"><slot></slot></label>
</template>

<script>
export default {
    name: 'AppCheckbox',
    props: {
        label: {
            type: String,
            default: ''
        },
        checked: {
            type: Boolean
        },
        id: {
            type: Number,
            required: true
        }
    },
    methods: {
        onToggle() {
            this.$emit('update-checkbox', { id: this.id, checked: this.$refs.checkbox.checked })
        }
    }
}
</script>

<style scoped>
.checkbox__label {
    margin-left: 5px;
    font-size: 14px;
}
</style>
