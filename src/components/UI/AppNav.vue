<template>
    <div class="navbar">
        <RouterView>
            <RouterLink class="navbar__item" to="/common">Общее</RouterLink>
            <RouterLink class="navbar__item active" to="/">Товар списания</RouterLink>
            <RouterLink class="navbar__item" to="/">Доп. расходы</RouterLink>
        </RouterView>
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
    gap: 25px;
}
.navbar__item {
    color: var(--ashblue);
    font-weight: 600;
}
.navbar__item.active {
    color: var(--black);
}
</style>
