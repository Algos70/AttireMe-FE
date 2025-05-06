import Layout from "../layout/Layout"
import CallToActionSection from "../sections/CallToActionSection"
import CreativeControlSection from "../sections/CreativeControlSection"
import CreativitySection from "../sections/CreativitySection"
import CreatorsFansSection from "../sections/CreatorsFansSection"
import HeroSection from "../sections/HeroSection"
import TrendingStyles from "../sections/TrendingStyles"

const LandingPage = () => {
    // change the title of the page to AttireMe
    document.title = "AttireMe"
    // change the meta description of the page to AttireMe
    document
        .querySelector("meta[name='description']")
        ?.setAttribute("content", "AttireMe is a platform for creators and fans to connect and create together.")
    // change the meta keywords of the page to AttireMe
    document
        .querySelector("meta[name='keywords']")
        ?.setAttribute("content", "AttireMe, creators, fans, connect, create, together")
    // change the meta author of the page to AttireMe
    document
        .querySelector("meta[name='author']")
        ?.setAttribute("content", "AttireMe")
    // change the meta og:title of the page to AttireMe
    document
        .querySelector("meta[property='og:title']")
        ?.setAttribute("content", "AttireMe")
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