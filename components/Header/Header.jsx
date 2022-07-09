import {Avatar, Col, Image, Layout, Menu, Row, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import styles from "./Header.module.scss";
import {ROUTES} from "@/constants/routes";
import {motion} from "framer-motion";

const navLinks = [
    {
        label: 'Главная',
        key: ROUTES.MAIN
    },
    {
        label: 'Создать заказ',
        key: ROUTES.CREATE
    },
    {
        label: 'Все заказы',
        key: ROUTES.ORDERS
    },
]


export const Header = () => {
    const router = useRouter()
    const [current, setCurrent] = useState(router.pathname)
    const clickHandler = ({key}) => {
        setCurrent(key)
        router.push(key)
    }

    useEffect(() => {
        setCurrent(router.pathname)
    }, [router.pathname])

    return (
        <Layout.Header className={styles.Header__header}>
            <div className={styles.Header__container}>

                <motion.div style={{cursor: "pointer"}} whileHover={{
                    scale: 1.1, y: [4, -4], transition: {
                        y: {
                            repeat: Infinity,
                            repeatType: 'reverse',
                            stiffness: 2000
                        }
                    },

                }} onClick={()=>window.open('https://github.com/aposDupos', '_blank')}><Avatar size={48} src={'/avatar.jpg'}/></motion.div>

                <Menu className={styles.Header__nav} items={navLinks} selectedKeys={[current]} mode={'horizontal'}
                      onClick={clickHandler}/>

                <Tooltip title={"Это должна была быть корзина, но нет"}><div  className=""><Image preview={false} src={'/bag.png'}/></div></Tooltip>

            </div>
        </Layout.Header>
    )
}