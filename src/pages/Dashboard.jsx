import { useEffect, useState } from "react";

function Dashboard({ projects }) {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [budgetEnCours, setBudgetEnCours] = useState(0);
  const [activeProjects, setActiveProjects] = useState(0);
  const [successRate, setSuccessRate] = useState(0);

  useEffect(() => {
    const termines = projects.filter(p => p.statut === "Terminé");
    const enCours = projects.filter(p => p.statut === "En cours" || p.statut === "En attente");
    const annules = projects.filter(p => p.statut === "Annulé");

    setTotalRevenue(termines.reduce((sum, p) => sum + p.budget, 0));
    setBudgetEnCours(enCours.reduce((sum, p) => sum + p.budget, 0));
    setActiveProjects(enCours.length);

    const totalFinalises = termines.length + annules.length;
    setSuccessRate(totalFinalises === 0 ? 0 : (termines.length / totalFinalises) * 100);
  }, [projects]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Tableau de Bord</h2>

      <div className="kpi">
        <p>💰 Revenu total : {totalRevenue} DH</p>
        <p>🔄 Budget en cours : {budgetEnCours} DH</p>
        <p>📌 Projets actifs : {activeProjects}</p>
        <p>✅ Taux de réussite : {successRate.toFixed(1)}%</p>
      </div>
    </div>
  );
}

export default Dashboard;