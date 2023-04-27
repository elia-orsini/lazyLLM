import Link from "next/link";

export default function Title({ links = [], includeDefaultLinks = true }) {
  return (
    <div className="w-full flex mt-4 text-center border-b border-black pb-3">
      <div className="w-full grid grid-cols-2">
        <div className="text-left">
          <Link href="/" passHref>
            <h1 className="inline font-semibold text-xl tracking-wide font-black cursor-pointer">
              <img src="/lazyLLMlogo.png" className="w-6 inline mr-1 pb-1.5" />
              lazyLLM
            </h1>
          </Link>
        </div>

        {includeDefaultLinks && (
          <div className="text-right">
            <Link href="/chatgptBattle" passHref>
              <button className="uppercase text-sm mt-2 my-auto font-semibold hover:bg-gray-200 px-1">
                chatGPTBattle
              </button>
            </Link>
          </div>
        )}

        <div className="text-right">
          {links.map((link, i) => (
            <Link key={i} href={link.action} passHref>
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
