import Link from "next/link";

export default function Title({
  links = [],
  includeDefaultLinks = true,
  title = "prompts for cognitive biases",
}) {

  return (
    <div className="w-full flex mt-4 text-center border-b border-black pb-3">
      <div className="w-full grid grid-cols-2">
        <div className="text-left">
          <h1 className="inline font-semibold text-xl lowercase tracking-wide">
            {title}
          </h1>
        </div>

        {includeDefaultLinks && (
          <div className="text-right">
            <Link href="/chatgptBattle" passHref>
              <button className="uppercase text-sm mt-2 my-auto font-semibold hover:bg-gray-200 px-1">
                chatGPTBattle
              </button>
            </Link>
            <Link href="/chatgpt" passHref>
              <button className="uppercase text-sm mt-2 my-auto font-semibold hover:bg-gray-200 px-1">
                chatGPT
              </button>
            </Link>
          </div>
        )}

        <div className="text-right">
          {links.map((link) => (
              <Link href={link.action} passHref>
                <button className="uppercase text-sm mt-2 my-auto font-semibold hover:bg-gray-200 px-1">
                  {link.text}
                </button>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
