const headers = [
    {
        id: 0,
        colPosition: 0,
        type: 'rowPosition',
        name: 'Номер',
        width: 39,
        inputType: 'number'
    },
    {
        id: 1,
        colPosition: 1,
        type: 'additional',
        name: 'Дополнительно',
        width: 10,
        inputType: undefined,
    },
    {
        id: 2,
        colPosition: 2,
        type: 'name',
        name: 'Наименование единицы',
        width: 613,
        inputType: 'text'
    },
    {
        id: 3,
        colPosition: 3,
        type: 'price',
        name: 'Цена',
        width: 206,
        inputType: 'number'
    },
    {
        id: 4,
        colPosition: 4,
        type: 'quantity',
        name: 'Кол-во',
        width: 206,
        inputType: 'number'
    },
    {
        id: 5,
        colPosition: 5,
        type: 'itemName',
        name: 'Название товара',
        width: 157,
        inputType: 'text'
    },
    {
        id: 6,
        colPosition: 6,
        type: 'total',
        name: 'Итого',
        width: 132,
        inputType: 'number'
    },
    {
        id: 7,
        colPosition: -1,
        type: 'addedDelivery',
        name: 'Заложено на доставку',
        width: 100,
    inputType: 'checkbox',
    },
    {
        id: 8,
        colPosition: -1,
        type: 'deliveryPrice',
        name: 'Цена доставки, руб',
        width: 100,
        inputType: 'number',
    },
    {
        id: 9,
        colPosition: -1,
        type: 'maxWeight',
        name: 'Max грузоподъемность, кг',
        width: 100,
        inputType: 'number',
    },
]
const content = [
    {
        id: 0,
        rowPosition: 1,
        additional: true,
        name: 2,
        price: 1231,
        quantity: 12,
        itemName: 'Мраморный щебе',
        addedDelivery: true,
        deliveryPrice: '52',
        maxWeight: 100,
        total: 1233,
    },
    {
        id: 1,
        rowPosition: 2,
        additional: true,
        name: 3,
        price: 1,
        quantity: 12,
        itemName: 'Мраморный щебе',
        addedDelivery: true,
        deliveryPrice: '52',
        maxWeight: 100,
        total: 1233,
    },
    {
        id: 2,
        rowPosition: 3,
        additional: true,
        name: 0,
        price: 12,
        quantity: 12,
        itemName: 'Мраморный щебе',
        addedDelivery: true,
        deliveryPrice: '52',
        maxWeight: 100,
        total: 1233,
    }
]

const options = [
    { id: 0, name: 'Мраморный щебень фр. 6-10 мм, 25кг' },
    { id: 1, name: 'Red щебень фр. 6-10 мм, 25кг' },
    { id: 2, name: 'Blue щебень фр. 6-10 мм, 25кг' },
    { id: 3, name: 'Black щебень фр. 6-10 мм, 25кг' },
    { id: 4, name: 'Yellow щебень фр. 6-10 мм, 25кг' },
    { id: 5, name: 'White щебень фр. 6-10 мм, 25кг' },
    { id: 6, name: 'Orange щебень фр. 6-10 мм, 25кг' }
]
export default {
    content,
    headers,
    options,
}
