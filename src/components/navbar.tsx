import Link from "next/link";

export interface NavbarProps {
  /** Omit until the shared React favorites state is introduced; never a fake count. */
  favoriteCount?: number;
}

const navigation = [
  { href: "/", label: "Home" },
  { href: "/experiences", label: "Explore" },
  { href: "/favorites", label: "Favorites" },
  { href: "/profile", label: "Profile" },
] as const;

export function Navbar({ favoriteCount }: NavbarProps) {
  return (
    <header className="border-b border-stone-200 bg-white">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8"
      >
        <Link className="text-lg font-semibold tracking-tight text-stone-900" href="/">
          Wanderlust Explorer
        </Link>
        <ul className="flex items-center gap-4 text-sm font-medium text-stone-700 sm:gap-7">
          {navigation.map(({ href, label }) => (
            <li key={href}>
              <Link className="rounded-sm transition-colors hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800" href={href}>
                {label}
                {href === "/favorites" && favoriteCount !== undefined ? (
                  <span aria-label={`${favoriteCount} saved experiences`} className="ml-1 text-emerald-800">
                    ({favoriteCount})
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
