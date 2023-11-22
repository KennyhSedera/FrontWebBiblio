import React, { useState, useEffect } from 'react';

const App = ({ valeurInitiale='gfsvsdcs' }) => {
  // Utilisez useState pour créer un état local avec la valeur initiale
  const [valeur, setValeur] = useState(valeurInitiale);

  // Utilisez un effet uniquement lors du montage pour définir la valeur initiale
  useEffect(() => {
    if (valeurInitiale !== null) {
      setValeur(valeurInitiale);
    }
  }, [valeurInitiale]);

  // Fonction de gestion de changement pour mettre à jour la valeur
  const handleChangement = (e) => {
    setValeur(e.target.value);
  };

  return (
    <div>
      {/* Champ de saisie contrôlé avec la valeur de l'état local */}
      <input
        type="text"
        value={valeur === null ? '' : valeur}
        onChange={handleChangement}
      />

      {/* Affichage de la valeur actuelle */}
      <p>La valeur est : {valeur}</p>
    </div>
  );
};

export default App;
