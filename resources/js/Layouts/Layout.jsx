import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ChatBot from '../Components/ChatBot';
import ScrollToTop from '../Components/ScrollToTop';
import '../styles/global.css';

export default function Layout({ children }) {
    return (
        <div className="app">
            <Navbar />
            <main className="main-content">
                {children}
            </main>
            <Footer />
            <ChatBot />
            <ScrollToTop />
        </div>
    );
}
