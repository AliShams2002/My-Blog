// app/not-found.jsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, Search, ArrowRight, Compass, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

export default function NotFound() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/10 dark:bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-600/10 dark:bg-pink-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto text-center">
        {/* Animated 404 Number */}
        <div className="relative mb-8">
          <div
            className={`text-8xl md:text-9xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent transform transition-all duration-1000 ${
              mounted ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          >
            404
          </div>

          {/* Floating Elements */}
          <div
            className={`absolute -top-4 -right-4 transition-all duration-700 delay-300 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="w-16 h-16 bg-purple-500/20 dark:bg-purple-500/30 rounded-full flex items-center justify-center animate-pulse">
              <AlertTriangle className="w-8 h-8 text-purple-500 dark:text-purple-400" />
            </div>
          </div>

          <div
            className={`absolute -bottom-4 -left-4 transition-all duration-700 delay-500 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="w-12 h-12 bg-pink-500/20 dark:bg-pink-500/30 rounded-full flex items-center justify-center animate-bounce">
              <Compass className="w-6 h-6 text-pink-500 dark:text-pink-400" />
            </div>
          </div>
        </div>

        {/* Title & Description */}
        <div
          className={`space-y-4 mb-10 transition-all duration-700 delay-200 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            صفحه‌ای که به دنبال آن بودید پیدا نشد!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
            متأسفیم، صفحه مورد نظر شما وجود ندارد یا به آدرس دیگری منتقل شده
            است. لطفاً آدرس را بررسی کنید یا از لینک‌های زیر استفاده کنید.
          </p>
        </div>

        {/* Action Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 delay-400 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:scale-105"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>بازگشت به صفحه اصلی</span>
          </Link>

          <button
            onClick={() => router.back()}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
          >
            <ArrowRight className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>بازگشت به صفحه قبل</span>
          </button>
        </div>
      </div>
    </div>
  );
}
