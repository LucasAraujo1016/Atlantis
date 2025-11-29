type CardDestaqueProps = {
  imagem: string;
  alt: string;
  titulo: string;
  descricao: string;
};

export default function CardDestaque({ imagem, alt, titulo, descricao }: CardDestaqueProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
      <img
        src={imagem}
        alt={alt}
        className="w-full h-40 sm:h-48 object-cover rounded-lg mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">{titulo}</h2>
      <p className="text-gray-600 text-center">{descricao}</p>
    </div>
  );
}