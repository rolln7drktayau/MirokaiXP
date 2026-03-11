import Link from "next/link";

interface ConfirmationPageProps {
  searchParams: {
    profile?: "solo" | "team" | "b2b";
  };
}

const messages = {
  solo: {
    title: "Votre immersion solo est confirmée",
    body: "Vous allez recevoir vos emails de préparation J-7, J-2 et J-1.",
  },
  team: {
    title: "Votre venue d'équipe est réservée",
    body: "Partagez le lien audioguide avec vos collègues pour préparer l'expérience ensemble.",
  },
  b2b: {
    title: "Votre session entreprise est prise en compte",
    body: "Un contenu personnalisé B2B et vos cas d'usage vous seront envoyés avant la visite.",
  },
};

export default function ConfirmationPage({ searchParams }: ConfirmationPageProps) {
  const profile = searchParams.profile ?? "solo";
  const content = messages[profile];

  return (
    <main className="section-wrap py-16">
      <div className="glass-panel mx-auto max-w-2xl rounded-3xl p-6 text-center sm:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-white/70">Réservation confirmée</p>
        <h1 className="mt-2 text-3xl sm:text-4xl">{content.title}</h1>
        <p className="mt-3 text-sm text-white/75 sm:text-base">{content.body}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/" className="cta-primary">
            Retour à la landing
          </Link>
          <Link href="/experience" className="cta-secondary">
            Lancer la visite PWA
          </Link>
        </div>
      </div>
    </main>
  );
}
