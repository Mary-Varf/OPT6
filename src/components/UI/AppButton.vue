<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'AppButton'
}
</script>

<style scoped>
.btn {
    padding: 7px 16px 10px 10px;
    border: none;
    border-radius: 5px;
    background-color: var(--blue);
    color: var(--white);
    font-size: 14px;
}
</style>
