import { CheckCircle, Clock } from "lucide-react";

export default function OrderHistory() {
  // Données statiques pour la démo
  const commandes = [
    {
      id: 1,
      restaurant: "Le Gourmet Parisien",
      date: "12 juin 2025",
      total: 38.5,
      statut: "Livrée",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
      plats: [
        { nom: "Magret de canard", quantite: 1 },
        { nom: "Crème brûlée", quantite: 2 },
      ],
    },
    {
      id: 2,
      restaurant: "Pizza Bella",
      date: "2 juin 2025",
      total: 22.0,
      statut: "En cours",
      image:
        "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
      plats: [
        { nom: "Pizza Margherita", quantite: 1 },
        { nom: "Tiramisu", quantite: 1 },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-2xl p-4">
        <h1 className="mb-8 text-center text-4xl font-extrabold tracking-tight text-gray-900">
          <span className="text-green-600">Mes commandes</span>
        </h1>
        {commandes.length === 0 ? (
          <p className="text-center text-gray-500">Aucune commande trouvée.</p>
        ) : (
          <div className="space-y-8">
            {commandes.map((commande) => (
              <div
                key={commande.id}
                className="flex flex-col items-center overflow-hidden rounded-2xl bg-white shadow-lg transition hover:shadow-2xl md:flex-row"
              >
                <img
                  src={commande.image}
                  alt={commande.restaurant}
                  className="h-32 w-full rounded-t-2xl object-cover md:w-40 md:rounded-l-2xl md:rounded-r-none md:rounded-t-none"
                />
                <div className="w-full flex-1 p-5">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-xl font-bold text-gray-800">
                      {commande.restaurant}
                    </div>
                    <span
                      className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                        commande.statut === "Livrée"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {commande.statut === "Livrée" ? (
                        <CheckCircle size={16} className="mr-1 inline-block" />
                      ) : (
                        <Clock size={16} className="mr-1 inline-block" />
                      )}
                      {commande.statut}
                    </span>
                  </div>
                  <div className="mb-2 text-sm text-gray-500">
                    {commande.date}
                  </div>
                  <ul className="mb-2 list-inside list-disc text-gray-700">
                    {commande.plats.map((plat, idx) => (
                      <li key={idx}>
                        {plat.quantite} x {plat.nom}
                      </li>
                    ))}
                  </ul>
                  <div className="text-right text-lg font-bold text-green-600">
                    Total : {commande.total.toFixed(2)} €
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
