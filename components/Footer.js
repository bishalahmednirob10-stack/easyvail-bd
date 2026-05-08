export default function Footer() {
  return (
    <footer className="mt-20 bg-stone-900 py-12 text-stone-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 text-center md:grid-cols-3 md:text-left">
          <div>
            <div className="mb-3 flex items-center justify-center gap-3 md:justify-start">
              <img
                src="/logo.svg"
                alt="EasyVail BD logo"
                className="h-16 w-auto rounded bg-[#f7f4ef] object-contain p-1"
              />
            </div>
            <p className="text-sm leading-relaxed">
              Modest fashion for the modern woman.
              <br />
              Premium hijabs, delivered across Bangladesh.
            </p>
          </div>
          <div>
            <h4 className="mb-3 font-medium text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li className="cursor-pointer hover:text-white">About Us</li>
              <li className="cursor-pointer hover:text-white">Shipping Policy</li>
              <li className="cursor-pointer hover:text-white">Returns & Exchange</li>
              <li className="cursor-pointer hover:text-white">Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-medium text-white">Payment Methods</h4>
            <p className="text-sm">bKash - Nagad - Rocket</p>
            <p className="mt-1 text-sm">01572-909366</p>
          </div>
        </div>
        <div className="mt-8 border-t border-stone-700 pt-6 text-center text-sm text-stone-500">
          &copy; {new Date().getFullYear()} EasyVail BD. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
