import {motion} from "framer-motion";
import React from "react";
import {Button as ButtonAnt} from "antd";

const variants = {
    initial: {
        scale: 1,
        y: 0,
    },
    hover: {
        scale: 1.1,
        y: 2,
    },
    tap: {
        scale: .9,
        y: 0,
    },
    transition: .3
}
const style = {
    backgroundImage: 'linear-gradient(to right, #fa709a 0%, #fee140 100%)',
    width: "fit-content",
    padding: "8px 12px",
    color: 'white',
    borderRadius: 12,
    cursor: 'pointer'
}
export const Button = ({children, ...props}) => {
    return <motion.div variants={variants}
                       initial={"initial"}
                       whileHover={"hover"}
                       whileTap={"tap"} style={style} {...props}>
        {children}</motion.div>
}