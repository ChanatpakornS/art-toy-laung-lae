export default function Home() {
  return (
    <div className='min-h-screen'>
      {/* Navigation */}

      {/* Hero Section */}
      <article className='flex flex-col items-center justify-center px-6 py-20 text-center'>
        <h1 className='text-4xl md:text-6xl font-bold bg-background text-primary mb-6 max-w-4xl'>
          Mocker
        </h1>
        <p className='text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation.
        </p>
        <div className='flex flex-col sm:flex-row gap-4'>
          <button className='bg-background text-primary px-8 py-3 rounded-lg font-semibold hover:bg-accent transition-colors'>
            Get Started
          </button>
          <button className='border-2 border-foreground text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-foreground hover:text-background transition-colors'>
            Learn More
          </button>
        </div>
      </article>

      {/* Features Section */}
      <section className='px-6 py-20'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl md:text-4xl font-bold text-foreground text-center mb-16'>
            Mocker features
          </h2>
          <div className='grid md:grid-cols-3 gap-8'>
            <div className='bg-card/80 backdrop-blur-sm rounded-lg p-6 text-center border border-border'>
              <h3 className='text-xl font-semibold text-card-foreground mb-4'>
                Lorem ipsum
              </h3>
              <p className='text-muted-foreground'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore.
              </p>
            </div>
            <div className='bg-card/80 backdrop-blur-sm rounded-lg p-6 text-center border border-border'>
              <h3 className='text-xl font-semibold text-card-foreground mb-4'>
                Dolor sit amet
              </h3>
              <p className='text-muted-foreground'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore.
              </p>
            </div>
            <div className='bg-card/80 backdrop-blur-sm rounded-lg p-6 text-center border border-border'>
              <h3 className='text-xl font-semibold text-card-foreground mb-4'>
                Consectetur
              </h3>
              <p className='text-muted-foreground'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
