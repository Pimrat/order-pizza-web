import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (

    <>
      <section className="relative h-screen flex flex-col items-center justify-center bg-[#F0F8FF]">

      {/* Content */}
      <section className="relative text-center text-white max-w-2xl px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 3 }}
          className="space-y-6"
        >
          <span className="block text-xl font-medium">Welcome</span>
          <h1 className="text-4xl md:text-5xl font-bold">
            Try Something Amazing
          </h1>
          <p className="text-lg md:text-xl">
            Ordering your favorite Pizza is quick and easy with our app or on our
            website.
          </p>
        </motion.div>

        <div className="flex flex-row gap-4 justify-center mt-8">
          <Link 
            to="/about"
            className="px-6 py-3 border-2 border-gray text-black hover:bg-yellow-500 hover:text-white transition-colors duration-300 rounded-lg"
          >
            About Us
          </Link>
          <Link 
            to="/menu"
            className="px-6 py-3 border-2 border-gray text-black hover:bg-primary hover:text-white transition-colors duration-300 rounded-lg"
          >
            Menu
          </Link>
        </div>
      </section>
    </section>
    </>
  );
}
