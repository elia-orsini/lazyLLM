import Link from "next/link";

export default function Footer({}) {
  return (
    <div className="w-full flex text-center pb-3 pt-20 pb-10">
      <div className="w-full grid grid-cols-2">
        <div className="text-left">
          <p className="inline font-semibold text-sm lowercase tracking-wide">
            lazyLLM © 2023
          </p>
          <p className="text-xs tracking-wide">
            images from OpenAI&apos;s DALL-E
          </p>
        </div>

        <div className="text-right">
          <p className="font-semibold text-sm  tracking-wide">contact</p>
        </div>
      </div>
    </div>
  );
}
