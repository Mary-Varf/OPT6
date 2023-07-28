<template>
    <div class="table-total">
        <div class="table-total__row">
            <div class="table-total__title">Сумма:</div>
            <div class="table-total__val">{{ convertNumber(price) }} руб</div>
        </div>
        <div class="table-total__row">
            <div class="table-total__title">Кол-во:</div>
            <div class="table-total__val">{{ convertNumber(quantity) }} шт</div>
        </div>
        <div class="table-total__row">
            <div class="table-total__title">Общий вес:</div>
            <div class="table-total__val">{{ convertNumber(weight) }} кг</div>
        </div>
    </div>
    <div class="table-total table-total--bold">
        <div class="table-total__row">
            <div class="table-total__title">Общая сумма:</div>
            <div class="table-total__val">{{ convertNumber(price) }} руб</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TotalBlock',
    props: {
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        weight: {
            type: Number,
            required: true
        }
    },
    methods: {
        convertNumber(num) {
            return num.toLocaleString('ru-RU')
        }
    }
}
</script>

<style scoped>
.table-total {
    width: 305px;
    padding: 15px;
    border-radius: 5px;
    border: solid 1px #eeeff1;
    background-color: #fbfcfd;
    margin-bottom: 5px;
    align-self: flex-end;
    font-size: 14px;
}
.table-total__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}
.table-total__row:last-child {
    margin-bottom: 0;
}
.table-total--bold {
    padding: 11px 15px;
}
.table-total--bold * {
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 0;
}
</style>
