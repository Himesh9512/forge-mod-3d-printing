import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="flex flex-col items-center justify-center gap-12 text-left align-baseline md:flex-row md:justify-between">
          {/* More Section */}
          <div>
            <h3 className="mb-4 text-xl font-bold">More</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white text-xl">
                  Forge Mod 3D Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white text-xl">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white text-xl">
                  Materials
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white text-xl">
                  Knowledge Base
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white text-xl">
                  Contact Sales
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white text-xl">
                  Need Help?
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div>
            <h3 className="mb-4 text-xl font-bold">Follow Us</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Image src="/mdi_twitter.svg" alt="Twitter" width={20} height={20} />
                <a href="#" className="hover:text-white text-xl">
                  Twitter
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Image src="/Vector.png" alt="Instagram" width={20} height={20} />
                <a href="#" className="hover:text-white text-xl">
                  Instagram
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Image src="/Ellipse 701.png" alt="LinkedIn" width={20} height={20} />
                <a href="#" className="hover:text-white text-xl">
                  LinkedIn
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Image src="#" alt="Facebook" width={20} height={20} />
                <a href="#" className="hover:text-white text-xl">
                  Facebook
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Image src="#" alt="Reddit" width={20} height={20} />
                <a href="#" className="hover:text-white text-xl">
                  Reddit
                </a>
              </li>
            </ul>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="mb-4 text-xl font-bold">Links</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white text-xl">
                  All 3DP.com
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white text-xl">
                  All 3D Pro
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white text-xl">
                  Metal 3D Printing Services
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
