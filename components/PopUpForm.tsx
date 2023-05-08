import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function PopUpForm() {
  const router = useRouter();

  const setCookie = () => {
    event.preventDefault();

    const privateKey = event.target[0].value;

    console.log(privateKey);

    Cookies.set("privateKey", privateKey);
  };

  return (
    <div className="absolute w-full top-0 left-0 flex h-screen">
      <div className="my-auto mx-auto max-w-4xl bg-white z-10 rounded-lg border border-black shadow-lg">
        <div className="text-right pr-4 pt-2 bg-gray-100 rounded-t-lg flex justify-between border-b border-black">
          <div className="text-left flex pb-2 px-4 font-mono text-sm">
            Please insert your OpenAI private key
          </div>
        </div>

        <div className="px-4 py-4 text-sm text-left">
          <form
            className="grid grid-cols-3"
            onSubmit={() => {
              setCookie();
            }}
          >
            <input
              className="border col-span-2 border-black px-1"
              name="privateKey"
              type="text"
            />
            <button className="border border-black hover:bg-secondary">
              submit
            </button>
          </form>
        </div>
      </div>

      <div className="w-full h-full absolute bg-white z-0 opacity-70"></div>
    </div>
  );
}
