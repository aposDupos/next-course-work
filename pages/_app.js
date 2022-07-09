import 'antd/dist/antd.css';
import {Provider} from "react-redux";
import {store} from "@/store/store";
import Layout from "@/layouts/Layout/Layout";
import {AnimatePresence} from "framer-motion"
import '@/styles/globals.css'

function MyApp({Component, pageProps}) {
    return (
        <Provider store={store}>
            <Layout>
                <AnimatePresence exitBeforeEnter initial={false}>
                    <Component {...pageProps} />
                </AnimatePresence>
            </Layout>
        </Provider>
    )
}

export default MyApp
