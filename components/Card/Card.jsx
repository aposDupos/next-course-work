import {motion, useAnimationControls} from "framer-motion";
import styles from './Card.module.scss'
import {Typography} from "antd";
import {Button} from "@/components/Button/Button";

export const Card = ({className, order}) => {
    const controls = useAnimationControls()

    const variants = {
        initial: {},
        hover: {
            y: -8,
            scale: 1.1
        }
    }
    const priceVariants = {
        hover: {
            color: 'red',
            fontSize: '24px'
        }
    }
    const handVariants = {
        shake: {
            opacity: 1,
            scale: 2,
            rotate: [45, -45, 45],
            zIndex: 1

        },
        initial: {
            opacity: 0,
            scale: 1,
            rotate: 0,
            zIndex: -1,
            transition: {
                zIndex: {
                    delay: 1
                }
            }
        },
        transition: {
            duration: 1,
        }
    }

    const deleteHandler = async () => {
        await controls.start('shake')
        await controls.start('initial')
    }
    return (
        <div
            className={`${styles.Card} ${className}`}
        >
            <motion.div className={styles.Card__wrapper} variants={variants}
                        whileHover={'hover'}>
                <div className={styles.Card__main}>
                    <Typography.Title level={4} className={styles.Card__title}>
                        Заказ <div className={styles.Card__id}>{order.id}</div>
                    </Typography.Title>
                    <Typography.Title level={5} className="">Продукты</Typography.Title>
                    <div className={styles.Card__products}>
                        {
                            order.products.map((product) => <div key={product.id}
                                                                 className={styles.Card__product}>{product.title}</div>)
                        }
                    </div>
                    <div style={{color: '#334155', fontWeight: 500, marginTop: 12, fontSize: 18}} className="">Сумма
                        заказа: <span>{order.sum}</span></div>
                </div>
                <div className={styles.Card__footer}>
                    <Button onClick={deleteHandler}>Удалить</Button>
                    <motion.img
                        src={'/Hand.png'}
                        className={styles.Card__footerImg}
                        variants={handVariants}
                        animate={controls}
                        initial={'initial'}
                    />
                </div>
            </motion.div>
        </div>
    )
}