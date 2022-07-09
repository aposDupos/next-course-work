export const cardVariants = {
    visible: i => ({
        opacity: 1,
        x: [16, -4, 0],
        transition: {
            delay: i * 0.1,
            x: {
                duration: .3
            }
        },
    }),
    hidden: { opacity: 0 },
}