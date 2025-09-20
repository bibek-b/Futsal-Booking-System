import { motion } from "framer-motion";

//about
export const fadeUp = {
    hidden: {opacity: 0, y: 30},
    visible: {
        opacity: 1,
        y: 1,
        transition: {
            duration: 1,
            ease: "easeOut"
        }
    }
}

export const fadeLeft = {
    hidden: {opacity: 0 , x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 1.5,
            ease: "easeIn",
        }
    }
}

export const blurIn = {
    hidden: { filter: "blur(10px)" },
    visible: {
        filter: "blur(0px)",
        transition: {
            duration: 2,
        }
    }
}

//book futsal
export const scaleUp = {
    hidden: {opacity: 0, scale: 0},
    visible: {
        opacity: 1,
        scale: 1,

        transition: {
            duration: 1.5
        }
    }
}

export const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
}

export const fadeInRight = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 60,
            damping: 12
        }
    }
}