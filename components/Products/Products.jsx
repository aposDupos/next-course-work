import {Avatar, Spin, Typography} from "antd";
import {useGetProductsQuery} from "@/store/api/ordersApi";
import {motion} from "framer-motion";
import styles from './Products.module.scss'
import {cardVariants} from "@/components/Products/variants";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addProduct, removeProduct} from "@/store/slices/orderSlice";
import {PRODUCT_SORT} from "@/constants/order";

const ProductCard = ({product, index, isInCart}) => {
    const [isAdded, setIsAdded] = useState(false)

    const dispatch = useDispatch()
    const clickHandler = () => {
        const id = product.id
        if (!isInCart) {
            dispatch(addProduct(id))
        } else {
            dispatch(removeProduct(id))
        }
    }

    return (
        <motion.div
            variants={cardVariants}
            custom={index}
            initial={'hidden'}
            animate={"visible"}
            whileHover={{boxShadow: '0px 0px 10px 2px rgba(0, 0, 0, 0.25)'}}
            className={styles.Products__card}
        >
            <Avatar shape={"square"} src={'/pinjata.png'} size={"large"}
                    style={{backgroundColor: "rgba(0, 0, 0, 0.1)", padding: 4}}/>
            <Typography.Title level={5} style={{marginTop: 12}}>{product.title}</Typography.Title>
            <Typography.Paragraph>{product.description}</Typography.Paragraph>
            <div className={styles.Products__cardPrice}>{product.count} шт. по {product.price} Р/шт</div>
            <motion.button
                className={styles.Products__btn}
                whileHover={{scale: 1.1, y: -4}}
                whileTap={{scale: .9, y: -4}}
                onClick={clickHandler}
            >{isInCart ? 'Не хочу' : 'Хочу'}
            </motion.button>
        </motion.div>
    )
}

export const Products = ({sortType}) => {
    const {
        data: {results: fetchedProducts = []} = {},
        isLoading,
        isFetching,
        isSuccess,
        isError
    } = useGetProductsQuery()
    const {products} = useSelector(state => state.order)
    const [sortedProducts, setSortedProducts] = useState([])

    useEffect(() => {
        fetchedProducts.length && setSortedProducts([...fetchedProducts])
    }, [fetchedProducts])

    useEffect(() => {
        switch (sortType) {
            case PRODUCT_SORT.DEFAULT:
                setSortedProducts([...fetchedProducts])
                break
            case PRODUCT_SORT.MIN_PRICE:
                setSortedProducts([...sortedProducts.sort((a, b) => a.price - b.price)])
                break
            case PRODUCT_SORT.MAX_PRICE:
                setSortedProducts([...sortedProducts.sort((a, b) => b.price - a.price)])
                break
        }
    }, [sortType])

    let content

    if (isLoading || isFetching) {
        content = <Spin size={"large"}
                        style={{height: 200, display: "flex", justifyContent: "center", alignItems: "center"}}/>
    } else if (isSuccess) {
        content = (
            <div className={styles.Products__wrapper}>
                {sortedProducts.map((product, index) => (
                    <ProductCard isInCart={products.includes(product.id)}
                                 index={index} product={product}
                                 key={product.id}/>))}
            </div>
        )
    }


    return <>{content}</>
}