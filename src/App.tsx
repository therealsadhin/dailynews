import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { NewsGrid } from "./components/NewsGrid";
import { Footer } from "./components/Footer";
import { ArticlePage } from "./pages/ArticlePage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/TermsOfService";
import { CookiePolicy } from "./pages/CookiePolicy";
import { GDPRPolicy } from "./pages/GDPRPolicy";
import { TestNews } from "./pages/TestNews";
import { TrendingPage } from "./pages/TrendingPage";
import { LatestPage } from "./pages/LatestPage";
import { SubscribePage } from "./pages/SubscribePage";
import { Toaster } from "sonner";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<NewsGrid />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/gdpr" element={<GDPRPolicy />} />
          <Route path="/test" element={<TestNews />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/latest" element={<LatestPage />} />
          <Route path="/subscribe" element={<SubscribePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;