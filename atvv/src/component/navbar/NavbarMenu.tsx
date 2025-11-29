type NavbarMenuProps = {
  tela: string;
  setTela: (tela: string) => void;
};

export default function NavbarMenu({ tela, setTela }: NavbarMenuProps) {
  const itens = [
    { key: "home", label: "Home" },
    { key: "clientes", label: "Clientes" },
    { key: "hospedagens", label: "Hospedagens" },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full md:w-auto">
      {itens.map(item => (
        <button
          key={item.key}
          onClick={() => setTela(item.key)}
          className={`px-3 py-2 rounded transition w-full md:w-auto text-left md:text-center ${
            tela === item.key
              ? "bg-blue-600 bg-opacity-20 font-bold shadow text-yellow-300"
              : "hover:bg-blue-600 hover:bg-opacity-10"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}