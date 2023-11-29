import { useRouter } from "next/navigation";
import iconlogo from "../../public/newspaper_2965879.png";
import Image from "next/image";
const LogoMain = () => {
  const router = useRouter();

  function handleHome() {
    router.push("/");
  }
  return (
    <div
      className="flex gap-4 items-center cursor-pointer  "
      onClick={handleHome}
    >
      <Image src={iconlogo} alt="logo" width={40} className="cursor-pointer" />
      <div className="my-0">
        <h2 className=" text-[#673AB7]  flex-wrap-none md:text-2xl text-xl ">
          {" "}
          Globl
        </h2>
        <span className="text-[#673AB7] text-xs ">
          a click far from the world...
        </span>
      </div>
    </div>
  );
};

export default LogoMain;
