'use client';

import { ImageView } from './image-view';

export default function App() {
  return (
    <main className="w-full max-w-xl py-20 *:max-w-full mx-auto grid gap-6">
      <a
        href="https://github.com/malkiii/react-image-zoom-view/blob/master/src/image-view.tsx"
        target="_blank"
        className="block underline underline-offset-4"
      >
        Source code <span className="font-mono">↗</span>
      </a>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem voluptas odio, vitae officia
        enim sit rerum itaque dolorem a delectus nemo. Enim sapiente rem vel corrupti quo, pariatur
        odio ipsum.
      </p>
      <ImageView
        src="https://picsum.photos/1280/720"
        className="block italic"
        aspectRatio="1280/720"
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
        src="https://picsum.photos/800/800"
        className="block italic"
        aspectRatio="1/1"
        alt="Square Image"
      />
      <p>
        Quibusdam magnam voluptatibus voluptatem dignissimos dicta necessitatibus sed rem, quo
        suscipit error explicabo minima eaque quasi, doloribus cum quam ad quis nesciunt.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque aut aspernatur eligendi
        fugiat dolor accusantium at dignissimos, earum quaerat natus deleniti quam. Voluptatibus
        alias eligendi deleniti modi ipsam sed asperiores!
      </p>
      <ImageView
        src="https://picsum.photos/720/1080"
        className="block italic"
        aspectRatio="720/1080"
        alt="Portrait Image"
      />
    </main>
  );
}
