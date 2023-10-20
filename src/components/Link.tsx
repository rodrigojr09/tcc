import Link from "next/link";

export default function LinkButton({
  href,
  css,
  children,
}: {
  href: string;
  css?: string;
  children: any;
}) {
  return (
    <Link
      href={href}
      className="flex sm:inline-flex justify-center items-center bg-gradient-to-tr from-cyan-500 to-green-400 hover:from-cyan-600 hover:to-green-500 active:from-indigo-700 active:to-purple-600 focus-visible:ring ring-indigo-300 text-white font-semibold text-center rounded-md outline-none transition duration-100 px-5 py-2"
    >
      {children.props.children}
    </Link>
  );
}
