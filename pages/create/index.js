import {Transition} from "@/layouts/Transition";
import {Divider, message, Radio, Typography} from "antd";
import {Products} from "@/components/Products/Products";
import {Button} from "@/components/Button/Button";
import {useCreateOrderMutation, useGetProductsQuery} from "@/store/api/ordersApi";
import {useDispatch, useSelector} from "react-redux";
import {clearProducts} from "@/store/slices/orderSlice";
import {PRODUCT_SORT} from "@/constants/order";
import {useEffect, useMemo, useState} from "react";

export default function Create() {
    const [sort, setSort] = useState(PRODUCT_SORT.DEFAULT)
    const [createOrder, {isLoading, isFetching}] = useCreateOrderMutation()
    const {products} = useSelector(state => state.order)
    const dispatch = useDispatch()
    const createOrderHandler = async () => {
        if (!products.length) return message.warn('Набери побольше продуктов')
        const order = JSON.stringify({
            products, user: 1
        })
        createOrder(order)
        dispatch(clearProducts())
    }
    const radioOptions = [
        {
            label: 'По возрастанию цены',
            value: PRODUCT_SORT.MIN_PRICE
        },
        {
            label: 'По убыванию цены',
            value: PRODUCT_SORT.MAX_PRICE
        },{
            label: 'По умолчанию',
            value: PRODUCT_SORT.DEFAULT
        },
    ]
    const sortHandler = ({target: {value}}) => {
        setSort(value)
    }

    return (
        <Transition>
            <Typography.Title level={2}>Создать заказ</Typography.Title>
            <Typography.Title level={3}>Продукты</Typography.Title>
            <Typography.Title level={4}>Отсортировать по</Typography.Title>
            <Divider><Radio.Group
                options={radioOptions}
                defaultValue={PRODUCT_SORT.DEFAULT}
                onChange={sortHandler}
                optionType="button"
                buttonStyle="solid"
            /></Divider>
            <Products sortType={sort}/>
            <Button onClick={createOrderHandler}>Заказать</Button>
        </Transition>
    )
}