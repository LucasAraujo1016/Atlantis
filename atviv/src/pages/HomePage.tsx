import BannerPrincipal from "../component/dashboard/BannerPrincipal";
import ChamadaAcao from "../component/dashboard/ChamadaAção";
import SecaoDestaques from "../component/dashboard/Destaques";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-linear-to-b from-blue-100 to-blue-300 px-2 sm:px-4">
      <BannerPrincipal />
      <SecaoDestaques />
      <ChamadaAcao />
    </div>
  );
}