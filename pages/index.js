import {Image, Row, Typography} from "antd";
import {motion} from "framer-motion";
import styles from "../styles/Home.module.scss"
import {Transition} from "@/layouts/Transition";
import {useRouter} from "next/router";
import {ROUTES} from "@/constants/routes";
import {useGetProductsQuery} from "@/store/api/ordersApi";

export default function Home() {
    const router = useRouter()
    const queryRes = useGetProductsQuery()
    const variants = {
        initial: {
            scale: 1
        },
        hover: {
            scale: 1.1
        },
        tap: {
            scale: .9
        }
    }
    const starVariants = {
        initial: {
            scale: 1,
            rotate: 0
        },
        hover: dir => ({
            scale: .9,
            rotate: dir === 'right' ? 15 : -15,
            y: -4,
            x: dir === 'right' ? 8 : -8
        }),
        tap: dir => ({
            scale: 1.2,
            rotate: dir === 'right' ? -15 : 15,
        })
    }
    const chefVariants = {
        animate: {},
        initial: {}
    }
    const chefTextVariants = {
        initial: {
            y: '50%',
            opacity: 0
        },
        animate: {
            y: -50,
            opacity: 1,
            transition:{
                delay: .5
            }
        }
    }
    return (
        <Transition>
            <Row justify={'center'} align={"middle"} className={styles.Home__container}>
                <motion.div
                    className={`${styles.Home__bgChef} ${styles.Home__bgChef_1}`}
                    variants={chefVariants} animate={'animate'} initial={'initial'}
                >
                    <motion.div variants={chefTextVariants} className={styles.Home__bgChefText}>Эх, сейчас бы пельмешек
                        со сметанкой
                    </motion.div>
                    <Image src={'/chef1.png'} preview={false} className={styles.Home__bgChefImg}/>
                </motion.div>
                <motion.div className={`${styles.Home__bgChef} ${styles.Home__bgChef_2}`}>
                    <motion.div variants={chefTextVariants} className={styles.Home__bgChefText}>Хватит смотреть! Иди заказывай!<img style={{width: 16}} src={'/angry.png'}/>
                    </motion.div>
                    <Image src={'/chef2.png'} preview={false} className={styles.Home__bgChefImg}/>
                </motion.div>
                <Typography.Title level={1} className={styles.Home__text}>Добро пожаловать!</Typography.Title>
                <motion.div
                    className={`${styles.Home__link} ${styles.Home__text}`}
                    variants={variants}
                    whileHover={'hover'}
                    whileTap={'tap'}
                    initial={'initial'}
                    animate={'initial'}
                    onClick={() => router.push(ROUTES.CREATE)}
                >
                    <motion.div variants={starVariants}>
                        <motion.img
                            src={'/stars.png'}
                            className={styles.Home__star}
                        />
                    </motion.div>
                    <motion.div>Cделайте свой заказ</motion.div>
                    <motion.div variants={starVariants}
                                custom={"right"}>
                        <motion.img
                            src={'/stars.png'}
                            className={styles.Home__star}
                        />
                    </motion.div>
                </motion.div>
            </Row>
        </Transition>
    )
}
