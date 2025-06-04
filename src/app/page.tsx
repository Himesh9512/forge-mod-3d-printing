import Section from '@/components/layouts/Section';
import Image from 'next/image';

export default function Home() {
  const data = [
    {
      name: 'Khalid Bou-Rabee',
      title: 'Founder, Harambe System',
      image: '/b4e5f323d5e24db4f8e6d40b5ba946879a67f314.png',
      quote: `Forgemod has been a joy to work with. They reply promptly to support requests and have done a stellar job with every project I have given them. When it comes to quality manufacturing, I highly recommend you try Forgemod first.`,
    },
    {
      name: 'Wolfgang Schröppel',
      title: 'Equipment Development Manager',
      image: '/e7c0ae6c592af716358bacefc147310d691e84b7.png',
      quote: `Forgemod provides immediate pricing so you can decide on the spot what material and finish you want to choose. The service is always flawless and prompt.`,
    },
    {
      name: 'Nikk Wong',
      title: 'Engineer, Juni',
      image: '/e6f3af5995a14a4cd7569c4385ff1ec756e52ab2.png', // Replace with actual image path
      quote: `I was spending weeks jumping from website to website trying to find vendors who could quickly deliver affordable & durable prototypes. After finding Forgemod I never had to look anywhere else.`,
    },
  ];

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
                <p className="font-bold text-yellow-300">
                  <u>SHOP</u>
                </p>
                <a href="#" className="underline hover:text-gray-400">
                  Etsy
                </a>
              </div>

              {/* Stats */}
              <div className="mt-8 flex gap-12">
                <div className="rounded-full bg-white p-3 px-10 text-center">
                  <div className="text-xl font-semibold text-black">10K+</div>
                  <div className="mt-1 text-sm text-black">Prints</div>
                </div>
                <div className="rounded-full bg-white p-3 px-10 text-center">
                  <div className="text-xl font-semibold text-black">5K+</div>
                  <div className="mt-1 text-sm text-black">Custom models</div>
                </div>
                <div className="rounded-full bg-white p-3 px-10 text-center">
                  <div className="text-xl font-semibold text-black">15K+</div>
                  <div className="mt-1 text-sm text-black">3D Models</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex flex-1 justify-center">
              <div className="rounded-full p-4">
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

        <section className="bg-black py-16">
          <Section heading="Service We Provide">
            <div
              style={{ background: "url('/9db65fb82d29c65d120a9669bd4cd98d4c5dd519.jpg')", backgroundSize: 'cover' }}
              className="mx-auto grid max-w-7xl gap-6 rounded-lg p-6 md:grid-cols-3"
            >
              <div className="relative rounded-2xl border border-white/20 bg-white/10 p-6 text-white shadow-xl backdrop-blur-md">
                <div
                  style={{ fontSize: '30px' }}
                  className="absolute left-0 top-0 rounded-sm bg-white/20 px-8 py-3 font-bold"
                >
                  1
                </div>
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

              <div className="relative rounded-2xl border border-white/20 bg-white/10 p-6 text-white shadow-xl backdrop-blur-md">
                <div
                  style={{ fontSize: '30px' }}
                  className="absolute left-0 top-0 rounded-sm bg-white/20 px-8 py-3 font-bold"
                >
                  2
                </div>

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

              <div className="relative rounded-2xl border border-white/20 bg-white/10 p-6 text-white shadow-xl backdrop-blur-md">
                <div
                  style={{ fontSize: '30px' }}
                  className="absolute left-0 top-0 rounded-sm bg-white/20 px-8 py-3 font-bold"
                >
                  3
                </div>
                <div className="mb-4 flex justify-center">
                  <Image src="/custom-printing.png" alt="Custom 3D" height={310} width={222} />
                </div>
                <h3 className="text-center text-xl font-semibold">Custom 3D Modeling & Printing</h3>
                <p className="mt-2 text-center text-sm text-gray-300">
                  Choose your preferred manufacturer from over 150 professional services and receive your order fast and
                  hassle-free.
                </p>

                <button className="mt-6 w-full rounded-md bg-yellow-400 py-2 font-semibold text-black hover:bg-yellow-300">
                  Get 3D Model
                </button>
              </div>
            </div>
          </Section>
        </section>

        <section className="bg-black px-6 py-16">
          <div className="flex justify-center">
            <Image src="/shutterstock_1029948412.jpg 1.svg" alt="Image" height={1200} width={660} />
          </div>
          <Section heading="Why Go With 3D Printing">
            <div className="bg-black px-4 py-10 text-white sm:px-6 lg:px-20">
              <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Divider for large screens */}
                <div className="absolute left-1/2 top-0 hidden h-full w-px bg-gray-700 lg:block"></div>

                {/* Left Column */}
                <div className="space-y-10 pr-0 lg:pr-10">
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">1. Enhanced Visual Appeal</h3>
                    <p className="text-gray-300">
                      Character models bring designs to life by adding personality, which can make materials more
                      engaging. For marketing or storytelling, character models grab attention and help communicate
                      messages effectively.
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">3. High Quality and Detail</h3>
                    <p className="text-gray-300">
                      Character model printing often involves high-resolution printing technology that captures
                      intricate details, making the characters vibrant and professional. This quality is particularly
                      beneficial for displays, merchandise, and promotional items where visual appeal is key.
                    </p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-10 pl-0 lg:pl-10">
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">2. Customizability</h3>
                    <p className="text-gray-300">
                      Character models can be customized to fit brand identity, audience preferences, and specific
                      themes. This flexibility allows businesses to create unique characters that resonate with their
                      target market, reinforcing brand image.
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">4. Emotional Connection</h3>
                    <p className="text-gray-300">
                      People tend to connect emotionally with characters, especially when they have a relatable story or
                      expression. This connection can foster brand loyalty and encourage repeat customers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </section>

        <section className="bg-black px-6 py-16">
          <Section heading="What our customers say">
            <div className="bg-black px-4 py-12 sm:px-6 lg:px-20">
              <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {data.map((testimonial, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center rounded-3xl bg-white p-6 text-center shadow-md"
                  >
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="mb-4 h-16 w-16 rounded-full object-cover"
                    />
                    <div className="font-semibold text-black">{testimonial.name}</div>
                    <div className="mb-4 text-sm text-gray-600">{testimonial.title}</div>
                    <p className="text-sm text-black">"{testimonial.quote}"</p>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </section>
      </main>
    </div>
  );
}
