import { readdir, readFile} from 'fs/promises';
import { join } from 'path';

export default async function Home() {

  const posts_directory : string = "_posts";
  const files = (await readdir(posts_directory)).map(filename => join(posts_directory, filename));
  console.log(files);

  const processed_files = files.map(
    async (filename : string) : Promise<[string, string]> => {
      const file_content : string = await readFile(filename, {encoding: "utf8"});

      const find_title = () => {
        const title_marker = "title:";
        const title_entry_start : number = file_content.indexOf(title_marker);
        const title_entry_end : number = file_content.indexOf("\n", title_entry_start);

        return file_content.substring(title_entry_start + title_marker.length, title_entry_end).trim();
      }

      const find_excerpt = () => {
        const excerpt_marker_entry_marker : string = "excerpt_separator:";
        const excerpt_marker_start : number = file_content.indexOf(excerpt_marker_entry_marker);
        const excerpt_marker_end : number = file_content.indexOf("\n", excerpt_marker_start);
        const content_start_marker : string = "---\n\n";
        const content_start : number = file_content.indexOf(content_start_marker)

        if(content_start == -1) {
          return "Fake excerpt because origin file was malformed."
        }

        const excerpt_not_found = (excerpt_marker_end == -1 || excerpt_marker_start == -1);
        if(excerpt_not_found) {
          const custom_excerpt_end : number = file_content.indexOf("\n\n", content_start);
          return file_content.substring(content_start, custom_excerpt_end);
        } else {
          const excerpt_marker : string = file_content.substring(excerpt_marker_start + excerpt_marker_entry_marker.length, excerpt_marker_end).trim();
          const excerpt_end : number = file_content.indexOf(excerpt_marker, excerpt_marker_end);
          return file_content.substring(content_start + content_start_marker.length, excerpt_end);
        }
      }

      return [find_title(), find_excerpt()]
    }
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-3xl lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-400 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        # Latest posts
        </p>
      </div>
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-rows-4 lg:text-left">

      {
        processed_files.map( async (promise) => {
          const [title, content] = await promise;

          return <a
          href="."
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            {title}{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              {"->"}
            </span>
          </h2>
          <p className={`m-0 text-sm opacity-50`}>
            {content}
          </p>
        </a>
        })
        
        }


        {/* <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore the Next.js 13 playground.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a> */}
      </div>
    </main>
  )
}
