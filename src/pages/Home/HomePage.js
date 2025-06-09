import { useTitle } from "../../hooks/useTitle";

import { Banner, Faq, FeaturedProducts, Testimonials } from "./components";

export const HomePage = () => {
  useTitle("Access Latest Computer Science eBooks");

  return (
    <main>
      <Banner />

      <FeaturedProducts />

      <Testimonials />

      <Faq />      
    </main>
  )
}