<template>
    <div class="navbar">
            <a href="#" class="navbar__item">Общее</a>
            <a href="#" class="navbar__item active">Товар списания</a>
            <a href="#" class="navbar__item">Доп. расходы</a>
    </div>
</template>

<script>
export default {
    name: 'AppNav'
}
</script>

<style scoped>
.navbar {
    display: flex;
    gap: 21.5px;
    letter-spacing: 0.2px;
}
.navbar__item {
    color: var(--ashblue);
    font-weight: 600;
}
.navbar__item.active {
    color: var(--black);
}
</style>
