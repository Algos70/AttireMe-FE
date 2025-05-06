import Layout from "../layout/Layout"
import CallToActionSection from "../sections/CallToActionSection"
import CreativeControlSection from "../sections/CreativeControlSection"
import CreativitySection from "../sections/CreativitySection"
import CreatorsFansSection from "../sections/CreatorsFansSection"
import HeroSection from "../sections/HeroSection"
import TrendingStyles from "../sections/TrendingStyles"

const LandingPage = () => {
    return(
    <Layout>
        <HeroSection />
        <CreativitySection />
        <CreativeControlSection />
        <CreatorsFansSection />
        <TrendingStyles />
        <CallToActionSection />
    </Layout>)
}

export default LandingPage