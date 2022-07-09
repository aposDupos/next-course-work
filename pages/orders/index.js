import {Transition} from "@/layouts/Transition";
import {useGetOrdersQuery} from "@/store/api/ordersApi";
import styles from '../../styles/Orders.module.scss'
import {Divider, Pagination, Select, Spin, Typography} from "antd";
import {Card} from "@/components/Card/Card";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {STATUS} from "@/constants/order";

export default function Orders() {
    const router = useRouter()
    const [currPage, setCurrPage] = useState(1)
    const [status, setStatus] = useState('')

    const {data, isLoading, isFetching} = useGetOrdersQuery({limit: 5, page: currPage, status}, {
        refetchOnMountOrArgChange: true
    })

    useEffect(() => {
        setCurrPage(router.query.page || 1)
    }, [router.query.page])

    useEffect(() => {
        setStatus(router.query.status || null)

    }, [router.query.status])

    const onPageChange = page => router.push({query: {...router.query, page}})
    const onStatusChange = status => {
        setStatus(status)
        router.push({query: {...router.query, status, page: 1}})
    }
    return (
        <Transition>
            <Typography.Title level={2}>Все заказы</Typography.Title>
            <Typography.Title level={4}>Фильтры</Typography.Title>
            <Select
                style={{width: 160}}
                placeholder="Выберите статус"
                onChange={onStatusChange}
                value={status}
            >
                {Object.keys(STATUS).map(statusCode => {
                    return (
                        <Select.Option
                            key={statusCode}
                            value={STATUS[statusCode].code}>
                            {STATUS[statusCode].text}
                        </Select.Option>
                    )
                })}
            </Select>
            <Divider orientation="left"><Typography.Title level={3}>Заказы</Typography.Title></Divider>
            <div className={styles.Orders__wrapper}>
                <div className={styles.Orders}>
                    <div className={styles.Orders__ordersWrapper}>
                        {
                            (isLoading || isFetching)
                                ? <Spin size={'large'}/>
                                : data?.results && data.results.map(order => <Card className={styles.Orders__card}
                                                                                   order={order} key={order.id}/>)
                        }
                    </div>
                </div>
                <div className={styles.Orders__pagination}>
                    <Pagination onChange={onPageChange} current={Number(currPage)} total={data?.count || 20}
                                pageSize={5}
                                responsive={true}/>
                </div>
            </div>
        </Transition>
    )
}