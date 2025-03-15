import React from 'react';
import { Container, Grid, ImageTag, Section } from '..';

// Props
interface Props {}

export default function AboutUs({}: Props) {
  return (
    <Section>
      <Container>
        <Grid>
          <div className="col-span-full select-none text-center text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:col-start-2 xl:col-end-12 xl:text-9xl">
            Salve{' '}
            <div className="relative inline-block cursor-pointer align-middle">
              <div className="relative z-10 h-10 w-16 overflow-hidden rounded-lg md:h-14 md:w-24 lg:h-24 lg:w-36 xl:h-32 xl:w-60 transition-transform duration-300 hover:scale-125 hover:z-20 hover:rounded-lg">
                <ImageTag src="/static/images/product1.jpg" />
              </div>
            </div>{' '}
            welcomes you to an amazing{' '}
            <div className="relative inline-block cursor-pointer align-middle">
              <div className="relative z-10 h-10 w-16 overflow-hidden rounded-lg md:h-14 md:w-24 lg:h-24 lg:w-36 xl:h-32 xl:w-60 transition-transform duration-300 hover:scale-125 hover:z-20 hover:rounded-lg">
                <ImageTag src="/static/images/product2.jpg" />
              </div>
            </div>{' '}
            world of boundless creativity, and{' '}
            <div className="relative inline-block cursor-pointer align-middle">
              <div className="relative z-10 h-10 w-16 overflow-hidden rounded-lg md:h-14 md:w-24 lg:h-24 lg:w-36 xl:h-32 xl:w-60 transition-transform duration-300 hover:scale-125 hover:z-20 hover:rounded-lg">
                <ImageTag src="/static/images/product1.jpg" />
              </div>
            </div>{' '}
            limitless artistry.
          </div>
        </Grid>
      </Container>
    </Section>
  );
}
