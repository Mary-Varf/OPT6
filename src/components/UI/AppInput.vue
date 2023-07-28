<template>
    <input class="app-input" :value="modelValue" :type="type" @input="updateInput" />
</template>

<script>
export default {
    name: 'AppInput',
    props: {
        modelValue: [String, Number],
        type: String
    },
    methods: {
        updateInput(e) {
            this.$emit('update:modelValue', e.target.value)
        }
    }
}
</script>

<style scoped>
.app-input {
    border-radius: 5px;
    border: solid 1px #ccc;
    padding: 10px 6px 10px 15px;
    background-color: var(--white);
    width: 100%;
}
.app-input:hover,
.app-input:focus {
    border: 1px solid var(--ashblue);
    outline: none;
}
</style>
