<template>
    <div class="total-container">
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
                <div class="table-total__val">{{ convertNumber(totalPrice) }} руб</div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: 'TotalBlock',
    computed: {
        ...mapState({
            content: state=>state.content,
        }),
        weight() {
            return this.content?.reduce((acc, el) => { return acc + el.maxWeight}, 0);
        },
        quantity () {
            return this.content?.reduce((acc, el) => { return acc + el.quantity}, 0);
        },
        deliveryPrice () {
            return this.content?.reduce((acc, el) => { return acc + (el.addedDelivery ? el.deliveryPrice * el.quantity : 0)}, 0);
        },
        totalPrice () {
            return this.price + this.deliveryPrice;
        },
        price () {
            return this.content?.reduce((acc, el) => { return acc + (el.quantity * el.price)}, 0);
        },
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
    padding: 12px 15px;
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
    margin-bottom: 13px;
}

.table-total__row *{
    font-size: 14px;
}
.table-total__row:last-child {
    margin-bottom: 0;
}
.table-total--bold {
    padding: 13px 15px;
}
.table-total--bold * {
    font-weight: 600;
    margin-bottom: 0;
}
@media(max-width: 1025px) {
    .table-total{
        width: 100%;
        margin-top: 15px;
        padding: 12px 13px 12px 15px;
    }
    .table-total__row {
        letter-spacing: 0.9px;
        margin-bottom: 14px;
    }
    .table-total:last-child {
        margin-top: 0;
    }
    .table-total--bold *{
        font-size: 16px;
        letter-spacing: 0;

    }
    .table-total--bold {
        padding-top: 14px;
    }
}
</style>
