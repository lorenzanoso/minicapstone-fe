import Hero from "../Hero";
import Specials from "../Specials";
import Banner from "../Banner";
import Blogs from "../Blogs";
import Footer from "../Footer";
import Products from "./Products";
import Collections from "./Collections";

export default function Home() {
  return (
    <>
      <Hero />
      <Collections />
      <Products />
      <Specials />
      <Banner />
      <Blogs />
      <Footer />
    </>
  );
}
