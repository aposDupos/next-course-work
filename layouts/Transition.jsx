import {motion} from "framer-motion";

const variants = {
    initial: {
        opacity: 0,
        x: -200,
    },
    animate: {
        opacity: 1,
        x: 0
    },
    exit: {
        opacity: 0,
        x: 500,
    },
    transition: {
        duration: 3
    }
}

export const Transition = ({children}) => {
  return (
      <motion.div variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit" style={{height: "100%"}}>
          {children}
      </motion.div>
  )
}