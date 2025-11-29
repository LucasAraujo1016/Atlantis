import CardDestaque from "./CardDestaque";

export default function SecaoDestaques() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl mb-12">
      <CardDestaque
        imagem="https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg"
        alt="Piscina"
        titulo="Piscinas & Águas Termais"
        descricao="Relaxe em nossas piscinas aquecidas e aproveite o melhor das águas termais naturais."
      />
      <CardDestaque
        imagem="https://images.pexels.com/photos/1926811/pexels-photo-1926811.jpeg"
        alt="Massagem"
        titulo="Spa & Bem-estar"
        descricao="Experimente massagens, terapias e tratamentos exclusivos para renovar corpo e mente."
      />
      <CardDestaque
        imagem="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg"
        alt="Gastronomia"
        titulo="Gastronomia Premium"
        descricao="Saboreie pratos sofisticados preparados por chefs renomados em ambientes exclusivos."
      />
    </div>
  );
}