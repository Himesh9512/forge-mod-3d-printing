import Section from '@/components/layouts/Section';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <main>
        <section className="bg-black py-20 text-white">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-16 px-6 md:flex-row">
            {/* Left Content */}
            <div className="flex-1">
              <h1 className="text-6xl font-bold leading-tight">
                Forge Mode <br /> Customizations
              </h1>
              <p className="mt-6 text-xl text-gray-300">Fabrication, 3D printing, Cosplay and props</p>

              {/* Shop Links */}
              <div className="mt-6 flex gap-6">
                <p className="font-bold text-red-50">
                  <u>SHOP</u>
                </p>
                <a href="#" className="text-white underline hover:text-gray-400">
                  Etsy
                </a>
              </div>

              {/* Stats */}
              <div className="mt-8 flex gap-12">
                <div className="rounded-full bg-gray-700 p-3 px-10 text-center">
                  <div className="text-xl font-semibold">10K+</div>
                  <div className="mt-1 text-sm text-gray-300">Prints</div>
                </div>
                <div className="rounded-full bg-gray-700 p-3 px-10 text-center">
                  <div className="text-xl font-semibold">5K+</div>
                  <div className="mt-1 text-sm text-gray-300">Custom models</div>
                </div>
                <div className="rounded-full bg-gray-700 p-3 px-10 text-center">
                  <div className="text-xl font-semibold">15K+</div>
                  <div className="mt-1 text-sm text-gray-300">3D Models</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex flex-1 justify-center">
              <div className="rounded-full bg-gray-700 p-4">
                <Image
                  src="/R2 1.svg" // replace with your image
                  alt="3D model"
                  height={400}
                  width={400}
                  className="rounded-full object-contain"
                />
              </div>
            </div>
          </div>
        </section>
        <Section heading="Service We Provide">
          <section className="bg-[#0b0b0b] py-16">
            <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-3">
              {/* Card 1 */}
              <div className="relative rounded-2xl border border-white/20 bg-white/10 p-6 text-white shadow-xl backdrop-blur-md">
                <div className="absolute left-4 top-4 rounded-lg bg-white/20 px-3 py-1 text-lg font-bold">1</div>
                <div className="mb-4 flex justify-center">
                  <Image src="/3d-printing.png" alt="3D Printing" height={310} width={222} />
                </div>
                <h3 className="text-center text-xl font-semibold">3D Printing</h3>
                <p className="mt-2 text-center text-sm text-gray-300">
                  We support over 35 file formats including STL, OBJ, STEP, ZIP. All uploads are secure and
                  confidential.
                </p>
                <button className="mt-6 w-full rounded-md bg-yellow-400 py-2 font-semibold text-black hover:bg-yellow-300">
                  Get Your Model 3D Print
                </button>
              </div>

              {/* Card 2 */}
              <div className="relative rounded-2xl border border-white/20 bg-white/10 p-6 text-white shadow-xl backdrop-blur-md">
                <div className="absolute left-4 top-4 rounded-lg bg-white/20 px-3 py-1 text-lg font-bold">2</div>
                <div className="mb-4 flex justify-center">
                  <Image src="/3d-modeling.png" alt="3D Modeling" height={310} width={222} />
                </div>
                <h3 className="text-center text-xl font-semibold">3D Modeling</h3>
                <p className="mt-2 text-center text-sm text-gray-300">
                  Our catalog contains more than 20 different technologies and over 100 materials, with a variety of
                  finish and color options.
                </p>
                <button className="mt-6 w-full rounded-md bg-yellow-400 py-2 font-semibold text-black hover:bg-yellow-300">
                  Get 3D Model
                </button>
              </div>

              {/* Card 3 */}
              <div className="relative rounded-2xl border border-white/20 bg-white/10 p-6 text-white shadow-xl backdrop-blur-md">
                <div className="absolute left-4 top-4 rounded-lg bg-white/20 px-3 py-1 text-lg font-bold">3</div>
                <div className="mb-4 flex justify-center">
                  <Image src="/custom-printing.png" alt="Custom 3D" height={310} width={222} />
                </div>
                <h3 className="text-center text-xl font-semibold">Custom 3D Modeling & Printing</h3>
                <p className="mt-2 text-center text-sm text-gray-300">
                  Choose your preferred manufacturer from over 150 professional services and receive your order fast and
                  hassle-free.
                </p>
                {/* <Button className="bg-yellow-400 hover:bg-yellow-300 text-black mt-6 w-full rounded-md py-2 font-semibold">
                  Get Model & 3D Print Idea
                </Button> */}
                <button className="mt-6 w-full rounded-md bg-yellow-400 py-2 font-semibold text-black hover:bg-yellow-300">
                  Get 3D Model
                </button>
              </div>
            </div>
          </section>
        </Section>
        <Section heading="Our Services">
          <Image src="/shutterstock_1029948412.jpg 1.svg" alt="Image" height={1200} width={660} />
          <section className="bg-black px-6 py-16">
            <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
              {/* Card 1 */}
              <div className="glass-card rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <div className="mb-2 text-2xl font-bold text-white">1. Enhanced Visual Appeal</div>
                <p className="text-sm text-gray-300">
                  Character models bring designs to life by adding personality, which can make materials more engaging.
                  For marketing or storytelling, character models grab attention and help communicate messages
                  effectively.
                </p>
              </div>

              {/* Card 2 */}
              <div className="glass-card rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <div className="mb-2 text-2xl font-bold text-white">2. Customizability</div>
                <p className="text-sm text-gray-300">
                  Character models can be customized to fit brand identity, audience preferences, and specific themes.
                  This flexibility allows businesses to create unique characters that resonate with their target market,
                  reinforcing brand image.
                </p>
              </div>

              {/* Card 3 */}
              <div className="glass-card rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <div className="mb-2 text-2xl font-bold text-white">3. High Quality and Detail</div>
                <p className="text-sm text-gray-300">
                  Character model printing often involves high-resolution printing technology that captures intricate
                  details, making the characters vibrant and professional. This quality is beneficial for displays,
                  merchandise, and promotional items.
                </p>
              </div>

              {/* Card 4 */}
              <div className="glass-card rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <div className="mb-2 text-2xl font-bold text-white">4. Emotional Connection</div>
                <p className="text-sm text-gray-300">
                  People tend to connect emotionally with characters, especially when they have a relatable story or
                  expression. This connection can foster brand loyalty and encourage repeat customers.
                </p>
              </div>
            </div>
          </section>
        </Section>
      </main>
    </div>
  );
}
