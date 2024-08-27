'use client';

import { ImageView } from './image-view';

export default function App() {
  const aspectRatio = '1920/1080';
  // const aspectRatio = '1152/864';
  // const aspectRatio = '1080/1920';

  return (
    <main className="w-full max-w-xl py-20 *:max-w-full mx-auto grid gap-6">
      <a href="" target="_blank" className="block underline underline-offset-4">
        Source code <span className="font-mono">↗</span>
      </a>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem voluptas odio, vitae officia
        enim sit rerum itaque dolorem a delectus nemo. Enim sapiente rem vel corrupti quo, pariatur
        odio ipsum.
      </p>
      <ImageView
        src={`https://picsum.photos/${aspectRatio}`}
        className="rounded-2xl block"
        aspectRatio={aspectRatio}
        alt="Landscape Image"
      />
      <p>
        Eaque pariatur nobis blanditiis eos saepe, veniam est. Officiis possimus quas, dolore, est
        doloribus ratione molestiae cum quibusdam cumque commodi voluptatum nesciunt.
      </p>
      <p>
        Similique expedita enim saepe, dolorum eveniet temporibus corrupti animi optio deleniti
        libero alias ratione officia, iure voluptate et!
      </p>
      <ImageView
        src={`https://picsum.photos/${aspectRatio}`}
        className="rounded-2xl block"
        aspectRatio={aspectRatio}
        alt="Portrait Image"
      />
      <p>
        Similique expedita enim saepe, dolorum eveniet temporibus corrupti animi optio deleniti
        libero alias ratione officia, iure voluptate et!
      </p>
    </main>
  );
}
