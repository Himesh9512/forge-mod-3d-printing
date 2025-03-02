const Section = ({
  children,
  heading,
}: Readonly<{
  children: React.ReactNode;
  heading?: string;
}>) => {
  return (
    <section className="flex w-full items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16">
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-4 sm:gap-8 md:gap-12">
          {heading && (
            <div className="rounded-full bg-neutral-900 px-6 py-4 lg:px-8">
              <h2 className="text-center text-secondary">{heading}</h2>
            </div>
          )}
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;
