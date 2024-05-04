import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Navbar/Header";
// import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { motion, AnimatePresence } from 'framer-motion';

export default function RootLayout() {
    return (
        <>
            <div className="parent" id="detail">
                <Header />
                <div style={{ minHeight: '65vh' }}>
                    <AnimatePresence >
                        <motion.div
                            // key={location.pathname}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* <TransitionGroup>
                        <CSSTransition
                            key={location.key}
                            classNames="fade"
                            timeout={500}
                        > */}
                            <Outlet />
                            {/* </CSSTransition>
                    </TransitionGroup> */}
                        </motion.div>
                    </AnimatePresence>
                </div>
                <Footer />
            </div>
        </>
    );
}