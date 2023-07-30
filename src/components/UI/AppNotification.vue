<template>
    <div class="notification">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'AppNotification'
}
</script>

<style scoped>
.notification {
    position: absolute;
    border: 5px;
    padding: 5px 10px;
    bottom: 0;
    right: 0;
    background-color: var(--ashblue);
    color: var(--white);
    opacity: 0.7;
}
</style>
