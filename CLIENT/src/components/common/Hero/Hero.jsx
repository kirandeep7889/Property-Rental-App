import CountUp from "react-countup";
import { motion } from "framer-motion";
import Logo from "../../../assets/Images/hero-image.png"
// import './Hero.css'

const Hero = () => {
  return (
    <section className=" bg-richblack-800 h-[565px] mt-16 text-white">
      <div className="paddings innerWidth flex justify-around items-end">
        {/* left side */}
        <div className="flex flex-col items-start gap-8">
          <div className="relative">
            <div className=" absolute h-16 w-16 bg-gradient-to-br from-orange-500 to-orange-300 rounded-full -right-8 -top-4" />
            <motion.h1
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 2, type: "ease-in" }}
              className="font-semibold text-4xl sm:text-5xl"
            >
              Discover <br />
              Most Suitable
              <br /> Property
            </motion.h1>
          </div>
          <div className="flex flex-col items-start gap-2">
            <span>Find a variety of properties that suit you very easily</span>
            <span>Forget all difficulties in finding a residence for you</span>
          </div>

          <div className="flex justify-between w-full">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">
                <CountUp start={8800} end={9000} duration={4} /> <span className="text-brown-500">+</span>
              </span>
              <span className="text-sm text-richblack-25">Premium Product</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">
                <CountUp start={1950} end={2000} duration={4} /> <span className="text-brown-500">+</span>
              </span>
              <span className="text-sm text-richblack-25">Happy Customer</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">
                <CountUp end={28} /> <span className="text-brown-500">+</span>
              </span>
              <span className="text-sm text-richblack-25">Awards Winning</span>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="flex justify-center items-center mt-20">
          <motion.div
            initial={{ x: "7rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, type: "ease-in" }}
            className="w-80 h-96 overflow-hidden rounded-full border-8 border-white"
          >
            <img src={Logo} alt="houses" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
