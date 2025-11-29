export default function BannerPrincipal() {
  return (
    <div className="w-full h-48 sm:h-64 relative mb-8">
      <img
        src="/assets/resort-banner.jpg"
        alt="Banner Atlantis SPA"
        className="object-cover w-full h-full rounded-b-3xl shadow-lg"
      />
      <div className="absolute inset-0 bg-blue-600 bg-opacity-40 flex flex-col justify-center items-center rounded-b-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-2 text-center">
          Bem-vindo ao Atlantis SPA Resort
        </h1>
        <p className="text-lg md:text-2xl text-white drop-shadow text-center">
          Seu refúgio de tranquilidade e luxo
        </p>
      </div>
    </div>
  );
}