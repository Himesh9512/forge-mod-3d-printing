import Image from 'next/image';

const Footer = () => {
  return (
     <footer className="bg-black py-12 text-white">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="flex flex-col md:flex-row md:justify-between gap-12 md:gap-8 w-full">
          {/* More Section */}
          <div className="w-full md:w-1/3">
            <h3 style={{fontSize:'25px'}} className="mb-4  font-bold">More</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {[
                "Forge Mod 3D Blog",
                "About Us",
                "Materials",
                "Knowledge Base",
                "Contact Sales",
                "Need Help?",
              ].map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-white text-lg">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us Section */}
          <div className="w-full md:w-1/3">
            <h3 style={{fontSize:'25px'}} className="mb-4 font-bold">Follow Us</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              {[
                { name: "Twitter", icon: "/mdi_twitter.svg" },
                { name: "Instagram", icon: "/Vector.png" },
                { name: "LinkedIn", icon: "/Group 69.png" },
                { name: "Facebook", icon: "/ic_baseline-facebook.png" },
                { name: "Reddit", icon: "/ic_baseline-reddit.png" },
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Image src={item.icon} alt={item.name} width={20} height={20} />
                  <a href="#" className="hover:text-white text-lg">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Section */}
          <div className="w-full md:w-1/3">
            <h3 style={{fontSize:'25px'}} className="mb-4  font-bold">Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {[
                "All 3DP.com",
                "All 3D Pro",
                "Metal 3D Printing Services",
              ].map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-white text-lg">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
