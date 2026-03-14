import { Store } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center justify-center gap-2 py-2">
      <div className="relative">
        <Store className="w-12 h-12 text-orange-600" strokeWidth={2} />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
      </div>
      <div className="text-center">
      <h1 className="text-4xl font-bold tracking-tight text-[#81C408]">
        Mauli Mart
      </h1>
        <p className="text-sm text-orange-600 font-medium tracking-wide">Your Trusted Store</p>
      </div>
    </div>
  );
}
