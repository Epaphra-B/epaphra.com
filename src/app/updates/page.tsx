import Image from "next/image";

export default function updates() {
  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden font-inter">
      {/* Tailwind CSS CDN is usually handled by a build process in React,
          but for a self-contained example, we'll assume it's available or
          you'd set it up in your project's index.html or equivalent.
          The 'font-inter' class assumes you've configured Tailwind to use Inter,
          or you can add a global CSS import for the font.
      */}
      <style>
        {`
          /* Custom styling for the large "Waitlist" text at the bottom */
          .waitlist-bg-text {
              position: absolute;
              bottom: -100px; /* Adjust as needed */
              left: 50%;
              transform: translateX(-50%);
              font-size: 200px; /* Large font size */
              font-weight: 700;
              color: rgba(255, 255, 255, 0.03); /* Very subtle white */
              pointer-events: none; /* Make it unclickable */
              white-space: nowrap;
              letter-spacing: -10px; /* Adjust letter spacing */
              text-shadow: 0 0 20px rgba(255, 255, 255, 0.05);
          }

          /* Frosted glass effect for the card - applied via className */
          .frosted-glass {
              background: rgba(255, 255, 255, 0.05); /* Slightly transparent white */
              backdrop-filter: blur(20px); /* Blur effect */
              -webkit-backdrop-filter: blur(20px); /* Safari support */
              border: 1px solid rgba(255, 255, 255, 0.1); /* Subtle border */
              box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37); /* Shadow */
          }

          /* Background gradient/effect - simulating the image's abstract background */
          body::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: radial-gradient(circle at center, rgba(255, 165, 0, 0.1) 0%, rgba(0, 0, 0, 0) 70%);
              opacity: 0.5;
              z-index: 0;
          }
        `}
      </style>

      {/* Background abstract shapes/glows (simulated)
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-500 rounded-full mix-blend-screen opacity-10 blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-purple-500 rounded-full mix-blend-screen opacity-10 blur-3xl"></div>
      </div> */}

<div className="absolute inset-0 z-0">
    <div className="w-full h-full bg-gradient-to-br from-black via-gray-900 to-black opacity-80"></div>
    <Image src="/background.jpg"
         alt="background image"
         width={500}
         height={500}
         className="absolute inset-0 w-full h-full object-cover opacity-20" />
  </div>

      <div className="relative z-10 flex flex-col items-center justify-center p-4">
        {/* Waitlist button at the top */}
        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white text-sm font-semibold rounded-full shadow-lg mb-8 opacity-80 hover:opacity-100 transition-opacity frosted-glass">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
          <span>Waitlist</span>
        </button>

        {/* Coming Soon! text */}
        <h1 className="text-6xl md:text-8xl opacity-80 font-bold text-white mb-12 text-center" style={{ textShadow: '0 0 20px rgba(255,255,255,0.5)' }}>
          Coming soon!
        </h1>

        {/* Join our waitlist card */}
        <div className="frosted-glass p-8 md:p-12 rounded-3xl max-w-lg w-full text-center">
          <h2 className="text-3xl font-semibold mb-4 text-white">Join our waitlist!</h2>
          <p className="text-gray-300 mb-6">Sign up for our newsletter to receive the latest updates and insights straight to your inbox.</p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <input
              type="email"
              placeholder="Enter email"
              className="flex-grow px-5 py-3 rounded-xl bg-blend-color bg-opacity-50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none "
            />
            <button className="px-6 py-3 bg-white text-black font-semibold rounded-xl shadow-md hover:bg-gray-200 transition-colors">
              Join Waitlist
            </button>
          </div>

          {/* Social media icons */}
          <div className="flex justify-center space-x-4">
            <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full frosted-glass hover:bg-gray-700 transition-colors">
              {/* X (Twitter) icon */}
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.13l-6.23-8.783-4.714 8.783H1.75L9.292 1.94h2.847L18.244 2.25zM17.292 20l-1.13-1.68H5.962L4.092 20H2.892l7.538-11.196L2.892 4h2.364l4.94 7.39L17.292 4h1.06L10.27 13.116L17.292 20z"></path>
              </svg>
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full frosted-glass hover:bg-gray-700 transition-colors">
              {/* Facebook icon */}
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.505 1.492-3.89 3.776-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
              </svg>
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full frosted-glass hover:bg-gray-700 transition-colors">
              {/* GitHub icon (assuming this is the third icon based on common social links) */}
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.86 8.16 6.839 9.488.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.529 2.341 1.088 2.902.829.091-.64.359-1.088.65-1.334-2.22-.253-4.555-1.116-4.555-4.949 0-1.092.39-1.983 1.029-2.675-.103-.253-.446-1.268.099-2.648 0 0 .84-.27 2.75 1.025A9.28 9.28 0 0112 6.878c.85.004 1.705.115 2.504.337 1.909-1.295 2.747-1.025 2.747-1.025.546 1.38.202 2.395.099 2.648.64.692 1.029 1.583 1.029 2.675 0 3.842-2.334 4.691-4.566 4.939.369.319.682.946.682 1.902 0 1.37-.012 2.47-.012 2.801 0 .268.18.577.688.483C19.14 20.16 22 16.418 22 12z" clipRule="evenodd"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright and build info */}
        <div className="text-gray-500 text-xs mt-12 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <ul className="flex gap-5">
            <li>@ 2025 All rights reserved</li>
            <li>epaphra</li>
            <li>404</li>
          </ul>
        </div>
      </div>

      {/* Large "Waitlist" text in the background, subtle */}
      <div className="waitlist-bg-text">Waitlist</div>
    </div>
  );
}
