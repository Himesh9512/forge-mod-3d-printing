import Section from '@/components/layouts/Section';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div>
      <main>
        <Section heading="Testing">
          <div className="home-wrapper">
            <Button>Test</Button>
          </div>
        </Section>
        <Section heading="Our Story">Card</Section>
      </main>
    </div>
  );
}
