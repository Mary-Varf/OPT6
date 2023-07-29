<template>
    <input type="checkbox"
           :checked="checked"
           @change="onToggle"
    >
    <span class="checkbox__label"><slot></slot></span>
</template>

<script>
export default {
    name: 'AppCheckbox',
    props: {
        label: {
            type: String,
            default: '',
        },
        checked: {
            type: Boolean,
        },
        id: {
            type: Number,
            required: true,
        }
    },
    methods: {
        onToggle (e) {
            this.$emit('update-checkbox', {id: this.id, checked: e.target.checked});
        },
    },
}
</script>

<style scoped>
.checkbox__label {
    margin-left: 5px;
    font-size: 14px;
}
</style>